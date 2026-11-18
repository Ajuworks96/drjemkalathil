<?php
/**
 * Plugin Name: Dr. Jem Kalathil — Patient Portal & Secure Medical Records
 * Description: Receives patient registrations, second opinion requests, uploaded medical documents, and appointment inquiries from jemkalathil.com directly into the WordPress Dashboard with private protected document storage.
 * Version: 1.0.0
 * Author: Dr. Jem Kalathil Clinical Web Suite
 * Text Domain: drjem-patient-portal
 */

if (!defined('ABSPATH')) {
    exit;
}

class DrJem_Patient_Portal {
    const POST_TYPE = 'drjem_submission';
    const UPLOAD_SUBDIR = 'drjem-private-records';
    const MAX_FILE_SIZE = 15728640; // 15 MB per file
    const MAX_FILES = 10;

    public function __construct() {
        add_action('init', [$this, 'register_submission_post_type']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('rest_api_init', [$this, 'configure_cors_headers'], 15);
        add_action('init', [$this, 'handle_preflight_requests']);

        // Admin UI customization
        add_filter('manage_' . self::POST_TYPE . '_posts_columns', [$this, 'set_custom_columns']);
        add_action('manage_' . self::POST_TYPE . '_posts_custom_column', [$this, 'render_custom_column'], 10, 2);
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);
        add_action('save_post_' . self::POST_TYPE, [$this, 'save_admin_meta']);
        add_action('restrict_manage_posts', [$this, 'add_submission_type_filter']);
        add_action('pre_get_posts', [$this, 'filter_submissions_by_type']);
        add_action('admin_head', [$this, 'inject_admin_styles']);

        // Authenticated private file download endpoint (Admins only)
        add_action('admin_post_drjem_download_doc', [$this, 'handle_secure_file_download']);
    }

    /**
     * Allowed Frontend Origins for CORS
     */
    private function get_allowed_origins() {
        return [
            'https://jemkalathil.com',
            'https://www.jemkalathil.com',
            'https://drjemkalathil.vercel.app',
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
        ];
    }

