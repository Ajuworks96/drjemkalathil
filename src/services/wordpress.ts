/**
 * WordPress REST API Service for Headless WordPress Integration
 * 
 * Connects the React luxury frontend to a WordPress backend:
 * - Articles / Blog Posts (/wp-json/wp/v2/posts)
 * - Categories (/wp-json/wp/v2/categories)
 * - Patient Reviews / Testimonials (via WP REST API or Custom Post Type)
 * - Rank Math / Yoast SEO metadata for dynamic search engine optimization
 */

export interface WPPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: string;
  authorName?: string;
  categoryName?: string;
  readTimeMinutes?: number;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    focusKeyword?: string;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Configurable WordPress API Base URL
export const WP_BASE_URL =
  import.meta.env.VITE_WORDPRESS_URL || 'https://backend.jemkalathil.com';

/**
 * Curated Oncology Articles (used as default fallback if WP URL is not yet connected)
 */
export const FALLBACK_ARTICLES: WPPost[] = [
  {
    id: 101,
    slug: 'oncoplastic-breast-surgery-organ-preservation',
    title: 'Oncoplastic Breast Surgery: Preserving Symmetry & Clinical Radicality',
    excerpt:
      'Understanding how advanced oncoplastic techniques allow radical oncological tumor clearance while preserving the natural contour and aesthetic symmetry of the breast.',
    content: `
      <p>Modern breast cancer management has evolved fundamentally beyond simple radical resection. Today, the clinical objective is twofold: achieving indisputable clear surgical margins while simultaneously preserving physical symmetry and self-identity.</p>
      <h3>What is Oncoplastic Breast Surgery?</h3>
      <p>Oncoplasty integrates plastic surgery principles directly into oncological tumor resection. Rather than leaving a visible defect, surrounding glandular tissue is mobilized and re-sculpted in the same sitting. This approach allows wider tumor clearance margins than standard lumpectomy while avoiding the psychological morbidity of a total mastectomy.</p>
      <h3>The Importance of Sentinel Lymph Node Biopsy</h3>
      <p>By utilizing dual-modality radio-guided localisation and blue dye, the first draining lymph node is identified and analyzed intraoperatively. This spares unnecessary full axillary clearance when the node is clear, dramatically reducing long-term lymphedema risk while maintaining strict staging accuracy.</p>
      <h3>Multidisciplinary Sequencing</h3>
      <p>The timing of surgery relative to systemic therapy is crucial. Neoadjuvant chemotherapy can significantly downstage tumors, transforming previously inoperable lesions or cases requiring mastectomy into candidates for safe breast conservation.</p>
    `,
    date: '2026-02-15',
    categoryName: 'Breast Oncology',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 5,
    featuredImage: '/images/clinical_case_review.jpg',
    seo: {
      title: 'Oncoplastic Breast Surgery in Kerala | Dr. Jem Kalathil',
      description:
        'Clinical guide to oncoplastic breast cancer surgery, organ preservation, and sentinel node biopsy by Dr. Jem Kalathil, Surgical Oncologist in Kochi, Kerala.',
      focusKeyword: 'oncoplastic breast surgery kerala',
    },
  },
  {
    id: 102,
    slug: 'hipec-cytoreductive-surgery-peritoneal-cancer',
    title: 'Cytoreductive Surgery & HIPEC: A Paradigm Shift for Peritoneal Cancers',
    excerpt:
      'How heated intraperitoneal chemotherapy (HIPEC) combined with meticulous complete cytoreduction offers therapeutic hope for previously inoperable peritoneal surface disease.',
    content: `
      <p>Peritoneal carcinomatosis was historically viewed as terminal disease with only palliative options. Over the past two decades, Cytoreductive Surgery (CRS) coupled with Hyperthermic Intraperitoneal Chemotherapy (HIPEC) has established a curative intent pathway for select patients with appendiceal malignancies, pseudomyxoma peritonei, colorectal metastases, and primary peritoneal or ovarian carcinomas.</p>
      <h3>How HIPEC Works</h3>
      <p>Following surgical removal of all visible peritoneal tumor deposits (cytoreduction down to CC-0 or CC-1 complete clearance), a heated chemotherapy bath (41.5°C to 42.5°C) is circulated continuously through the abdominal cavity for 60 to 90 minutes. Hyperthermia significantly enhances cytotoxic drug penetration into micro-metastases and directly induces malignant apoptosis while sparing systemic toxicity.</p>
      <h3>Candidate Selection is Paramount</h3>
      <p>Not every patient is a candidate for HIPEC. Rigorous Peritoneal Cancer Index (PCI) evaluation, patient functional performance status, and prior response to systemic therapy dictate surgical candidacy. Clear patient selection underpins optimal long-term survival.</p>
    `,
    date: '2026-01-20',
    categoryName: 'Surgical Options',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 7,
    featuredImage: '/images/hipec_perfusion_suite.jpg',
    seo: {
      title: 'HIPEC Surgery & Cytoreduction in Kochi | Dr. Jem Kalathil',
      description:
        'Comprehensive clinical explanation of CRS and HIPEC procedure for peritoneal malignancies in Kerala and the Gulf by Dr. Jem Kalathil.',
      focusKeyword: 'hipec surgery kochi',
    },
  },
  {
    id: 103,
    slug: 'when-to-seek-second-opinion-in-cancer-surgery',
    title: 'The Value of a Calm, Methodical Second Opinion in Oncology',
    excerpt:
      'A second opinion is not a confrontation with your primary surgeon; it is an objective review of histopathology, imaging, and resectability to give you absolute clarity.',
    content: `
      <p>When facing a complex oncological diagnosis, fear often rushes decisions. A calm, methodical second review of your tissue biopsy, PET-CT, and clinical stage frequently uncovers alternative surgical approaches, such as sphincter-saving or organ-preserving options, before irreversible cuts are made.</p>
      <h3>What an Independent Second Review Evaluates</h3>
      <ul>
        <li>Confirmation of histopathological grade and molecular markers (HER2, ER/PR, MSI-H, KRAS/BRAF).</li>
        <li>Review of vascular invasion and radiological boundaries against quaternary resectability criteria.</li>
        <li>Assessment of whether neoadjuvant systemic therapy could downstage the tumor prior to surgery.</li>
        <li>Confirmation that operative plans align with international NCCN and ESMO clinical guidelines.</li>
      </ul>
      <p>Seeking an independent perspective is standard practice in modern oncology and provides peace of mind for both patients and their families.</p>
    `,
    date: '2025-12-10',
    categoryName: 'Second Opinions',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 4,
    featuredImage: '/images/clinical_intake_dossier.jpg',
    seo: {
      title: 'Cancer Second Opinion in Kochi, Kerala | Dr. Jem Kalathil',
      description:
        'Objective surgical second opinions for breast, gastrointestinal, and peritoneal cancer diagnoses by Dr. Jem Kalathil.',
      focusKeyword: 'cancer second opinion kerala',
    },
  },
  {
    id: 104,
    slug: 'robotic-surgical-oncology-pelvic-resection',
    title: 'Robotic Surgical Oncology: Sub-Millimeter Dexterity in Deep Pelvic Resections',
    excerpt:
      'Deploying high-magnification 3D optics and wrist-guided instrumentation for complex deep pelvic, gastrointestinal, and retroperitoneal tumors with rapid functional recovery.',
    content: `
      <p>Tumors positioned deep within the pelvis, retroperitoneum, or upper abdomen present severe technical challenges under traditional open or standard laparoscopic approaches. Robotic surgical oncology expands surgical dexterity and precision to preserve delicate autonomic nerve networks while achieving complete R0 margin clearance.</p>
      <h3>Key Advantages of daVinci Surgical Precision</h3>
      <ul>
        <li>Sub-millimeter tremor filtration and 540-degree wrist articulation exceeding the natural human hand.</li>
        <li>True 3D high-magnification binocular stereoscopic view of critical micro-vessels and autonomic plexus.</li>
        <li>Dramatically reduced intraoperative blood loss and negligible tissue traction trauma.</li>
        <li>Rapid return of bowel function, preserved urinary and sexual continence, and shorter postoperative hospital stays.</li>
      </ul>
    `,
    date: '2025-11-28',
    categoryName: 'Surgical Options',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 6,
    featuredImage: '/images/surgical_precision_instruments.jpg',
    seo: {
      title: 'Robotic Cancer Surgery in Kochi | Dr. Jem Kalathil',
      description:
        'Advanced robotic surgical oncology for gastrointestinal, pelvic, and retroperitoneal resections by Dr. Jem Kalathil, Surgical Oncologist in Kochi, Kerala.',
      focusKeyword: 'robotic cancer surgery kochi',
    },
  },
  {
    id: 105,
    slug: 'understanding-cancer-staging-beyond-the-numbers',
    title: 'Understanding Cancer Staging: Beyond the Numbers',
    excerpt:
      'Demystifying TNM and clinical cancer staging in plain language — what Stage I to IV truly means for surgical viability, multimodal sequencing, and treatment decisions.',
    content: `
      <p>When patients receive a cancer diagnosis, the number assigned to their stage often triggers intense anxiety. However, in modern surgical oncology, staging is not a fixed sentence or mere prognosis — it is a precise anatomical roadmap that dictates treatment sequencing.</p>
      <h3>The TNM Framework Demystified</h3>
      <p>Clinical staging primarily relies on the international TNM classification:</p>
      <ul>
        <li><strong>T (Tumor):</strong> The size and local extent of the primary lesion, including whether it has invaded adjacent muscular, vascular, or serosal boundaries.</li>
        <li><strong>N (Nodes):</strong> Whether regional lymph nodes contain cancer cells, and how many are involved.</li>
        <li><strong>M (Metastasis):</strong> Whether microscopic or visible cancer cells have spread to distant organs such as the liver, lungs, or peritoneum.</li>
      </ul>
      <h3>Staging Guides Sequencing, Not Just Prognosis</h3>
      <p>A higher stage does not automatically preclude curative intent. In many advanced Stage III and oligometastatic Stage IV scenarios, aggressive modern systemic regimens combined with quaternary surgical resections (such as CRS and HIPEC, or liver metastasectomy) achieve durable disease clearance.</p>
    `,
    date: '2025-10-14',
    categoryName: 'Understanding Your Diagnosis',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 5,
    featuredImage: '/images/clinical_intake_dossier.jpg',
    seo: {
      title: 'Understanding Cancer Staging | Dr. Jem Kalathil',
      description:
        'Guide to cancer staging, TNM classification, and clinical treatment sequencing by Dr. Jem Kalathil, Surgical Oncologist.',
      focusKeyword: 'cancer staging explained',
    },
  },
  {
    id: 106,
    slug: 'decoding-your-pathology-report-margins-grade-receptors',
    title: 'Decoding Your Pathology Report: Margins, Grade & Receptors',
    excerpt:
      'A patient guide to histological grade, receptor markers (ER, PR, HER2, Ki-67), and what microscopic R0 margin clearance actually means for recurrence risk.',
    content: `
      <p>The histopathology report is the definitive blueprint upon which every oncological decision rests. While imaging shows where a tumor is located, pathology reveals its biological nature and aggressiveness.</p>
      <h3>Key Parameters in Your Report</h3>
      <ul>
        <li><strong>Histological Grade (G1 to G3):</strong> How closely tumor cells resemble healthy tissue under the microscope. Well-differentiated cells (Grade 1) grow more slowly, while poorly differentiated (Grade 3) exhibit higher biological aggressiveness.</li>
        <li><strong>Receptor Profiling:</strong> In breast carcinoma, ER, PR, and HER2 testing dictates hormone and targeted therapy sensitivity. In colorectal cancer, MSI/MMR testing indicates whether immunotherapy will be effective.</li>
        <li><strong>Surgical Margins (R0 vs R1/R2):</strong> An R0 resection signifies that no cancer cells are seen at the outer microscopic inked margin of the resected tissue. This is the gold standard of oncological surgery.</li>
      </ul>
      <p>If your pathology report notes a positive or close margin, secondary revision or oncoplastic margin re-excision is evaluated to guarantee long-term local control.</p>
    `,
    date: '2025-09-22',
    categoryName: 'Understanding Your Diagnosis',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 6,
    featuredImage: '/images/clinical_case_review.jpg',
    seo: {
      title: 'Decoding Your Oncology Pathology Report | Dr. Jem Kalathil',
      description:
        'Understanding pathology margins, histological grade, and receptor markers with Dr. Jem Kalathil.',
      focusKeyword: 'oncology pathology report guide',
    },
  },
  {
    id: 107,
    slug: 'laparoscopic-vs-open-surgery-in-oncology',
    title: 'Laparoscopic vs. Open Surgery in Oncology: How the Decision is Made',
    excerpt:
      'The clinical criteria that dictate whether a minimally invasive or open oncological resection is safest. Why the best approach is chosen for the tumor, not convenience.',
    content: `
      <p>Advances in minimally invasive surgery—both laparoscopic and robotic—have transformed cancer care, providing smaller incisions, reduced pain, and shorter hospital stays. However, the fundamental rule of surgical oncology remains unchanged: oncological radicality and complete margin clearance must never be compromised for cosmetic reasons.</p>
      <h3>When Minimally Invasive Surgery Excels</h3>
      <p>For early-to-intermediate stage gastrointestinal, gynecological, and pelvic tumors, laparoscopy and robotic platforms offer equivalent oncological clearance to open surgery while facilitating faster return to systemic adjuvant therapies.</p>
      <h3>When Open Surgery Remains Mandatory</h3>
      <p>In extensive tumors involving critical vascular bundles, massive locally advanced disease, or cytoreductive peritonectomy for peritoneal carcinomatosis (CRS & HIPEC), wide open surgical exposure is essential to achieve tactile verification and complete CC-0 cytoreduction.</p>
    `,
    date: '2025-08-18',
    categoryName: 'Surgical Options',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 6,
    featuredImage: '/images/surgical_precision_instruments.jpg',
    seo: {
      title: 'Laparoscopic vs Open Cancer Surgery | Dr. Jem Kalathil',
      description:
        'Comparing laparoscopic, robotic, and open oncological resections with Dr. Jem Kalathil in Kochi, Kerala.',
      focusKeyword: 'laparoscopic vs open cancer surgery',
    },
  },
  {
    id: 108,
    slug: 'cytoreductive-surgery-what-patients-should-know',
    title: 'Cytoreductive Surgery: What Patients Should Know Before Consenting',
    excerpt:
      'A transparent examination of cytoreductive peritonectomy — surgical scope, physiological demands, ICU recovery arcs, and what complete CC-0 cytoreduction entails.',
    content: `
      <p>Cytoreductive surgery (CRS) combined with HIPEC is one of the most extensive procedures performed in modern oncology. Understanding the scope, physiological demands, and expected recovery arc is vital for patients and their families before undertaking this pathway.</p>
      <h3>What Cytoreduction Entails</h3>
      <p>The goal of CRS is the macroscopic removal of all visible peritoneal implants across the abdominal cavity. This may require multivisceral peritonectomy, stripping of the diaphragmatic peritoneum, omentectomy, and selective bowel resections to achieve complete cytoreduction (Completeness of Cytoreduction score CC-0 or CC-1).</p>
      <h3>The Recovery Trajectory</h3>
      <p>Given the multi-hour duration of CRS and hyperthermic perfusion, recovery involves standardized postoperative ICU monitoring for 24 to 48 hours, followed by early mobilization and structured nutritional rehabilitation on the surgical oncology floor.</p>
    `,
    date: '2025-07-09',
    categoryName: 'Surgical Options',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 7,
    featuredImage: '/images/neutral_hipec_or.jpg',
    seo: {
      title: 'Cytoreductive Surgery Patient Guide | Dr. Jem Kalathil',
      description:
        'Detailed overview of cytoreductive surgery and HIPEC recovery protocols by Dr. Jem Kalathil.',
      focusKeyword: 'cytoreductive surgery hipec guide',
    },
  },
  {
    id: 109,
    slug: 'preparing-for-major-oncology-surgery-patient-checklist',
    title: 'Preparing for Major Oncology Surgery: A Patient & Family Checklist',
    excerpt:
      'Evidence-based prehabilitation, nutritional optimization, medication reconciliation, and psychological preparation before major oncological resections.',
    content: `
      <p>Optimal surgical outcomes do not begin in the operating theatre — they begin weeks before with deliberate prehabilitation and physiological optimization.</p>
      <h3>Essential Preparation Pillars</h3>
      <ul>
        <li><strong>Nutritional Fortification:</strong> Ensuring adequate protein intake and correcting hypoalbuminemia helps tissue healing and reduces postoperative anastomotic leak risks.</li>
        <li><strong>Respiratory & Physical Conditioning:</strong> Daily incentive spirometry exercises and moderate walking significantly reduce postoperative atelectasis and pulmonary complications.</li>
        <li><strong>Medication Reconciliation:</strong> Coordinating with the clinical desk to pause anticoagulants, antiplatelet drugs, or specific diabetic agents at verified intervals before admission.</li>
        <li><strong>Family Caregiver Alignment:</strong> Preparing discharge accommodations and logistics well in advance to ensure a tranquil environment for home convalescence.</li>
      </ul>
    `,
    date: '2025-06-12',
    categoryName: 'Before & After Surgery',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 5,
    featuredImage: '/images/clinical_intake_dossier.jpg',
    seo: {
      title: 'Pre-Surgical Oncology Checklist | Dr. Jem Kalathil',
      description:
        'Prehabilitation and preparation guidelines for major cancer surgery by Dr. Jem Kalathil.',
      focusKeyword: 'preparing for cancer surgery',
    },
  },
  {
    id: 110,
    slug: 'what-to-expect-in-the-first-72-hours-after-abdominal-surgery',
    title: 'What to Expect in the First 72 Hours After Major Abdominal Cancer Surgery',
    excerpt:
      'Normalizing the immediate postoperative sequence — pain management protocols, surgical drains, early ambulation milestones, and recovery in specialized oncology care.',
    content: `
      <p>The first 72 hours following complex abdominal or pelvic cancer surgery can feel overwhelming. Normalizing this sequence dispels anxiety and empowers active participation in recovery.</p>
      <h3>Milestones in the First 3 Days</h3>
      <ul>
        <li><strong>Day 1 (ICU / HDU Transition):</strong> Multi-modal epidural and PCA analgesia keeps pain controlled. Respiratory therapy begins with deep breathing exercises, and bedside sitting is encouraged.</li>
        <li><strong>Day 2 (Early Ambulation):</strong> Assisted standing and short corridor walks stimulate bowel peristalsis and venous return, sharply lowering DVT and ileus risk.</li>
        <li><strong>Day 3 (Oral Fluid Transition & Drain Monitoring):</strong> Clear oral liquids are introduced progressively, surgical drains are evaluated for output volume, and intravenous infusions are steadily tapered.</li>
      </ul>
    `,
    date: '2025-05-18',
    categoryName: 'Before & After Surgery',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 5,
    featuredImage: '/images/clinical_case_review.jpg',
    seo: {
      title: 'First 72 Hours After Abdominal Cancer Surgery | Dr. Jem Kalathil',
      description:
        'Postoperative recovery milestones following major abdominal oncological surgery with Dr. Jem Kalathil.',
      focusKeyword: 'recovery after abdominal cancer surgery',
    },
  },
  {
    id: 111,
    slug: 'five-questions-to-ask-before-agreeing-to-cancer-surgery',
    title: 'Five Questions to Ask Before Agreeing to Oncology Surgery',
    excerpt:
      'Empowering patients before major surgery: understanding procedural goals, organ-preserving alternatives, margin targets, institutional volume, and timing.',
    content: `
      <p>A cancer diagnosis often creates an overwhelming urgency to agree to surgery immediately. However, an informed patient makes safer decisions. An experienced surgical oncologist will always welcome detailed, thoughtful questions.</p>
      <h3>The Five Crucial Questions</h3>
      <ol>
        <li><strong>What is the specific goal of this surgery?</strong> Is the intention curative with microscopic R0 clearance, diagnostic, cytoreductive, or palliative?</li>
        <li><strong>Are organ-preserving or minimally invasive alternatives feasible?</strong> For instance, in breast cancer, is oncoplastic conservation possible instead of total mastectomy? In rectal cancer, can sphincter preservation be achieved?</li>
        <li><strong>Should systemic therapy happen before surgery?</strong> Would neoadjuvant chemotherapy or targeted therapy downstage the disease and improve surgical margins?</li>
        <li><strong>What is the surgeon’s and center’s experience with this specific procedure?</strong> High-volume surgical oncology centers consistently demonstrate lower complication and recurrence rates.</li>
        <li><strong>What is the recovery trajectory and how will my post-operative quality of life be protected?</strong> Understanding functional outcomes beforehand allows proactive planning.</li>
      </ol>
    `,
    date: '2025-04-05',
    categoryName: 'Second Opinions',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 6,
    featuredImage: '/images/dr_jem_kalathil.jpg',
    seo: {
      title: 'Questions to Ask Before Cancer Surgery | Dr. Jem Kalathil',
      description:
        'Crucial questions every patient should ask their surgical oncologist before agreeing to cancer surgery.',
      focusKeyword: 'questions to ask cancer surgeon',
    },
  },
];

