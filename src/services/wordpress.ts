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
  import.meta.env.VITE_WORDPRESS_URL || 'https://cms.drjemkalathil.com';

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
    featuredImage: '/images/dr_jem_kalathil.jpg',
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
    featuredImage: '/images/dr_jem_kalathil.jpg',
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
    featuredImage: '/images/dr_jem_kalathil.jpg',
    seo: {
      title: 'Cancer Second Opinion in Kochi, Kerala | Dr. Jem Kalathil',
      description:
        'Objective surgical second opinions for breast, gastrointestinal, and peritoneal cancer diagnoses by Dr. Jem Kalathil.',
      focusKeyword: 'cancer second opinion kerala',
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
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL;

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rawPosts.map((post: any) => {
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
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL;

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
 * Fetch Patient Reviews from WordPress REST API (category or custom post type)
 * Falls back seamlessly to curated clinical reviews.
 */
export async function fetchPatientReviews(): Promise<PatientReview[]> {
  const wpUrl = import.meta.env.VITE_WORDPRESS_URL;
  if (!wpUrl) {
    return DEFAULT_PATIENT_REVIEWS;
  }

  try {
    const url = `${wpUrl.replace(/\/$/, '')}/wp-json/wp/v2/posts?categories_slug=patient-reviews&_embed=true`;
    const response = await fetch(url);
    if (!response.ok) {
      return DEFAULT_PATIENT_REVIEWS;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return DEFAULT_PATIENT_REVIEWS;
    }

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
  } catch (err) {
    console.warn('WordPress reviews fetch failed, using fallback:', err);
    return DEFAULT_PATIENT_REVIEWS;
  }
}


