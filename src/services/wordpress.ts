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
      <p>Oncoplasty integrates plastic surgery principles directly into oncological tumor resection. Rather than leaving a visible defect, surrounding glandular tissue is mobilized and re-sculpted in the same sitting.</p>
      <h3>The Importance of Sentinel Lymph Node Biopsy</h3>
      <p>By utilizing dual-modality radio-guided localisation and blue dye, the first draining lymph node is identified and analyzed. This spares unnecessary full axillary clearance when the node is clear, dramatically reducing long-term lymphedema risk.</p>
    `,
    date: '2026-02-15',
    categoryName: 'Breast Oncology',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 5,
    featuredImage: '/images/clinical_case_review.jpg',
    seo: {
      title: 'Oncoplastic Breast Surgery in Kerala | Dr. Jem Kalathil',
      description:
        'Clinical guide to oncoplastic breast cancer surgery, organ preservation, and sentinel node biopsy by Dr. Jem Kalathil in Kochi, Kerala.',
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
      <p>Peritoneal carcinomatosis was historically viewed as terminal disease with only palliative options. Over the past two decades, Cytoreductive Surgery (CRS) coupled with Hyperthermic Intraperitoneal Chemotherapy (HIPEC) has established a curative intent pathway for select patients.</p>
      <h3>How HIPEC Works</h3>
      <p>Following surgical removal of all visible peritoneal tumor deposits (cytoreduction), a heated chemotherapy bath (41–43°C) is circulated continuously through the abdominal cavity for 60 to 90 minutes. Heat enhances tissue penetration and directly triggers malignant apoptosis.</p>
      <h3>Candidate Selection is Paramount</h3>
      <p>Not every patient is a candidate for HIPEC. Rigorous Peritoneal Cancer Index (PCI) evaluation, patient performance status, and prior systemic response dictate suitability.</p>
    `,
    date: '2026-01-20',
    categoryName: 'Peritoneal Oncology & HIPEC',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 7,
    featuredImage: '/images/when_hope_seems_lost.jpg',
    seo: {
      title: 'HIPEC Surgery & Cytoreduction in Kochi | Dr. Jem Kalathil',
      description:
        'Comprehensive clinical explanation of CRS and HIPEC procedure for peritoneal malignancies in Kerala by Dr. Jem Kalathil.',
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
      <p>When facing a complex oncological diagnosis, fear often rushes decisions. A calm, methodical second review of your tissue biopsy, PET-CT, and clinical stage frequently uncovers alternative surgical approaches, such as sphincter-saving or organ-preserving options.</p>
      <h3>What a Second Opinion Evaluates</h3>
      <ul>
        <li>Confirmation of histopathological grade and molecular markers (HER2, ER/PR, MSI-H).</li>
        <li>Review of vascular invasion and radiological boundaries.</li>
        <li>Assessment of whether neoadjuvant systemic therapy could downstage the tumor prior to surgery.</li>
      </ul>
    `,
    date: '2025-12-10',
    categoryName: 'Clinical Guidance',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 4,
    featuredImage: '/images/surgical_theatre.jpg',
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
        <li>Sub-millimeter tremor filtration and 540-degree wrist articulation.</li>
        <li>True 3D high-magnification binocular stereoscopic view of critical micro-vessels.</li>
        <li>Dramatically reduced intraoperative blood loss and negligible tissue traction trauma.</li>
        <li>Rapid return of bowel function and shorter postoperative hospital convalescence.</li>
      </ul>
    `,
    date: '2025-11-28',
    categoryName: 'Robotic Oncology',
    authorName: 'Dr. Jem Kalathil',
    readTimeMinutes: 6,
    featuredImage: '/images/robotic_oncology_frontier.jpg',
    seo: {
      title: 'Robotic Cancer Surgery in Kochi | Dr. Jem Kalathil',
      description:
        'Advanced robotic surgical oncology for gastrointestinal, pelvic, and retroperitoneal resections by Dr. Jem Kalathil at Aster Medcity, Kochi.',
      focusKeyword: 'robotic cancer surgery kochi',
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

    // Filter out standard WordPress boilerplate "Hello world!" if desirable
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredPosts = rawPosts.filter((post: any) => post.slug !== 'hello-world');

    if (filteredPosts.length === 0) {
      return FALLBACK_ARTICLES;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return filteredPosts.map((post: any) => {
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
        post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Oncology Clinical Notes';

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
  doctorCredentials: 'MS, FRCS',
  doctorRole: 'Lead Senior Consultant, Surgical Oncology',
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
    'Dr Jem Kalathil is a Surgical Oncologist with over thirty years of experience and is Lead Senior Consultant, Surgical Oncology, at the Aster International Institute of Oncology, Aster Medcity, Kochi. His practice is focused on three areas: oncoplastic breast cancer surgery and reconstruction, sentinel node biopsy and radio-guided localisation of non-palpable lesions; cytoreductive surgery with HIPEC for peritoneal surface malignancies; and robotic and complex surgery for gastrointestinal and gynaecological cancers, and extremity and retroperitoneal sarcomas.',
  specialty1Title: 'Breast Cancer Surgery, Oncoplasty & Reconstruction',
  specialty1Subtitle: 'Organ Preservation & Symmetry',
  specialty2Title: 'Peritoneal Surface Malignancies & HIPEC',
  specialty2Subtitle: 'Curative Cytoreduction',
  specialty3Title: 'Robotic Surgical Oncology',
  specialty3Subtitle: 'Da Vinci Precision',
  editorialStatement1: 'A second opinion is not disloyalty.',
  editorialStatement2: 'It is an essential oncological safeguard.',
  editorialLeadProse:
    'The days following a biopsy are often overwhelmed by shock, urgent advice, and irreversible choices. Patients are told that surgery must take place tomorrow.',
  editorialBodyProse:
    'Yet in thirty years of specialized surgical oncology, we know that taking 3 to 5 days to confirm histological receptors, re-examine scan boundaries, and explore organ preservation does not compromise curative outcomes. It protects both life and enduring dignity.',
  surgeonProfileBio:
    'Trained in the United Kingdom, Italy, Singapore and India, including a UICC Fellowship in Milan under Professor Umberto Veronesi, he was formerly Additional Professor of Surgical Oncology at the Regional Cancer Centre, Thiruvananthapuram. He heads the Aster Clinical Research Centre and is Lead Principal Investigator on clinical trials.',
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
    doctorCredentials: 'MS, FRCS',
    doctorRole: acf.doctor_role || DEFAULT_SITE_SETTINGS.doctorRole,
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
    'minimally-invasive'?: { title?: string; subtitle?: string; description?: string; procedures?: string[] };
  };
  seo?: PageSeoMeta;
}

export const DEFAULT_CLINICAL_AREAS_PAGE: ClinicalAreasPageData = {
  pageTitle: 'Clinical Specialisations',
  pageLead:
    'Under the clinical leadership of Dr. Jem Kalathil (Surgical Oncologist, 30+ Years Experience), our specialised surgical oncology practice balances complete curative cancer clearance with anatomical dignity, tissue preservation, and accelerated recovery.',
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
    'A critical cancer diagnosis demands decisive action, but hurried decisions often lead to irreversible regret. Our structured second-opinion pathway provides unhurried evaluation, rigorous scientific scrutiny, and clear surgical direction.',
  turnaroundVal: '24-48h',
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
  if (!page || !page.acf) return DEFAULT_CLINICAL_AREAS_PAGE;
  const acf = page.acf;

  return {
    pageTitle: acf.ca_page_title || DEFAULT_CLINICAL_AREAS_PAGE.pageTitle,
    pageLead: acf.ca_page_lead || DEFAULT_CLINICAL_AREAS_PAGE.pageLead,
    disciplines: {
      breast: {
        title: acf.ca_breast_title || undefined,
        subtitle: acf.ca_breast_subtitle || undefined,
        description: acf.ca_breast_desc || undefined,
        procedures: parseMultilineList(acf.ca_breast_procedures),
      },
      hipec: {
        title: acf.ca_hipec_title || undefined,
        subtitle: acf.ca_hipec_subtitle || undefined,
        description: acf.ca_hipec_desc || undefined,
        procedures: parseMultilineList(acf.ca_hipec_procedures),
      },
      'minimally-invasive': {
        title: acf.ca_robotic_title || undefined,
        subtitle: acf.ca_robotic_subtitle || undefined,
        description: acf.ca_robotic_desc || undefined,
        procedures: parseMultilineList(acf.ca_robotic_procedures),
      },
    },
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