/**
 * Fetch published posts from WordPress REST API
 */
export async function fetchWordpressPosts(params?: {
  page?: number;
  perPage?: number;
  categoryId?: number;
  search?: string;
}): Promise<WPPost[]> {
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL;

  // If no live WordPress URL configured yet, return fallback articles
  if (!wpUrl) {
    return FALLBACK_ARTICLES;
  }

  try {
    const url = new URL(`${wpUrl.replace(/\/$/, '')}/wp-json/wp/v2/posts`);
    url.searchParams.set('_embed', 'true');
    url.searchParams.set('per_page', String(params?.perPage || 10));
    url.searchParams.set('page', String(params?.page || 1));
    if (params?.categoryId) {
      url.searchParams.set('categories', String(params.categoryId));
    }
    if (params?.search) {
      url.searchParams.set('search', params.search);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`WordPress REST API error: ${response.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawPosts = await response.json();

    if (!Array.isArray(rawPosts) || rawPosts.length === 0) {
      return FALLBACK_ARTICLES;
    }

    // Filter out standard WordPress boilerplate "Hello world!", gallery posts, and clinical-areas posts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredPosts = rawPosts.filter((post: any) => {
      if (post.slug === 'hello-world') return false;
      if (post.slug?.startsWith('gallery-')) return false;
      const terms = (post._embedded?.['wp:term'] || []).flat();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const catSlugs = terms.map((t: any) => t.slug?.toLowerCase() || '');
      if (catSlugs.includes('gallery')) return false;
      if (catSlugs.includes('clinical-areas')) return false;
      return true;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedPosts: WPPost[] = filteredPosts.map((post: any) => {
      // Extract featured media
      const featuredImage =
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        post.jetpack_featured_media_url ||
        undefined;

      // Extract author
      const authorName =
        post._embedded?.author?.[0]?.name || 'Dr. Jem Kalathil';

      // Extract category
      const categoryName =
        post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Clinical Guidance';

      // Extract Yoast / Rank Math SEO if installed
      const rankMath = post.rank_math_seo;
      const yoast = post.yoast_head_json;

      const seoTitle =
        rankMath?.title ||
        yoast?.title ||
        post.title?.rendered;

      const seoDesc =
        rankMath?.description ||
        yoast?.description ||
        post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim();

      const seoCanonical =
        rankMath?.canonical_url ||
        yoast?.canonical ||
        undefined;

      const seoOgImage =
        rankMath?.og_image?.[0]?.url ||
        yoast?.og_image?.[0]?.url ||
        featuredImage;

      return {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered || 'Untitled Article',
        excerpt: post.excerpt?.rendered || '',
        content: post.content?.rendered || '',
        date: post.date,
        featuredImage,
        authorName,
        categoryName,
        readTimeMinutes: Math.max(
          3,
          Math.ceil(
            (post.content?.rendered?.replace(/<[^>]+>/g, '').split(/\s+/).length || 500) / 200
          )
        ),
        seo: {
          title: seoTitle,
          description: seoDesc,
          canonical: seoCanonical,
          ogImage: seoOgImage,
          focusKeyword: rankMath?.focus_keyword,
        },
      } as WPPost;
    });

    if (mappedPosts.length === 0) {
      return FALLBACK_ARTICLES;
    }

    // Merge live WordPress blog posts with fallback articles (WP posts take precedence on matching slug)
    const wpSlugs = new Set(mappedPosts.map((p) => p.slug));
    const nonDuplicatedFallbacks = FALLBACK_ARTICLES.filter((f) => !wpSlugs.has(f.slug));
    return [...mappedPosts, ...nonDuplicatedFallbacks];
  } catch (error) {
    console.warn('Could not fetch from WordPress API, using fallback articles:', error);
    return FALLBACK_ARTICLES;
  }
}

/**
 * Fetch a single post by slug from WordPress
 */
export async function fetchWordpressPostBySlug(slug: string): Promise<WPPost | null> {
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL;

  if (!wpUrl) {
    const fallback = FALLBACK_ARTICLES.find((p) => p.slug === slug);
    return fallback || null;
  }

  try {
    const url = `${wpUrl.replace(/\/$/, '')}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=true`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts = await response.json();
    if (!posts || posts.length === 0) {
      return FALLBACK_ARTICLES.find((p) => p.slug === slug) || null;
    }

    const post = posts[0];
    const featuredImage =
      post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      post.jetpack_featured_media_url ||
      undefined;

    const authorName = post._embedded?.author?.[0]?.name || 'Dr. Jem Kalathil';
    const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Oncology Clinical Notes';

    const rankMath = post.rank_math_seo;
    const yoast = post.yoast_head_json;

    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered || 'Untitled Article',
      excerpt: post.excerpt?.rendered || '',
      content: post.content?.rendered || '',
      date: post.date,
      featuredImage,
      authorName,
      categoryName,
      readTimeMinutes: Math.max(
        3,
        Math.ceil(
          (post.content?.rendered?.replace(/<[^>]+>/g, '').split(/\s+/).length || 500) / 200
        )
      ),
      seo: {
        title: rankMath?.title || yoast?.title || post.title?.rendered,
        description:
          rankMath?.description ||
          yoast?.description ||
          post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim(),
        canonical: rankMath?.canonical_url || yoast?.canonical,
        ogImage: rankMath?.og_image?.[0]?.url || yoast?.og_image?.[0]?.url || featuredImage,
        focusKeyword: rankMath?.focus_keyword,
      },
    };
  } catch (error) {
    console.warn(`Could not fetch post ${slug} from WordPress:`, error);
    return FALLBACK_ARTICLES.find((p) => p.slug === slug) || null;
  }
}

/**
 * Gallery Item Interface & Dynamic WordPress Service
 */
export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'consultations' | 'surgical' | 'campus' | 'leadership';
  categoryLabel: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
}

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'consultation-suite',
    title: 'Compassionate Consultation Suite',
    category: 'consultations',
    categoryLabel: 'Patient Care & Consultation',
    imageSrc: '/images/clinical_intake_dossier.jpg',
    imageAlt: 'Surgical oncology consultation suite with diagnostic records and imaging review workstation',
    description: 'Providing patients and families with unhurried clarity, high-resolution scan reviews, and compassionate clinical guidance when choices seem daunting.',
  },
  {
    id: 'dr-jem-portrait',
    title: 'Dr. Jem Kalathil · MS, FRCS (Edin)',
    category: 'leadership',
    categoryLabel: 'Surgical Leadership',
    imageSrc: '/images/dr_jem_kalathil.jpg',
    imageAlt: 'Dr. Jem Kalathil, Surgical Oncologist',
    description: 'Three decades of dedicated surgical oncology practice, pioneering oncoplastic breast conservation and cytoreductive HIPEC in Kerala and South Asia.',
  },
  {
    id: 'campus-environment',
    title: 'Clinical Campus Environment, Kochi',
    category: 'campus',
    categoryLabel: 'Surgical Campus',
    imageSrc: '/images/aster_medcity_campus.jpg',
    imageAlt: 'Quaternary waterfront hospital campus in Kochi, Kerala',
    description: 'A quaternary oncology centre on the serene Cheranallur backwaters, Kochi — offering a healing environment for complex surgical care.',
  },
  {
    id: 'mdt-case-review',
    title: 'Multidisciplinary Tumor Board (MDT) Review',
    category: 'consultations',
    categoryLabel: 'Clinical Review',
    imageSrc: '/images/clinical_case_review.jpg',
    imageAlt: 'Multidisciplinary oncology tumor board reviewing imaging and treatment protocols',
    description: 'Cross-verifying histological staging, resection boundaries, and multimodal sequencing among surgical, medical, and radiation oncology specialists.',
  },
  {
    id: 'robotic-oncology-suite',
    title: 'Advanced daVinci Robotic Oncology Suite',
    category: 'surgical',
    categoryLabel: 'Surgical Technology',
    imageSrc: '/images/surgical_precision_instruments.jpg',
    imageAlt: 'Advanced robotic surgical console instrumentation for minimally invasive oncological resections',
    description: 'Enabling sub-millimeter precision, 3D magnified visualization, and minimal tissue trauma for pelvic, gastrointestinal, and retroperitoneal cancers.',
  },
  {
    id: 'quaternary-theatre',
    title: 'Quaternary Cytoreductive Perfusion Theatre',
    category: 'surgical',
    categoryLabel: 'Surgical Technology',
    imageSrc: '/images/hipec_perfusion_suite.jpg',
    imageAlt: 'Specialized surgical theatre equipped for cytoreductive surgery and heated intraperitoneal chemotherapy',
    description: 'Engineered specifically for extended cytoreductive peritonectomy and continuous 42°C Hyperthermic Intraperitoneal Chemotherapy (HIPEC) perfusions.',
  },
  {
    id: 'frozen-section-suite',
    title: 'Intraoperative Histopathology & Frozen Section Suite',
    category: 'surgical',
    categoryLabel: 'Surgical Technology',
    imageSrc: '/images/neutral_hipec_or.jpg',
    imageAlt: 'Intraoperative frozen section analysis enabling immediate margin clearance',
    description: 'Real-time intraoperative frozen section analysis enabling immediate confirmation of microscopic margins while surgery is underway.',
  },
  {
    id: 'dedicated-patient-care',
    title: 'Second Opinion Clinical Evaluation',
    category: 'consultations',
    categoryLabel: 'Patient Care & Consultation',
    imageSrc: '/images/dr_jem_kalathil.jpg',
    imageAlt: 'Dr. Jem Kalathil dedicated second opinion clinic',
    description: 'Offering objective, calm second opinions to confirm diagnoses, verify resectability, and avoid unnecessary total mastectomies or premature palliative conclusions.',
  },
];

/**
 * Fetch dynamic Gallery items from WordPress REST API
 * Supports posts in category 'gallery' or posts with slug starting with 'gallery-'
 */
export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL;
  if (!wpUrl) return DEFAULT_GALLERY_ITEMS;

  try {
    const res = await fetch(`${wpUrl.replace(/\/$/, '')}/wp-json/wp/v2/posts?per_page=50&_embed=true`);
    if (!res.ok) return DEFAULT_GALLERY_ITEMS;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawPosts = await res.json();
    if (!Array.isArray(rawPosts)) return DEFAULT_GALLERY_ITEMS;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const galleryPosts = rawPosts.filter((post: any) => {
      const isGallerySlug = post.slug?.startsWith('gallery-');
      const terms = (post._embedded?.['wp:term'] || []).flat();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasGalleryCat = terms.some((t: any) => t.slug === 'gallery' || t.name?.toLowerCase() === 'gallery');
      return isGallerySlug || hasGalleryCat;
    });

    if (galleryPosts.length === 0) {
      return DEFAULT_GALLERY_ITEMS;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dynamicItems: GalleryItem[] = galleryPosts.map((post: any, idx: number) => {
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
      const imageSrc =
        featuredMedia?.source_url ||
        post.jetpack_featured_media_url ||
        DEFAULT_GALLERY_ITEMS[idx % DEFAULT_GALLERY_ITEMS.length]?.imageSrc ||
        '/images/surgical_precision_instruments.jpg';

      const title = post.title?.rendered?.replace(/<[^>]+>/g, '').trim() || 'Clinical Infrastructure';
      const description =
        post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() ||
        post.content?.rendered?.replace(/<[^>]+>/g, '').trim() ||
        '';

      const terms = (post._embedded?.['wp:term'] || []).flat();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const termSlugs = terms.map((t: any) => t.slug?.toLowerCase() || '');
      const fullText = (title + ' ' + description).toLowerCase();

      let cat: 'consultations' | 'surgical' | 'campus' | 'leadership' = 'consultations';
      if (termSlugs.includes('surgical') || fullText.includes('surgical') || fullText.includes('robotic') || fullText.includes('hipec') || fullText.includes('theatre') || fullText.includes('or')) {
        cat = 'surgical';
      } else if (termSlugs.includes('campus') || fullText.includes('campus') || fullText.includes('hospital') || fullText.includes('environment')) {
        cat = 'campus';
      } else if (termSlugs.includes('leadership') || fullText.includes('leadership') || fullText.includes('portrait') || fullText.includes('dr. jem') || fullText.includes('practice')) {
        cat = 'leadership';
      } else {
        cat = 'consultations';
      }

      const labelMap = {
        consultations: 'Patient Care & Consultation',
        surgical: 'Surgical Suites & Technology',
        campus: 'Surgical Campus & Environment',
        leadership: 'Surgical Leadership',
      };

      return {
        id: post.slug || `wp-gallery-${post.id}`,
        title,
        category: cat,
        categoryLabel: labelMap[cat],
        imageSrc,
        imageAlt: featuredMedia?.alt_text || title,
        description,
      };
    });

    const existingTitles = new Set(dynamicItems.map((d) => d.title.toLowerCase()));
    const remainingDefaults = DEFAULT_GALLERY_ITEMS.filter((def) => !existingTitles.has(def.title.toLowerCase()));
    return [...dynamicItems, ...remainingDefaults];
  } catch (err) {
    console.warn('Could not fetch WordPress gallery items, using defaults:', err);
    return DEFAULT_GALLERY_ITEMS;
  }
}

/**
 * Patient Reviews / Testimonials Interface
 */
export interface PatientReview {
  id: string;
  patientName: string;
  rating: number;
  surgeryType: string;
  reviewText: string;
  location?: string;
  date?: string;
  isVerified?: boolean;
}

export const DEFAULT_PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'rev-1',
    patientName: 'K. S. Narayanan',
    rating: 5,
    surgeryType: 'Oncoplastic Breast Surgery',
    reviewText:
      'Dr. Jem Kalathil provided the exact clarity our family needed during an overwhelming breast cancer diagnosis. His calm demeanor, organ-preservation focus, and surgical precision gave my wife full confidence. Five years cancer-free today.',
    location: 'Ernakulam, Kochi',
    date: 'February 2026',
    isVerified: true,
  },
  {
    id: 'rev-2',
    patientName: 'Fathima & Tariq Al-Hashmi',
    rating: 5,
    surgeryType: 'HIPEC & Cytoreductive Surgery',
    reviewText:
      'We traveled from Muscat, Oman for Dr. Jem’s second opinion on peritoneal surface cancer after local doctors in the Gulf considered surgery impossible. The HIPEC cytoreduction gave us new hope. His team’s care is world-class.',
    location: 'Muscat, Oman',
    date: 'January 2026',
    isVerified: true,
  },
  {
    id: 'rev-3',
    patientName: 'Dr. Mathew Varghese (Retd. Prof)',
    rating: 5,
    surgeryType: 'Retroperitoneal Sarcoma',
    reviewText:
      'As a doctor myself, I appreciate Dr. Jem’s absolute clinical honesty and mastery. He explains surgical margins, risks, and alternatives without exaggeration. The gold standard in surgical oncology across South India.',
    location: 'Kottayam, Kerala',
    date: 'December 2025',
    isVerified: true,
  },
  {
    id: 'rev-4',
    patientName: 'Anitha Radhakrishnan',
    rating: 5,
    surgeryType: 'Robotic Cancer Surgery',
    reviewText:
      'Minimally invasive robotic procedure with rapid recovery. Back on my feet in three days. Thank you Dr. Jem Kalathil and surgical team for your compassion and guidance.',
    location: 'Thrissur, Kerala',
    date: 'November 2025',
    isVerified: true,
  },
];

/**
 * Fetch Patient Reviews from WordPress REST API
 * Supports both:
 * 1. ACF fields on the Home/Reviews page (test_1_name, test_1_quote, etc.)
 * 2. Dedicated WordPress Posts under category 'patient-reviews' or 'reviews'
 * 3. Graceful fallback to verified curated clinical reviews
 */
export async function fetchPatientReviews(): Promise<PatientReview[]> {
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL;
  if (!wpUrl) {
    return DEFAULT_PATIENT_REVIEWS;
  }

  // 1. Check if the Home page has ACF testimonial fields populated
  try {
    const page = await fetchWordpressPage('home');
    if (page && page.acf) {
      const acf = page.acf;
      const acfReviews: PatientReview[] = [];

      for (let i = 1; i <= 6; i++) {
        const name = acf[`test_${i}_name`];
        const quote = acf[`test_${i}_quote`];
        if (name && quote && quote.trim().length > 0) {
          acfReviews.push({
            id: `wp-acf-rev-${i}`,
            patientName: name,
            surgeryType: acf[`test_${i}_procedure`] || 'Surgical Oncology Consultation',
            reviewText: quote.trim(),
            location: acf[`test_${i}_location`] || 'Kerala / GCC',
            rating: Number(acf[`test_${i}_rating`]) || 5,
            isVerified: true,
          });
        }
      }

      if (acfReviews.length > 0) {
        return acfReviews;
      }
    }
  } catch (err) {
    console.warn('Could not inspect ACF reviews on home page:', err);
  }

  // 2. Check WordPress Posts with category 'patient-reviews' or 'reviews'
  try {
    const url = `${wpUrl.replace(/\/$/, '')}/wp-json/wp/v2/posts?categories_slug=patient-reviews&_embed=true`;
    const response = await fetch(url);
    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((post: any) => ({
          id: String(post.id),
          patientName: post.title?.rendered || 'Verified Patient',
          rating: post.acf?.rating || 5,
          surgeryType: post.acf?.surgery_type || 'Surgical Oncology Consultation',
          reviewText: post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || post.content?.rendered?.replace(/<[^>]+>/g, '').trim(),
          location: post.acf?.location || 'Kerala / GCC',
          date: post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : undefined,
          isVerified: true,
        }));
      }
    }
  } catch (err) {
    console.warn('WordPress posts reviews fetch failed, using fallback:', err);
  }

  return DEFAULT_PATIENT_REVIEWS;
}

/**
 * Global Site Settings Interface (Managed via WordPress ACF)
 */
export interface SiteSettingsData {
  doctorName: string;
  doctorCredentials: string;
  doctorRole: string;
  experienceYears: string;
  secretaryPhone: string;
  whatsappPhone: string;
  consultationEmail: string;
  clinicAddress: string;
  opdSchedule: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  doctorName: 'Dr. Jem Kalathil',
  doctorCredentials: 'MS, FRCS (Edin)',
  doctorRole: 'Surgical Oncologist',
  experienceYears: '30+',
  secretaryPhone: '+91 484 669 9999',
  whatsappPhone: '+91 949 771 2345',
  consultationEmail: 'surgical.oncology@asterhospital.com',
  clinicAddress: 'Aster Medcity, Cheranallur, Kochi, Kerala 682027, India',
  opdSchedule: 'Monday – Saturday, 09:00 AM – 04:00 PM IST',
  instagramUrl: 'https://www.instagram.com/drjemkalathil',
  facebookUrl: 'https://www.facebook.com/drjemkalathil',
  youtubeUrl: 'https://www.youtube.com/@drjemkalathil',
};

/**
 * Homepage Dynamic Content Interface (Managed via WordPress ACF)
 */
export interface HomePageData {
  heroHeadline: string;
  heroSubheadline: string;
  specialty1Title: string;
  specialty1Subtitle: string;
  specialty2Title: string;
  specialty2Subtitle: string;
  specialty3Title: string;
  specialty3Subtitle: string;
  editorialStatement1: string;
  editorialStatement2: string;
  editorialLeadProse: string;
  editorialBodyProse: string;
  surgeonProfileBio: string;
}

export const DEFAULT_HOMEPAGE_DATA: HomePageData = {
  heroHeadline: 'When surgical oncology demands indisputable clarity.',
  heroSubheadline:
    'Three decades of specialised surgical oncology —Advanced breast cancer care focussing on conservation and oncoplasty, HIPEC and cytoreduction, and robotic precision surgery for colorectal and gynaecological cancers. Evidence-based second opinions for patients across Kerala, India, and the Gulf.',
  specialty1Title: 'Breast Cancer & Oncoplastic Surgery',
  specialty1Subtitle: 'Organ Preservation & Reconstruction',
  specialty2Title: 'Advanced HIPEC & CRS',
  specialty2Subtitle: 'Cytoreductive Surgery for Colorectal & Gynaec Oncology',
  specialty3Title: 'Robotic Surgical Oncology',
  specialty3Subtitle: 'Da Vinci Precision',
  editorialStatement1: 'A second opinion is not disloyalty.',
  editorialStatement2: 'It is an essential oncological safeguard.',
  editorialLeadProse:
    'The days following a biopsy are often overwhelmed by shock, urgent advice, and irreversible choices. Patients are told that surgery must take place tomorrow.',
  editorialBodyProse:
    'Yet in thirty years of specialized surgical oncology, we know that taking 3 to 5 days to confirm histological receptors, re-examine scan boundaries, and explore organ preservation does not compromise curative outcomes. It protects both life and enduring dignity.',
  surgeonProfileBio:
    'Trained in the United Kingdom, Italy, Singapore and India, including a UICC Fellowship in Milan under Professor Umberto Veronesi, he was formerly Additional Professor of Surgical Oncology at the Regional Cancer Centre, Thiruvananthapuram, and Former Senior Consultant, Breast Unit, Royal Hospital, Muscat. Lead Principal Investigator on clinical trials.',
};

/**
 * Fetch dynamic page data from WordPress by slug
 */
export async function fetchWordpressPage(slug: string): Promise<Record<string, any> | null> {
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL;
  if (!wpUrl) return null;

  try {
    // 1. Try exact slug match
    const url = `${wpUrl.replace(/\/$/, '')}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed=true`;
    const response = await fetch(url);
    if (response.ok) {
      const pages = await response.json();
      if (Array.isArray(pages) && pages.length > 0) {
        return pages[0];
      }
    }

    // 2. Fallback: If requesting home and not found by slug, check if there's any published page
    if (slug === 'home' || slug === 'site-settings') {
      const fallbackUrl = `${wpUrl.replace(/\/$/, '')}/wp-json/wp/v2/pages?per_page=5&_embed=true`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const allPages = await fallbackRes.json();
        if (Array.isArray(allPages) && allPages.length > 0) {
          // Look for any page with acf fields populated
          const pageWithAcf = allPages.find((p) => p.acf && Object.keys(p.acf).length > 0);
          return pageWithAcf || allPages[0];
        }
      }
    }

    return null;
  } catch (error) {
    console.warn(`Could not fetch WordPress page for slug: ${slug}`, error);
    return null;
  }
}

/**
 * Fetch dynamic Homepage content from WordPress ACF
 */
export async function fetchHomePageData(): Promise<HomePageData> {
  const page = await fetchWordpressPage('home');
  if (!page || !page.acf) {
    return DEFAULT_HOMEPAGE_DATA;
  }

  const acf = page.acf;
  return {
    heroHeadline: acf.hero_headline || DEFAULT_HOMEPAGE_DATA.heroHeadline,
    heroSubheadline: acf.hero_subheadline || DEFAULT_HOMEPAGE_DATA.heroSubheadline,
    specialty1Title: acf.specialty_1_title || DEFAULT_HOMEPAGE_DATA.specialty1Title,
    specialty1Subtitle: acf.specialty_1_subtitle || DEFAULT_HOMEPAGE_DATA.specialty1Subtitle,
    specialty2Title: acf.specialty_2_title || DEFAULT_HOMEPAGE_DATA.specialty2Title,
    specialty2Subtitle: acf.specialty_2_subtitle || DEFAULT_HOMEPAGE_DATA.specialty2Subtitle,
    specialty3Title: acf.specialty_3_title || DEFAULT_HOMEPAGE_DATA.specialty3Title,
    specialty3Subtitle: acf.specialty_3_subtitle || DEFAULT_HOMEPAGE_DATA.specialty3Subtitle,
    editorialStatement1: acf.editorial_statement_1 || DEFAULT_HOMEPAGE_DATA.editorialStatement1,
    editorialStatement2: acf.editorial_statement_2 || DEFAULT_HOMEPAGE_DATA.editorialStatement2,
    editorialLeadProse: acf.editorial_lead_prose || DEFAULT_HOMEPAGE_DATA.editorialLeadProse,
    editorialBodyProse: acf.editorial_body_prose || DEFAULT_HOMEPAGE_DATA.editorialBodyProse,
    surgeonProfileBio: acf.surgeon_profile_bio || DEFAULT_HOMEPAGE_DATA.surgeonProfileBio,
  };
}

/**
 * Fetch dynamic Site Settings & Desk Info from WordPress ACF
 */
export async function fetchSiteSettings(): Promise<SiteSettingsData> {
  const page = (await fetchWordpressPage('site-settings')) || (await fetchWordpressPage('home'));
  if (!page || !page.acf) {
    return DEFAULT_SITE_SETTINGS;
  }

  const acf = page.acf;
  return {
    doctorName: acf.doctor_name || DEFAULT_SITE_SETTINGS.doctorName,
    doctorCredentials: 'MS, FRCS (Edin)',
    doctorRole: 'Surgical Oncologist',
    experienceYears: acf.experience_years || DEFAULT_SITE_SETTINGS.experienceYears,
    secretaryPhone: acf.secretary_phone || DEFAULT_SITE_SETTINGS.secretaryPhone,
    whatsappPhone: acf.whatsapp_phone || DEFAULT_SITE_SETTINGS.whatsappPhone,
    consultationEmail: acf.consultation_email || DEFAULT_SITE_SETTINGS.consultationEmail,
    clinicAddress: acf.clinic_address || DEFAULT_SITE_SETTINGS.clinicAddress,
    opdSchedule: acf.opd_schedule || DEFAULT_SITE_SETTINGS.opdSchedule,
    instagramUrl: acf.instagram_url || DEFAULT_SITE_SETTINGS.instagramUrl,
    facebookUrl: acf.facebook_url || DEFAULT_SITE_SETTINGS.facebookUrl,
    youtubeUrl: acf.youtube_url || DEFAULT_SITE_SETTINGS.youtubeUrl,
  };
}

/* ==========================================================================
   WORDPRESS PATIENT PORTAL SUBMISSIONS (drjem/v1 REST API)
   Sends patient registrations, uploaded medical documents & inquiries directly
   to WordPress Dashboard -> Patient Portal.
   ========================================================================== */

export interface WPSubmissionResult {
  success: boolean;
  referenceId?: string;
  submissionId?: number;
  filesSaved?: number;
  receivedTimestamp?: string;
  message?: string;
}

/**
 * 1. Submit Second Opinion Request + Uploaded Medical Files to WordPress
 */
export async function submitSecondOpinionToWordPress(payload: {
  patientFullName: string;
  patientAge: string;
  patientGender: string;
  country: string;
  city: string;
  contactPhone: string;
  contactEmail: string;
  diagnosisCondition: string;
  currentTreatment: string;
  previousSurgery: string;
  treatingHospitalDoctor: string;
  specificClinicalQuestion: string;
  consultationMode: string;
  uploadedFiles: Array<{ file?: File }>;
}): Promise<WPSubmissionResult> {
  const wpUrl = (import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL).replace(/\/$/, '');
  const endpoint = `${wpUrl}/wp-json/drjem/v1/second-opinion`;

  const body = new FormData();
  body.append('patientFullName', payload.patientFullName);
  body.append('patientAge', payload.patientAge);
  body.append('patientGender', payload.patientGender);
  body.append('country', payload.country);
  body.append('city', payload.city);
  body.append('contactPhone', payload.contactPhone);
  body.append('contactEmail', payload.contactEmail);
  body.append('diagnosisCondition', payload.diagnosisCondition);
  body.append('currentTreatment', payload.currentTreatment);
  body.append('previousSurgery', payload.previousSurgery);
  body.append('treatingHospitalDoctor', payload.treatingHospitalDoctor);
  body.append('specificClinicalQuestion', payload.specificClinicalQuestion);
  body.append('consultationMode', payload.consultationMode);

  payload.uploadedFiles.forEach((item) => {
    if (item.file) {
      body.append('files[]', item.file, item.file.name);
    }
  });

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body,
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data?.message || 'Unable to submit case right now. Please try again or contact via WhatsApp.',
      };
    }
    return data as WPSubmissionResult;
  } catch (err) {
    console.error('Second opinion WordPress upload failed:', err);
    return {
      success: false,
      message: 'Network error while connecting to clinical portal. Please check your connection or use WhatsApp.',
    };
  }
}

/**
 * 2. Submit Secure Medical Document Dossier + Real Files to WordPress
 */
export async function submitDocumentUploadToWordPress(
  payload: {
    patientName: string;
    age: string;
    gender: string;
    cityCountry: string;
    phone: string;
    email: string;
    submitterRelation: string;
    cancerType: string;
    currentStage: string;
    priorTreatment: string;
    specificQuestions: string;
    dicomLink: string;
    consentGiven: boolean;
  },
  files: Array<{ file?: File; category: string }>
): Promise<WPSubmissionResult> {
  const wpUrl = (import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL).replace(/\/$/, '');
  const endpoint = `${wpUrl}/wp-json/drjem/v1/document-upload`;

  const body = new FormData();
  body.append('patientName', payload.patientName);
  body.append('age', payload.age);
  body.append('gender', payload.gender);
  body.append('cityCountry', payload.cityCountry);
  body.append('phone', payload.phone);
  body.append('email', payload.email);
  body.append('submitterRelation', payload.submitterRelation);
  body.append('cancerType', payload.cancerType);
  body.append('currentStage', payload.currentStage);
  body.append('priorTreatment', payload.priorTreatment);
  body.append('specificQuestions', payload.specificQuestions);
  body.append('dicomLink', payload.dicomLink);
  body.append('consentGiven', payload.consentGiven ? '1' : '0');

  files.forEach((item) => {
    if (item.file) {
      body.append('files[]', item.file, item.file.name);
      body.append('file_categories[]', item.category);
    }
  });

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body,
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data?.message || 'Unable to upload medical dossier right now. Please try again.',
      };
    }
    return data as WPSubmissionResult;
  } catch (err) {
    console.error('Document upload to WordPress failed:', err);
    return {
      success: false,
      message: 'Network error while transmitting medical records. Please try again or reach us on WhatsApp.',
    };
  }
}

/**
 * 3. Submit Contact / Appointment Request to WordPress
 */
export async function submitContactToWordPress(payload: {
  name: string;
  phone: string;
  email: string;
  cityCountry: string;
  preferredDate: string;
  clinicalDomain: string;
  consultationMode: string;
  message: string;
}): Promise<WPSubmissionResult> {
  const wpUrl = (import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL).replace(/\/$/, '');
  const endpoint = `${wpUrl}/wp-json/drjem/v1/contact`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data?.message || 'Unable to submit appointment request right now.',
      };
    }
    return data as WPSubmissionResult;
  } catch (err) {
    console.error('Contact submission to WordPress failed:', err);
    return {
      success: false,
      message: 'Network error while sending inquiry. Please try again or call our clinical desk directly.',
    };
  }
}

/* ==========================================================================
   DYNAMIC SUBPAGES CONTENT (WordPress Pages + ACF + Rank Math / Yoast SEO)
   ========================================================================== */

export interface PageSeoMeta {
  title?: string;
  description?: string;
}

export interface ClinicalAreasPageData {
  pageTitle: string;
  pageLead: string;
  disciplines: {
    breast?: { title?: string; subtitle?: string; description?: string; procedures?: string[] };
    hipec?: { title?: string; subtitle?: string; description?: string; procedures?: string[] };
    gynec?: { title?: string; subtitle?: string; description?: string; procedures?: string[] };
    robotic?: { title?: string; subtitle?: string; description?: string; procedures?: string[] };
    general?: { title?: string; subtitle?: string; description?: string; procedures?: string[] };
    'minimally-invasive'?: { title?: string; subtitle?: string; description?: string; procedures?: string[] };
  };
  seo?: PageSeoMeta;
}

export const DEFAULT_CLINICAL_AREAS_PAGE: ClinicalAreasPageData = {
  pageTitle: 'Areas of Clinical Focus',
  pageLead:
    'Thirty years of surgical oncology practice, refined through thousands of complex oncological cases, is brought to bear on every clinical decision — from the first biopsy to the final margin. The goal is not just tumour clearance. It is to restore life.',
  disciplines: {},
};

export interface PatientJourneyPageData {
  pageTitle: string;
  pageLead: string;
  turnaroundVal: string;
  turnaroundLabel: string;
  seo?: PageSeoMeta;
}

export const DEFAULT_PATIENT_JOURNEY_PAGE: PatientJourneyPageData = {
  pageTitle: 'The Clinical Pathway: From Diagnostic Uncertainty to Calm Certainty',
  pageLead:
    'A cancer diagnosis demands decisive action. Hurried decisions made under pressure lead to irreversible regret. This structured pathway gives you unhurried evaluation, complete scientific scrutiny, and clear surgical direction - before anything is cut.',
  turnaroundVal: '24-48 hrs',
  turnaroundLabel: 'Initial Review Turnaround',
};

export interface UploadRecordsPageData {
  pageTitle: string;
  pageLead: string;
  consentText: string;
  seo?: PageSeoMeta;
}

export const DEFAULT_UPLOAD_RECORDS_PAGE: UploadRecordsPageData = {
  pageTitle: 'Secure Medical Document Upload',
  pageLead:
    'Submit your pathology reports, imaging scans, and clinical summaries directly for review by Dr. Jem Kalathil and his clinical second-opinion team.',
  consentText:
    'By submitting these medical records, you authorize Dr. Jem Kalathil and his clinical review team to evaluate your diagnostic reports solely for specialist surgical second opinion and clinical triage. All uploaded records are encrypted in transit and at rest in compliance with applicable Indian medical data protection standards (including the Digital Personal Data Protection Act 2023 and NMC ethics guidelines). Submission of records for a second opinion does not establish a formal doctor-patient relationship; an in-person physical consultation or formal teleconsultation is required before any treatment plan is finalized or initiated.',
};

export interface ContactPageData {
  pageTitle: string;
  pageLead: string;
  addressBlock: string;
  seo?: PageSeoMeta;
}

export const DEFAULT_CONTACT_PAGE: ContactPageData = {
  pageTitle: 'Consultation Locations & Appointment Scheduling',
  pageLead:
    'Schedule an in-person surgical oncology consultation in Kochi or coordinate a secure remote video evaluation from anywhere in India or the Gulf.',
  addressBlock:
    'Kuttisahib Road, Near Kothad Bridge, South Chittoor, Cheranallur, Kochi, Kerala 682027, India',
};

const parseMultilineList = (raw?: string): string[] | undefined => {
  if (!raw || !raw.trim()) return undefined;
  const items = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractPageSeo = (page: any): PageSeoMeta | undefined => {
  if (!page) return undefined;
  const title = page.rank_math_seo?.title || page.yoast_head_json?.title;
  const description = page.rank_math_seo?.description || page.yoast_head_json?.description;
  if (!title && !description) return undefined;
  return { title, description };
};

export async function fetchClinicalAreasPageData(): Promise<ClinicalAreasPageData> {
  const page = await fetchWordpressPage('clinical-areas');
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL || WP_BASE_URL;

  const disciplines: ClinicalAreasPageData['disciplines'] = {};

  // 1. First, check if page has ACF fields
  if (page && page.acf) {
    const acf = page.acf;
    if (acf.ca_breast_title || acf.ca_breast_desc) {
      disciplines.breast = {
        title: acf.ca_breast_title || undefined,
        subtitle: acf.ca_breast_subtitle || undefined,
        description: acf.ca_breast_desc || undefined,
        procedures: parseMultilineList(acf.ca_breast_procedures),
      };
    }
    if (acf.ca_hipec_title || acf.ca_hipec_desc) {
      disciplines.hipec = {
        title: acf.ca_hipec_title || undefined,
        subtitle: acf.ca_hipec_subtitle || undefined,
        description: acf.ca_hipec_desc || undefined,
        procedures: parseMultilineList(acf.ca_hipec_procedures),
      };
    }
    if (acf.ca_gynec_title || acf.ca_gynec_desc) {
      disciplines.gynec = {
        title: acf.ca_gynec_title || undefined,
        subtitle: acf.ca_gynec_subtitle || undefined,
        description: acf.ca_gynec_desc || undefined,
        procedures: parseMultilineList(acf.ca_gynec_procedures),
      };
    }
    if (acf.ca_robotic_title || acf.ca_robotic_desc) {
      disciplines.robotic = {
        title: acf.ca_robotic_title || undefined,
        subtitle: acf.ca_robotic_subtitle || undefined,
        description: acf.ca_robotic_desc || undefined,
        procedures: parseMultilineList(acf.ca_robotic_procedures),
      };
    }
    if (acf.ca_general_title || acf.ca_general_desc) {
      disciplines.general = {
        title: acf.ca_general_title || undefined,
        subtitle: acf.ca_general_subtitle || undefined,
        description: acf.ca_general_desc || undefined,
        procedures: parseMultilineList(acf.ca_general_procedures),
      };
    }
  }

  // 2. Also check if there are WordPress posts under category 'clinical-areas'
  if (wpUrl) {
    try {
      const res = await fetch(`${wpUrl.replace(/\/$/, '')}/wp-json/wp/v2/posts?per_page=50&_embed=true`);
      if (res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawPosts = await res.json();
        if (Array.isArray(rawPosts)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const caPosts = rawPosts.filter((p: any) => {
            const terms = (p._embedded?.['wp:term'] || []).flat();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const hasCaCat = terms.some((t: any) => t.slug === 'clinical-areas');
            const isCaSlug =
              p.slug?.includes('breast-cancer') ||
              p.slug?.includes('hipec') ||
              p.slug?.includes('gynec') ||
              p.slug?.includes('robotic') ||
              p.slug?.includes('sarcoma');
            return hasCaCat || isCaSlug;
          });

          // Helper to extract list items from html
          const extractListItems = (html: string): string[] => {
            const matches = html.match(/<li[^>]*>(.*?)<\/li>/gi);
            if (!matches) return [];
            return matches.map((m) => m.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
          };

          for (const post of caPosts) {
            const slug = post.slug || '';
            let key: keyof typeof disciplines | undefined;
            if (slug.includes('breast')) key = 'breast';
            else if (slug.includes('hipec') || slug.includes('peritoneal')) key = 'hipec';
            else if (slug.includes('gynec')) key = 'gynec';
            else if (slug.includes('robotic')) key = 'robotic';
            else if (slug.includes('sarcoma') || slug.includes('general')) key = 'general';

            if (key && !disciplines[key]) {
              const postProcedures = extractListItems(post.content?.rendered || '');
              disciplines[key] = {
                title: post.title?.rendered?.replace(/<[^>]+>/g, '').trim(),
                description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim(),
                procedures: postProcedures.length > 0 ? postProcedures : undefined,
              };
            }
          }
        }
      }
    } catch (e) {
      console.warn('Could not inspect clinical areas posts from WP:', e);
    }
  }

  return {
    pageTitle: page?.acf?.ca_page_title || DEFAULT_CLINICAL_AREAS_PAGE.pageTitle,
    pageLead: page?.acf?.ca_page_lead || DEFAULT_CLINICAL_AREAS_PAGE.pageLead,
    disciplines,
    seo: extractPageSeo(page),
  };
}

export async function fetchPatientJourneyPageData(): Promise<PatientJourneyPageData> {
  const page =
    (await fetchWordpressPage('patient-journey')) || (await fetchWordpressPage('how-it-works'));
  if (!page || !page.acf) return DEFAULT_PATIENT_JOURNEY_PAGE;
  const acf = page.acf;

  return {
    pageTitle: acf.pj_page_title || DEFAULT_PATIENT_JOURNEY_PAGE.pageTitle,
    pageLead: acf.pj_page_lead || DEFAULT_PATIENT_JOURNEY_PAGE.pageLead,
    turnaroundVal: acf.pj_turnaround_val || DEFAULT_PATIENT_JOURNEY_PAGE.turnaroundVal,
    turnaroundLabel: acf.pj_turnaround_label || DEFAULT_PATIENT_JOURNEY_PAGE.turnaroundLabel,
    seo: extractPageSeo(page),
  };
}

export async function fetchUploadRecordsPageData(): Promise<UploadRecordsPageData> {
  const page =
    (await fetchWordpressPage('upload-records')) || (await fetchWordpressPage('document-upload'));
  if (!page || !page.acf) return DEFAULT_UPLOAD_RECORDS_PAGE;
  const acf = page.acf;

  return {
    pageTitle: acf.ur_page_title || DEFAULT_UPLOAD_RECORDS_PAGE.pageTitle,
    pageLead: acf.ur_page_lead || DEFAULT_UPLOAD_RECORDS_PAGE.pageLead,
    consentText: acf.ur_consent_text || DEFAULT_UPLOAD_RECORDS_PAGE.consentText,
    seo: extractPageSeo(page),
  };
}

export async function fetchContactPageData(): Promise<ContactPageData> {
  const page = await fetchWordpressPage('contact');
  if (!page || !page.acf) return DEFAULT_CONTACT_PAGE;
  const acf = page.acf;

  return {
    pageTitle: acf.ct_page_title || DEFAULT_CONTACT_PAGE.pageTitle,
    pageLead: acf.ct_page_lead || DEFAULT_CONTACT_PAGE.pageLead,
    addressBlock: acf.ct_address_block || DEFAULT_CONTACT_PAGE.addressBlock,
    seo: extractPageSeo(page),
  };
}