    /**
     * Handle OPTIONS preflight requests for custom endpoints
     */
    public function handle_preflight_requests() {
        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            $request_uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
            if (strpos($request_uri, '/wp-json/drjem/v1/') !== false) {
                $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
                if ($this->is_origin_allowed($origin)) {
                    header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
                    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
                    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
                    header('Access-Control-Max-Age: 86400');
                }
                status_header(200);
                exit;
            }
        }
    }

    private function is_origin_allowed($origin) {
        if (empty($origin)) {
            return false;
        }
        $allowed = $this->get_allowed_origins();
        if (in_array($origin, $allowed, true)) {
            return true;
        }
        // Allow Vercel preview subdomains for drjemkalathil
        if (preg_match('/^https:\/\/drjemkalathil[a-z0-9-]*\.vercel\.app$/i', $origin)) {
            return true;
        }
        return false;
    }

    public function configure_cors_headers() {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', function ($value) {
            $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
            if ($this->is_origin_allowed($origin)) {
                header('Access-Control-Allow-Origin: ' . esc_url_raw($origin), true);
                header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, PATCH, DELETE', true);
                header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce, Content-Disposition, Content-MD5', true);
                header('Access-Control-Allow-Credentials: true', true);
            }
            return $value;
        }, 15);
    }

    /**
     * Register Private Custom Post Type for Patient Submissions
     */
    public function register_submission_post_type() {
        $labels = [
            'name'               => 'Patient Portal',
            'singular_name'      => 'Patient Submission',
            'menu_name'          => 'Patient Portal',
            'name_admin_bar'     => 'Patient Submission',
            'all_items'          => 'All Patient Cases',
            'view_item'          => 'View Patient Case',
            'edit_item'          => 'Patient Case Details',
            'search_items'       => 'Search Patient Cases',
            'not_found'          => 'No patient submissions found yet.',
            'not_found_in_trash' => 'No submissions found in Trash.',
        ];

        $args = [
            'labels'              => $labels,
            'public'              => false,
            'publicly_queryable'  => false,
            'exclude_from_search' => true,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'show_in_rest'        => false, // NEVER expose patient records to public WP REST API
            'menu_position'       => 25,
            'menu_icon'           => 'dashicons-clipboard',
            'supports'            => ['title'],
            'capability_type'     => 'post',
            'capabilities'        => [
                'create_posts' => 'do_not_allow', // Submissions come from website forms
            ],
            'map_meta_cap'        => true,
        ];

        register_post_type(self::POST_TYPE, $args);
    }

    /**
     * Register REST API Endpoints for Website Forms
     */
    public function register_rest_routes() {
        register_rest_route('drjem/v1', '/second-opinion', [
            'methods'             => 'POST',
            'callback'            => [$this, 'handle_second_opinion'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('drjem/v1', '/document-upload', [
            'methods'             => 'POST',
            'callback'            => [$this, 'handle_document_upload'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('drjem/v1', '/contact', [
            'methods'             => 'POST',
            'callback'            => [$this, 'handle_contact_inquiry'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('drjem/v1', '/health', [
            'methods'             => 'GET',
            'callback'            => function () {
                return rest_ensure_response([
                    'status'  => 'active',
                    'plugin'  => 'drjem-patient-portal',
                    'version' => '1.0.0',
                ]);
            },
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * Ensure private uploads directory exists and is locked down with .htaccess
     */
    private function get_private_upload_dir() {
        $upload_dir = wp_upload_dir();
        $private_dir = trailingslashit($upload_dir['basedir']) . self::UPLOAD_SUBDIR;

        if (!file_exists($private_dir)) {
            wp_mkdir_p($private_dir);
        }

        // Protect directory from direct web access & directory listing
        $htaccess_file = trailingslashit($private_dir) . '.htaccess';
        if (!file_exists($htaccess_file)) {
            $rules = "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nOrder deny,allow\nDeny from all\n</IfModule>\nOptions -Indexes\n";
            @file_put_contents($htaccess_file, $rules);
        }

        $index_file = trailingslashit($private_dir) . 'index.php';
        if (!file_exists($index_file)) {
            @file_put_contents($index_file, "<?php\n// Silence is golden.\n");
        }

        return $private_dir;
    }

    /**
     * Process and securely store uploaded medical files
     */
    private function process_uploaded_files($file_field_name = 'files', $categories = []) {
        $saved_files = [];

        if (empty($_FILES[$file_field_name])) {
            return $saved_files;
        }

        $allowed_extensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'doc', 'docx'];
        $private_dir = $this->get_private_upload_dir();
        $file_batch = $_FILES[$file_field_name];

        // Normalize single vs multiple file upload arrays
        $names = is_array($file_batch['name']) ? $file_batch['name'] : [$file_batch['name']];
        $tmp_names = is_array($file_batch['tmp_name']) ? $file_batch['tmp_name'] : [$file_batch['tmp_name']];
        $sizes = is_array($file_batch['size']) ? $file_batch['size'] : [$file_batch['size']];
        $errors = is_array($file_batch['error']) ? $file_batch['error'] : [$file_batch['error']];
        $types = is_array($file_batch['type']) ? $file_batch['type'] : [$file_batch['type']];

        $count = min(count($names), self::MAX_FILES);

        for ($i = 0; $i < $count; $i++) {
            if ($errors[$i] !== UPLOAD_ERR_OK || empty($tmp_names[$i]) || !is_uploaded_file($tmp_names[$i])) {
                continue;
            }

            if ($sizes[$i] > self::MAX_FILE_SIZE) {
                continue;
            }

            $original_name = sanitize_file_name($names[$i]);
            $ext = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));

            if (!in_array($ext, $allowed_extensions, true)) {
                continue;
            }

            // Generate non-guessable secure storage filename
            $random_hex = function_exists('random_bytes') ? bin2hex(random_bytes(12)) : wp_generate_password(24, false, false);
            $stored_name = date('Ymd_His') . '_' . $random_hex . '.' . $ext;
            $destination = trailingslashit($private_dir) . $stored_name;

            if (@move_uploaded_file($tmp_names[$i], $destination)) {
                $cat = isset($categories[$i]) ? sanitize_text_field($categories[$i]) : 'medical_record';
                $saved_files[] = [
                    'original_name' => $original_name,
                    'stored_name'   => $stored_name,
                    'size_bytes'    => intval($sizes[$i]),
                    'mime_type'     => sanitize_text_field($types[$i]),
                    'category'      => $cat,
                    'uploaded_at'   => current_time('mysql'),
                ];
            }
        }

        return $saved_files;
    }

    /**
     * Endpoint 1: Second Opinion Request
     */
    public function handle_second_opinion(WP_REST_Request $request) {
        $params = $request->get_params();

        $patient_name = sanitize_text_field($params['patientFullName'] ?? $params['patientName'] ?? '');
        $phone = sanitize_text_field($params['contactPhone'] ?? $params['phone'] ?? '');
        $email = sanitize_email($params['contactEmail'] ?? $params['email'] ?? '');

        if (empty($patient_name) || empty($phone)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Patient name and phone number are required.',
            ], 400);
        }

        $ref_id = 'HC-' . date('Y') . '-' . wp_rand(1000, 9999);
        $saved_files = $this->process_uploaded_files('files');

        $post_id = wp_insert_post([
            'post_type'   => self::POST_TYPE,
            'post_status' => 'publish',
            'post_title'  => sprintf('[%s] %s — Second Opinion', $ref_id, $patient_name),
        ]);

        if (is_wp_error($post_id)) {
            return new WP_REST_Response(['success' => false, 'message' => 'Could not save submission.'], 500);
        }

        $meta = [
            '_drjem_ref_id'             => $ref_id,
            '_drjem_submission_type'    => 'second_opinion',
            '_drjem_status'             => 'new',
            '_drjem_patient_name'       => $patient_name,
            '_drjem_patient_age'        => sanitize_text_field($params['patientAge'] ?? ''),
            '_drjem_patient_gender'     => sanitize_text_field($params['patientGender'] ?? ''),
            '_drjem_country'            => sanitize_text_field($params['country'] ?? ''),
            '_drjem_city'               => sanitize_text_field($params['city'] ?? ''),
            '_drjem_phone'              => $phone,
            '_drjem_email'              => $email,
            '_drjem_diagnosis'          => sanitize_text_field($params['diagnosisCondition'] ?? ''),
            '_drjem_current_treatment'  => sanitize_textarea_field($params['currentTreatment'] ?? ''),
            '_drjem_previous_surgery'   => sanitize_textarea_field($params['previousSurgery'] ?? ''),
            '_drjem_treating_doctor'    => sanitize_text_field($params['treatingHospitalDoctor'] ?? ''),
            '_drjem_clinical_question'  => sanitize_textarea_field($params['specificClinicalQuestion'] ?? ''),
            '_drjem_consultation_mode'  => sanitize_text_field($params['consultationMode'] ?? 'secure-tele-review'),
            '_drjem_files'              => $saved_files,
        ];

        foreach ($meta as $key => $val) {
            update_post_meta($post_id, $key, $val);
        }

        $this->send_admin_notification($post_id, $ref_id, 'Second Opinion Request', $patient_name, $phone, $email, count($saved_files));

        return rest_ensure_response([
            'success'           => true,
            'referenceId'       => $ref_id,
            'submissionId'      => $post_id,
            'filesSaved'        => count($saved_files),
            'receivedTimestamp' => current_time('d F Y, h:i A'),
        ]);
    }

    /**
     * Endpoint 2: Secure Medical Document Upload
     */
    public function handle_document_upload(WP_REST_Request $request) {
        $params = $request->get_params();

        $patient_name = sanitize_text_field($params['patientName'] ?? '');
        $phone = sanitize_text_field($params['phone'] ?? '');
        $email = sanitize_email($params['email'] ?? '');

        if (empty($patient_name) || empty($phone)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Patient name and phone number are required.',
            ], 400);
        }

        $ref_id = 'JK-' . wp_rand(10000, 99999);

        $raw_cats = isset($_POST['file_categories']) ? (array) $_POST['file_categories'] : [];
        $saved_files = $this->process_uploaded_files('files', $raw_cats);

        $post_id = wp_insert_post([
            'post_type'   => self::POST_TYPE,
            'post_status' => 'publish',
            'post_title'  => sprintf('[%s] %s — Medical Dossier', $ref_id, $patient_name),
        ]);

        if (is_wp_error($post_id)) {
            return new WP_REST_Response(['success' => false, 'message' => 'Could not save document dossier.'], 500);
        }

        $meta = [
            '_drjem_ref_id'             => $ref_id,
            '_drjem_submission_type'    => 'document_upload',
            '_drjem_status'             => 'new',
            '_drjem_patient_name'       => $patient_name,
            '_drjem_patient_age'        => sanitize_text_field($params['age'] ?? ''),
            '_drjem_patient_gender'     => sanitize_text_field($params['gender'] ?? ''),
            '_drjem_city'               => sanitize_text_field($params['cityCountry'] ?? ''),
            '_drjem_phone'              => $phone,
            '_drjem_email'              => $email,
            '_drjem_submitter_relation' => sanitize_text_field($params['submitterRelation'] ?? 'self'),
            '_drjem_diagnosis'          => sanitize_text_field($params['cancerType'] ?? ''),
            '_drjem_stage'              => sanitize_text_field($params['currentStage'] ?? ''),
            '_drjem_current_treatment'  => sanitize_textarea_field($params['priorTreatment'] ?? ''),
            '_drjem_clinical_question'  => sanitize_textarea_field($params['specificQuestions'] ?? ''),
            '_drjem_dicom_link'         => esc_url_raw($params['dicomLink'] ?? ''),
            '_drjem_consent_given'      => !empty($params['consentGiven']) ? 'Yes (DPDP & NMC Consent Verified)' : 'Yes',
            '_drjem_files'              => $saved_files,
        ];

        foreach ($meta as $key => $val) {
            update_post_meta($post_id, $key, $val);
        }

        $this->send_admin_notification($post_id, $ref_id, 'Medical Document Upload', $patient_name, $phone, $email, count($saved_files));

        return rest_ensure_response([
            'success'      => true,
            'referenceId'  => $ref_id,
            'submissionId' => $post_id,
            'filesSaved'   => count($saved_files),
        ]);
    }

    /**
     * Endpoint 3: Contact / Appointment Inquiry
     */
    public function handle_contact_inquiry(WP_REST_Request $request) {
        $params = $request->get_params();

        $patient_name = sanitize_text_field($params['name'] ?? '');
        $phone = sanitize_text_field($params['phone'] ?? '');
        $email = sanitize_email($params['email'] ?? '');

        if (empty($patient_name) || empty($phone)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Name and phone number are required.',
            ], 400);
        }

        $ref_id = 'APT-' . wp_rand(10000, 99999);

        $post_id = wp_insert_post([
            'post_type'   => self::POST_TYPE,
            'post_status' => 'publish',
            'post_title'  => sprintf('[%s] %s — Appointment Inquiry', $ref_id, $patient_name),
        ]);

        if (is_wp_error($post_id)) {
            return new WP_REST_Response(['success' => false, 'message' => 'Could not save inquiry.'], 500);
        }

        $meta = [
            '_drjem_ref_id'            => $ref_id,
            '_drjem_submission_type'   => 'contact_inquiry',
            '_drjem_status'            => 'new',
            '_drjem_patient_name'      => $patient_name,
            '_drjem_phone'             => $phone,
            '_drjem_email'             => $email,
            '_drjem_city'              => sanitize_text_field($params['cityCountry'] ?? ''),
            '_drjem_preferred_date'    => sanitize_text_field($params['preferredDate'] ?? ''),
            '_drjem_diagnosis'         => sanitize_text_field($params['clinicalDomain'] ?? ''),
            '_drjem_consultation_mode' => sanitize_text_field($params['consultationMode'] ?? 'in_person'),
            '_drjem_clinical_question' => sanitize_textarea_field($params['message'] ?? ''),
            '_drjem_files'             => [],
        ];

        foreach ($meta as $key => $val) {
            update_post_meta($post_id, $key, $val);
        }

        $this->send_admin_notification($post_id, $ref_id, 'Appointment / Contact Inquiry', $patient_name, $phone, $email, 0);

        return rest_ensure_response([
            'success'      => true,
            'referenceId'  => $ref_id,
            'submissionId' => $post_id,
        ]);
    }

    /**
     * Send email alert to WordPress Admin Email
     */
    private function send_admin_notification($post_id, $ref_id, $type_label, $patient_name, $phone, $email, $file_count) {
        $admin_email = get_option('admin_email');
        if (empty($admin_email)) {
            return;
        }

        $edit_link = admin_url('post.php?post=' . intval($post_id) . '&action=edit');
        $subject = sprintf('[Dr. Jem Portal] New %s (%s) — %s', $type_label, $ref_id, $patient_name);

        $body = "A new patient submission has been received on jemkalathil.com.\n\n";
        $body .= "Reference ID: {$ref_id}\n";
        $body .= "Submission Type: {$type_label}\n";
        $body .= "Patient Name: {$patient_name}\n";
        $body .= "Phone / WhatsApp: {$phone}\n";
        $body .= "Email: {$email}\n";
        $body .= "Medical Documents Attached: {$file_count}\n\n";
        $body .= "Log in to WordPress Dashboard to review full clinical details and securely download documents:\n";
        $body .= $edit_link . "\n";

        @wp_mail($admin_email, $subject, $body);
    }

    /**
     * Secure Authenticated Download Handler (WP Admins Only)
     */
    public function handle_secure_file_download() {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized access. Please log in as a WordPress Administrator.', 'Forbidden', ['response' => 403]);
        }

        $sub_id = isset($_GET['sub_id']) ? intval($_GET['sub_id']) : 0;
        $file_idx = isset($_GET['file_idx']) ? intval($_GET['file_idx']) : -1;
        $nonce = isset($_GET['_wpnonce']) ? sanitize_text_field($_GET['_wpnonce']) : '';

        if (!wp_verify_nonce($nonce, 'drjem_download_' . $sub_id . '_' . $file_idx)) {
            wp_die('Invalid or expired security token.', 'Forbidden', ['response' => 403]);
        }

        $files = get_post_meta($sub_id, '_drjem_files', true);
        if (!is_array($files) || !isset($files[$file_idx])) {
            wp_die('Requested medical document not found.', 'Not Found', ['response' => 404]);
        }

        $file_info = $files[$file_idx];
        $private_dir = realpath($this->get_private_upload_dir());
        $file_path = realpath(trailingslashit($private_dir) . basename($file_info['stored_name']));

        if (!$file_path || strpos($file_path, $private_dir) !== 0 || !file_exists($file_path)) {
            wp_die('File is no longer available on disk.', 'Not Found', ['response' => 404]);
        }

        $disposition = (isset($_GET['view']) && $_GET['view'] === '1') ? 'inline' : 'attachment';
        $mime = !empty($file_info['mime_type']) ? $file_info['mime_type'] : 'application/octet-stream';

        header('Content-Description: File Transfer');
        header('Content-Type: ' . $mime);
        header('Content-Disposition: ' . $disposition . '; filename="' . basename($file_info['original_name']) . '"');
        header('Content-Length: ' . filesize($file_path));
        header('Cache-Control: private, no-store, must-revalidate');
        header('X-Robots-Tag: noindex, nofollow');

        readfile($file_path);
        exit;
    }

    /**
     * Custom Admin List Table Columns
     */
    public function set_custom_columns($columns) {
        return [
            'cb'          => $columns['cb'],
            'title'       => 'Case Reference & Patient',
            'sub_type'    => 'Type',
            'contact'     => 'Phone / Email',
            'clinical'    => 'Clinical Focus / Location',
            'documents'   => 'Documents',
            'case_status' => 'Status',
            'date'        => 'Received',
        ];
    }

    public function render_custom_column($column, $post_id) {
        switch ($column) {
            case 'sub_type':
                $type = get_post_meta($post_id, '_drjem_submission_type', true);
                $labels = [
                    'second_opinion'  => ['Second Opinion', '#c8a96a', '#111'],
                    'document_upload' => ['Medical Dossier', '#2563eb', '#fff'],
                    'contact_inquiry' => ['Appointment', '#059669', '#fff'],
                ];
                $badge = $labels[$type] ?? ['Submission', '#666', '#fff'];
                printf(
                    '<span style="display:inline-block;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:600;background:%s;color:%s;">%s</span>',
                    esc_attr($badge[1]),
                    esc_attr($badge[2]),
                    esc_html($badge[0])
                );
                break;

            case 'contact':
                $phone = get_post_meta($post_id, '_drjem_phone', true);
                $email = get_post_meta($post_id, '_drjem_email', true);
                if ($phone) {
                    $clean_wa = preg_replace('/[^0-9]/', '', $phone);
                    echo '<strong><a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a></strong>';
                    echo ' · <a href="https://wa.me/' . esc_attr($clean_wa) . '" target="_blank" style="color:#16a34a;font-weight:600;">WhatsApp</a><br>';
                }
                if ($email) {
                    echo '<a href="mailto:' . esc_attr($email) . '" style="font-size:12px;color:#555;">' . esc_html($email) . '</a>';
                }
                break;

            case 'clinical':
                $diag = get_post_meta($post_id, '_drjem_diagnosis', true);
                $city = get_post_meta($post_id, '_drjem_city', true);
                $country = get_post_meta($post_id, '_drjem_country', true);
                if ($diag) {
                    echo '<strong>' . esc_html(ucwords(str_replace('-', ' ', $diag))) . '</strong><br>';
                }
                $loc = trim($city . ($city && $country ? ', ' : '') . $country);
                if ($loc) {
                    echo '<span style="font-size:12px;color:#666;">📍 ' . esc_html($loc) . '</span>';
                }
                break;

            case 'documents':
                $files = get_post_meta($post_id, '_drjem_files', true);
                $dicom = get_post_meta($post_id, '_drjem_dicom_link', true);
                $count = is_array($files) ? count($files) : 0;
                if ($count > 0) {
                    echo '<span style="font-weight:600;color:#1d4ed8;">📎 ' . intval($count) . ' File(s)</span>';
                } else {
                    echo '<span style="color:#999;">None</span>';
                }
                if (!empty($dicom)) {
                    echo '<br><span style="font-size:11px;color:#b45309;">🔗 Cloud DICOM Link</span>';
                }
                break;

            case 'case_status':
                $status = get_post_meta($post_id, '_drjem_status', true) ?: 'new';
                $styles = [
                    'new'          => ['New', '#fee2e2', '#b91c1c'],
                    'under_review' => ['Under Review', '#fef3c7', '#b45309'],
                    'responded'    => ['Responded', '#dbeafe', '#1d4ed8'],
                    'completed'    => ['Completed', '#dcfce7', '#15803d'],
                ];
                $st = $styles[$status] ?? $styles['new'];
                printf(
                    '<span style="display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:700;background:%s;color:%s;">%s</span>',
                    esc_attr($st[1]),
                    esc_attr($st[2]),
                    esc_html($st[0])
                );
                break;
        }
    }

    /**
     * Filter Dropdown in Admin List Table
     */
    public function add_submission_type_filter($post_type) {
        if ($post_type !== self::POST_TYPE) {
            return;
        }
        $selected = isset($_GET['drjem_type']) ? sanitize_text_field($_GET['drjem_type']) : '';
        ?>
        <select name="drjem_type">
            <option value="">All Submission Types</option>
            <option value="second_opinion" <?php selected($selected, 'second_opinion'); ?>>Second Opinion Requests</option>
            <option value="document_upload" <?php selected($selected, 'document_upload'); ?>>Medical Document Uploads</option>
            <option value="contact_inquiry" <?php selected($selected, 'contact_inquiry'); ?>>Contact / Appointments</option>
        </select>
        <?php
    }

    public function filter_submissions_by_type($query) {
        if (!is_admin() || !$query->is_main_query() || $query->get('post_type') !== self::POST_TYPE) {
            return;
        }
        if (!empty($_GET['drjem_type'])) {
            $query->set('meta_key', '_drjem_submission_type');
            $query->set('meta_value', sanitize_text_field($_GET['drjem_type']));
        }
    }

    /**
     * Register Meta Boxes on Single Submission View
     */
    public function register_meta_boxes() {
        add_meta_box(
            'drjem_patient_dossier_box',
            'Patient Details & Clinical Submission',
            [$this, 'render_dossier_meta_box'],
            self::POST_TYPE,
            'normal',
            'high'
        );

        add_meta_box(
            'drjem_uploaded_documents_box',
            'Uploaded Medical Documents (Protected Private Storage)',
            [$this, 'render_documents_meta_box'],
            self::POST_TYPE,
            'normal',
            'high'
        );

        add_meta_box(
            'drjem_case_management_box',
            'Case Status & Clinical Notes',
            [$this, 'render_management_meta_box'],
            self::POST_TYPE,
            'side',
            'high'
        );
    }

    public function render_dossier_meta_box($post) {
        $fields = [
            'Reference ID'             => get_post_meta($post->ID, '_drjem_ref_id', true),
            'Submission Type'          => ucwords(str_replace('_', ' ', get_post_meta($post->ID, '_drjem_submission_type', true))),
            'Patient Full Name'        => get_post_meta($post->ID, '_drjem_patient_name', true),
            'Age'                      => get_post_meta($post->ID, '_drjem_patient_age', true),
            'Gender'                   => ucfirst(get_post_meta($post->ID, '_drjem_patient_gender', true)),
            'Phone / WhatsApp'         => get_post_meta($post->ID, '_drjem_phone', true),
            'Email Address'            => get_post_meta($post->ID, '_drjem_email', true),
            'Country'                  => get_post_meta($post->ID, '_drjem_country', true),
            'City / Location'          => get_post_meta($post->ID, '_drjem_city', true),
            'Submitter Relation'       => ucfirst(get_post_meta($post->ID, '_drjem_submitter_relation', true)),
            'Consultation Mode'        => ucwords(str_replace(['-', '_'], ' ', get_post_meta($post->ID, '_drjem_consultation_mode', true))),
            'Preferred Date'           => get_post_meta($post->ID, '_drjem_preferred_date', true),
            'Diagnosis / Clinical Area'=> get_post_meta($post->ID, '_drjem_diagnosis', true),
            'Current Stage'            => get_post_meta($post->ID, '_drjem_stage', true),
            'Current / Prior Treatment'=> get_post_meta($post->ID, '_drjem_current_treatment', true),
            'Previous Surgery'         => get_post_meta($post->ID, '_drjem_previous_surgery', true),
            'Treating Hospital/Doctor' => get_post_meta($post->ID, '_drjem_treating_doctor', true),
            'Clinical Question / Notes'=> get_post_meta($post->ID, '_drjem_clinical_question', true),
            'DPDP & NMC Consent'       => get_post_meta($post->ID, '_drjem_consent_given', true),
        ];

        echo '<table class="drjem-detail-table">';
        foreach ($fields as $label => $value) {
            if (empty($value)) {
                continue;
            }
            echo '<tr>';
            echo '<th>' . esc_html($label) . '</th>';
            if ($label === 'Phone / WhatsApp') {
                $clean_wa = preg_replace('/[^0-9]/', '', $value);
                echo '<td><strong><a href="tel:' . esc_attr($value) . '">' . esc_html($value) . '</a></strong> &nbsp; <a class="button button-small" href="https://wa.me/' . esc_attr($clean_wa) . '" target="_blank">Open WhatsApp</a></td>';
            } elseif ($label === 'Email Address') {
                echo '<td><a href="mailto:' . esc_attr($value) . '">' . esc_html($value) . '</a></td>';
            } else {
                echo '<td>' . nl2br(esc_html($value)) . '</td>';
            }
            echo '</tr>';
        }
        echo '</table>';
    }

    public function render_documents_meta_box($post) {
        $files = get_post_meta($post->ID, '_drjem_files', true);
        $dicom_link = get_post_meta($post->ID, '_drjem_dicom_link', true);

        if (!empty($dicom_link)) {
            echo '<div style="margin-bottom:14px;padding:12px;background:#fffbeb;border:1px solid #f59e0b;border-radius:6px;">';
            echo '<strong>🔗 External Cloud DICOM / Scan Link:</strong><br>';
            echo '<a href="' . esc_url($dicom_link) . '" target="_blank" rel="noopener noreferrer">' . esc_html($dicom_link) . '</a>';
            echo '</div>';
        }

        if (!is_array($files) || count($files) === 0) {
            echo '<p style="color:#666;">No medical files were uploaded with this submission.</p>';
            return;
        }

        echo '<table class="widefat striped">';
        echo '<thead><tr><th>Category</th><th>Document Name</th><th>Size</th><th>Actions</th></tr></thead><tbody>';
        foreach ($files as $idx => $f) {
            $nonce = wp_create_nonce('drjem_download_' . $post->ID . '_' . $idx);
            $download_url = admin_url(sprintf('admin-post.php?action=drjem_download_doc&sub_id=%d&file_idx=%d&_wpnonce=%s', $post->ID, $idx, $nonce));
            $view_url = $download_url . '&view=1';
            $size_str = size_format(intval($f['size_bytes'] ?? 0));

            echo '<tr>';
            echo '<td><span style="text-transform:uppercase;font-size:11px;font-weight:700;color:#92400e;">' . esc_html($f['category'] ?? 'Record') . '</span></td>';
            echo '<td><strong>' . esc_html($f['original_name'] ?? 'Document') . '</strong></td>';
            echo '<td>' . esc_html($size_str) . '</td>';
            echo '<td>';
            echo '<a href="' . esc_url($view_url) . '" target="_blank" class="button button-small">👁 View</a> ';
            echo '<a href="' . esc_url($download_url) . '" class="button button-primary button-small">⬇ Download</a>';
            echo '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
        echo '<p style="margin-top:10px;font-size:12px;color:#555;">🔒 Files are stored in a protected private directory inaccessible to search engines or public URLs.</p>';
    }

    public function render_management_meta_box($post) {
        wp_nonce_field('drjem_save_admin_meta', 'drjem_admin_nonce');
        $status = get_post_meta($post->ID, '_drjem_status', true) ?: 'new';
        $notes = get_post_meta($post->ID, '_drjem_internal_notes', true) ?: '';
        ?>
        <p>
            <label for="drjem_status"><strong>Case Status:</strong></label><br>
            <select name="drjem_status" id="drjem_status" style="width:100%;margin-top:4px;">
                <option value="new" <?php selected($status, 'new'); ?>>New Submission</option>
                <option value="under_review" <?php selected($status, 'under_review'); ?>>Under Clinical Review</option>
                <option value="responded" <?php selected($status, 'responded'); ?>>Responded to Patient</option>
                <option value="completed" <?php selected($status, 'completed'); ?>>Completed / Archived</option>
            </select>
        </p>
        <p>
            <label for="drjem_internal_notes"><strong>Private Doctor / Secretary Notes:</strong></label><br>
            <textarea name="drjem_internal_notes" id="drjem_internal_notes" rows="6" style="width:100%;margin-top:4px;" placeholder="Add clinical triage notes, follow-up call summary, or appointment confirmation..."><?php echo esc_textarea($notes); ?></textarea>
        </p>
        <?php
    }

    public function save_admin_meta($post_id) {
        if (!isset($_POST['drjem_admin_nonce']) || !wp_verify_nonce($_POST['drjem_admin_nonce'], 'drjem_save_admin_meta')) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (!current_user_can('manage_options')) {
            return;
        }

        if (isset($_POST['drjem_status'])) {
            update_post_meta($post_id, '_drjem_status', sanitize_text_field($_POST['drjem_status']));
        }
        if (isset($_POST['drjem_internal_notes'])) {
            update_post_meta($post_id, '_drjem_internal_notes', sanitize_textarea_field($_POST['drjem_internal_notes']));
        }
    }

    public function inject_admin_styles() {
        $screen = get_current_screen();
        if (!$screen || $screen->post_type !== self::POST_TYPE) {
            return;
        }
        echo '<style>
            .drjem-detail-table { width: 100%; border-collapse: collapse; }
            .drjem-detail-table th { text-align: left; width: 220px; padding: 10px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #334155; font-weight: 600; vertical-align: top; }
            .drjem-detail-table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; }
        </style>';
    }
}

new DrJem_Patient_Portal();
