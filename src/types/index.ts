export type DiagnosisCategory =
  | 'breast-oncology'
  | 'peritoneal-hipec'
  | 'sarcoma-soft-tissue'
  | 'gastrointestinal-hpb'
  | 'gynecologic-oncology'
  | 'other-complex-malignancy';

export type ConsultationMode = 'in-person-kochi' | 'secure-tele-review';

export interface ClinicalPillarData {
  id: string;
  order: string;
  kicker: string;
  title: string;
  shortSummary: string;
  clinicalNarrative: string;
  surgicalInnovations: string[];
  patientSuitability: string;
  primaryGoal: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface ProcessStepData {
  stepNumber: string;
  title: string;
  timeline: string;
  summary: string;
  patientAction: string;
  clinicalOutput: string;
}

export interface PreparationChecklistItem {
  id: string;
  category: string;
  label: string;
  description: string;
  vitalComponents: string[];
  whyItMatters: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  clinicalContext?: string;
}

export type SupportedLanguage = 'en' | 'ml' | 'ar';

export interface SecondOpinionFormData {
  // Step 1: Your Details
  patientFullName: string;
  patientAge: string;
  patientGender: 'female' | 'male' | 'other' | '';
  country: string;
  city: string;
  contactPhone: string;
  contactEmail: string;

  // Step 2: About Your Case
  diagnosisCondition: string;
  currentTreatment: string;
  previousSurgery: string;
  treatingHospitalDoctor: string;
  specificClinicalQuestion: string; // "What would you like Dr. Jem Kalathil / the team to review or clarify?"
  consultationMode: ConsultationMode;
  uploadedFiles: FileRecord[];

  // Legacy compatibility
  companionName?: string;
  companionRelation?: string;
  locationCityCountry?: string;
  diagnosisCategory?: DiagnosisCategory | '';
  diagnosisDate?: string;
  currentTreatmentsReceived?: string;
}

export interface FileRecord {
  id: string;
  name: string;
  sizeBytes: number;
  type: string;
}

export interface SubmissionResponse {
  referenceId: string;
  patientName: string;
  receivedTimestamp: string;
  estimatedReviewTurnaround: string;
  consultationMode: ConsultationMode;
  patientEmail: string;
  patientPhone: string;
}

