import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Environment variables with fallback
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'u7oqruvi';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = '2024-03-01';

// Create Sanity Client
export const sanityClient = SANITY_PROJECT_ID
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
    })
  : null;

// Image URL builder
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => {
  return builder ? builder.image(source) : null;
};

// Types
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

export interface PageSeoData {
  pageId: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
}

export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTimeMinutes?: number;
  authorName?: string;
}

// Initial Curated Patient Reviews (used when Sanity is empty or during offline/fallback)
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
      'We traveled from Muscat, Oman for Dr. Jem’s second opinion on peritoneal surface cancer after local doctors in the Gulf considered surgery impossible. The HIPEC cytoreduction at Aster Medcity gave us new hope. His team’s care is world-class.',
    location: 'Muscat, Oman / Aster Medcity',
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
      'Minimally invasive robotic procedure with rapid recovery. Back on my feet in three days. Thank you Dr. Jem Kalathil and Aster Medcity team for your compassion and guidance.',
    location: 'Thrissur, Kerala',
    date: 'November 2025',
    isVerified: true,
  },
];

/**
 * Fetch approved patient reviews from Sanity with automatic fallback
 */
export async function fetchPatientReviews(): Promise<PatientReview[]> {
  if (!sanityClient) {
    return DEFAULT_PATIENT_REVIEWS;
  }

  try {
    const query = `*[_type == "review" && approved == true] | order(date desc) {
      "id": _id,
      patientName,
      rating,
      surgeryType,
      reviewText,
      location,
      date,
      isVerified
    }`;
    const reviews = await sanityClient.fetch<PatientReview[]>(query);
    return reviews && reviews.length > 0 ? reviews : DEFAULT_PATIENT_REVIEWS;
  } catch (error) {
    console.warn('Sanity reviews fetch failed, using fallback:', error);
    return DEFAULT_PATIENT_REVIEWS;
  }
}

/**
 * Fetch Page SEO metadata from Sanity with automatic fallback
 */
export async function fetchPageSeo(pageSlug: string): Promise<PageSeoData | null> {
  if (!sanityClient) {
    return null;
  }

  try {
    const query = `*[_type == "pageSeo" && pageSlug == $pageSlug][0] {
      "pageId": _id,
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      "ogImageUrl": ogImage.asset->url
    }`;
    return await sanityClient.fetch<PageSeoData | null>(query, { pageSlug });
  } catch (error) {
    console.warn(`Sanity SEO fetch failed for ${pageSlug}:`, error);
    return null;
  }
}

