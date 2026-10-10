import type { ClinicalPillarData, ProcessStepData, PreparationChecklistItem, FaqItem } from '../types';

export const CLINICAL_DOCTOR_INFO = {
  name: 'Dr. Jem Kalathil',
  credentials: 'MBBS, MS (General Surgery), FRCS (Edinburgh)',
  role: 'Senior Consultant & Head of Department of Surgical Oncology',
  hospital: 'Aster Medcity, Kochi',
  location: 'Cheranallur, Kochi, Kerala 682027, India',
  experienceYears: '25+',
  fellowships: [
    'Fellow of the Royal College of Surgeons (FRCS), Edinburgh',
    'Former Senior Consultant, Breast Unit, Royal Hospital, Muscat, Oman',
    'Former Professor of Surgical Oncology, Regional Cancer Centre (RCC), Thiruvananthapuram',
    'Advanced Surgical Oncology Training & Observerships in United Kingdom & Italy',
  ],
  secretaryPhone: '+91 484 669 9999',
  clinicalDeskPhone: '+91 949 771 2345',
  whatsappCoordinator: '+91 949 771 2345',
  email: 'surgical.oncology@asterhospital.com',
  opdSchedule: 'Monday – Saturday, 09:00 AM – 04:00 PM IST',
  teleConsultationHours: 'Dedicated Tele-Oncology for Regional & Overseas Patients',
};

export const WHATSAPP_COORDINATOR_NUMBER =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_COORDINATOR_NUMBER) ||
  '+91 949 771 2345';


export const SIMPLE_HOW_IT_WORKS = [
  {
    number: '01',
    title: 'SHARE YOUR CASE',
    description: 'Tell us about your diagnosis and what you would like to understand.',
  },
  {
    number: '02',
    title: 'UPLOAD YOUR RECORDS',
    description: 'Send your reports, scans, prescriptions and relevant medical documents.',
  },
  {
    number: '03',
    title: 'RECEIVE A RESPONSE',
    description: 'Our team reviews the submitted information and responds within 48 hours.',
  },
];

export const SIMPLE_CLINICAL_AREAS = [
  {
    number: '01',
    title: 'WHEN HOPE SEEMS LOST',
    domainId: 'peritoneal-hipec',
    specialties: ['Peritoneal Surface Malignancies', 'HIPEC', 'Cytoreductive Surgery'],
    description: 'For patients who have been told that surgical options may be limited or exhausted.',
    imageSrc: '/images/surgical_theatre.jpg',
    imageAlt: 'Surgical theatre for cytoreductive peritonectomy and heated intraperitoneal chemotherapy',
  },
  {
    number: '02',
    title: 'PRECISION THAT PROTECTS YOU',
    domainId: 'breast-oncology',
    specialties: ['Oncoplastic Breast Surgery', 'Sentinel Node Biopsy', 'Radio-Guided Surgery', 'Breast Reconstruction'],
    description: 'Surgical precision that preserves tissue, aesthetics, and long-term peace of mind.',
    imageSrc: '/images/clinical_case_review.jpg',
    imageAlt: 'Oncoplastic breast surgery margin planning and diagnostic review',
  },
  {
    number: '03',
    title: 'SURGERY AT THE FRONTIER',
    domainId: 'sarcoma-soft-tissue',
    specialties: ['Robotic Oncology', 'Minimally Invasive Cancer Surgery', 'Complex Resection'],
    description: 'Advanced robotic instrumentation for deep anatomical access with minimal trauma.',
    imageSrc: '/images/robotic_oncology_frontier.jpg',
    imageAlt: 'Robotic oncology surgical suite performing complex resection',
  },
];


export interface EditorialChapterData {
  id: string;
  number: string;
  title: string;
  kicker: string;
  leadStatement: string;
  narrative: string;
  topics: string[];
  clinicalFocus: string;
  imageSrc: string;
  imageAlt: string;
  domainId: string;
  specNotes: { label: string; value: string }[];
}

export const EDITORIAL_CHAPTERS: EditorialChapterData[] = [
  {
    id: 'chapter-hope-lost',
    number: '01',
    title: 'WHEN HOPE SEEMS LOST',
    kicker: 'PERITONEAL SURFACE MALIGNANCIES · HIPEC · CYTOREDUCTION',
    leadStatement: 'For patients who have been told that surgical options may be exhausted.',
    narrative:
      'Peritoneal carcinomatosis from colorectal, ovarian, appendiceal, or pseudomyxoma origins was historically deemed inoperable. Through radical Sugarbaker cytoreductive peritonectomy paired with heated Hyperthermic Intraperitoneal Chemotherapy (HIPEC) at 41.5°C–42.5°C, microscopic disease is systematically cleared—turning terminal prognoses into durable, long-term survival.',
    topics: [
      'Sugarbaker Peritoneal Cancer Index (PCI) Scoring',
      'Complete Multi-Compartment Peritonectomy (CC-0 / CC-1)',
      'Heated Intraperitoneal Perfusion (HIPEC, 42°C for 60–90 min)',
      'Pseudomyxoma Peritonei & Ovarian Surface Malignancies',
    ],
    clinicalFocus: 'Curative Cytoreduction & Organ Clearance',
    imageSrc: '/images/surgical_theatre.jpg',
    imageAlt: 'Surgical theatre prepared for extensive cytoreductive peritonectomy and heated intraperitoneal chemotherapy',
    domainId: 'peritoneal-hipec',
    specNotes: [
      { label: 'Perfusion Temp', value: '41.5°C – 42.5°C' },
      { label: 'Target Clearance', value: 'CC-0 Microscopic Completeness' },
      { label: 'Surgical Setting', value: 'Quaternary Dedicated Perfusion Theatre' },
    ],
  },
  {
    id: 'chapter-precision-protects',
    number: '02',
    title: 'PRECISION THAT PROTECTS YOU',
    kicker: 'ONCOPLASTIC BREAST SURGERY · MARGIN INTEGRITY · TISSUE PRESERVATION',
    leadStatement: 'We refuse to accept that cancer cure must require permanent physical disfigurement.',
    narrative:
      'A breast cancer diagnosis historically forced a cruel compromise between oncological safety and total loss of the breast. Oncoplastic surgery merges radical cancer clearance with aesthetic plastic reconstruction. By utilizing local glandular flaps, therapeutic mammoplasty, and dual-tracer sentinel lymph node biopsies, we achieve pristine negative margins while preserving natural breast contour and symmetry.',
    topics: [
      'Level I & Level II Oncoplastic Volume Displacement',
      'Dual-Tracer Sentinel Lymph Node Biopsy (SLNB to prevent lymphedema)',
      'Skin-Sparing & Nipple-Areola-Sparing Mastectomy',
      'Immediate Autologous & Implant-Based Breast Reconstruction',
    ],
    clinicalFocus: 'Complete Clear Margins with Enduring Anatomical Dignity',
    imageSrc: '/images/clinical_case_review.jpg',
    imageAlt: 'Histopathological margin analysis and targeted cross-sectional breast surgical planning',
    domainId: 'breast-oncology',
    specNotes: [
      { label: 'Margin Standard', value: 'R0 Microscopic Negative Margin' },
      { label: 'Axillary Strategy', value: 'Sentinel Node Sparing' },
      { label: 'Reconstruction', value: 'Immediate Dual-Plane Autologous / Implant' },
    ],
  },
  {
    id: 'chapter-frontier-surgery',
    number: '03',
    title: 'SURGERY AT THE FRONTIER',
    kicker: 'ROBOTIC ONCOLOGY · COMPLEX RETROPERITONEAL SARCOMAS · MINIMALLY INVASIVE',
    leadStatement: 'Navigating within millimeters of vital vascular structures with robotic dexterity.',
    narrative:
      'In high-complexity retroperitoneal sarcomas and pelvic malignancies, incomplete surgery drastically increases local recurrence. Utilizing the daVinci robotic surgical console and high-definition 3D magnification, Dr. Kalathil executes compartmental resections with uncompromised anatomical margins—mobilizing major vessels, avoiding unnecessary amputations, and accelerating recovery.',
    topics: [
      'daVinci Robotic-Assisted Deep Pelvic & Abdominal Oncology',
      'Compartmental Limb-Sparing Resections for Soft Tissue Sarcomas',
      'Major Retroperitoneal Vascular Mobilization (IVC & Iliac clearing)',
      'Sphincter-Preserving Low Rectal & Upper GI Excision',
    ],
    clinicalFocus: 'Minimal Physiological Trauma with Maximum Oncological Radicular Clearance',
    imageSrc: '/images/robotic_oncology_frontier.jpg',
    imageAlt: 'daVinci robotic oncology console suite performing high-precision cancer resection',
    domainId: 'sarcoma-soft-tissue',
    specNotes: [
      { label: 'Visualization', value: '3D High-Definition 10x Optical Zoom' },
      { label: 'Wrist Articulation', value: '540° Degrees of Motion Beyond Human Hand' },
      { label: 'Surgical Goal', value: 'Sphincter & Limb Function Preservation' },
    ],
  },
];

// Preserved for modal domain selector mapping
export const CLINICAL_PILLARS: ClinicalPillarData[] = [
  {
    id: 'breast-oncology',
    order: '01',
    kicker: 'ONCOPLASTIC & RECONSTRUCTIVE BREAST SURGERY',
    title: 'Balancing Complete Oncological Margins with Tissue Preservation',
    shortSummary:
      'Advancing breast conservation through oncoplastic techniques that avoid mastectomy where clinically feasible, without compromising disease clearance.',
    clinicalNarrative:
      'A breast cancer diagnosis historically forced an uncompromising choice between clear margins and severe physical disfigurement. Oncoplastic surgery integrates plastic surgical principles into cancer resections. By mobilizing local glandular flaps, performing therapeutic mammaplasties, and utilizing sentinel lymph node biopsy, we achieve clear microscopic margins while preserving the natural contour and symmetry of the breast.',
    surgicalInnovations: [
      'Level I & Level II oncoplastic volume displacement and replacement',
      'Dual-tracer Sentinel Lymph Node Biopsy (SLNB) to spare full axillary dissection and prevent chronic lymphedema',
      'Skin-sparing and nipple-areola-sparing mastectomies with immediate autologous or implant-based reconstruction when conservation is not safe',
      'Pre-operative neo-adjuvant downstaging evaluation in collaboration with medical oncology',
    ],
    patientSuitability:
      'Appropriate for early and locally advanced breast cancer (invasive ductal/lobular, DCIS), patients previously advised total mastectomy who wish to explore conservative alternatives, and cases requiring secondary symmetry correction.',
    primaryGoal:
      'Curative oncological clearance with enduring anatomical integrity and psychological well-being.',
    imageSrc: '/images/clinical_case_review.jpg',
    imageAlt: 'Detailed case analysis of breast imaging and histopathological margins',
  },
  {
    id: 'peritoneal-hipec',
    order: '02',
    kicker: 'CYTOREDUCTIVE SURGERY & HIPEC',
    title: 'Aggressive Peritoneal Surface Oncology for Advanced Malignancy',
    shortSummary:
      'One of the few high-volume centers in South Asia performing complete cytoreduction combined with 42°C Hyperthermic Intraperitoneal Chemotherapy.',
    clinicalNarrative:
      'Peritoneal carcinomatosis was once categorized universally as an end-stage, inoperable state. For carefully selected patients, Cytoreductive Surgery (CRS) systematically strips all visible microscopic and macroscopic tumor implants from the peritoneal linings and involved organs. This is followed immediately by HIPEC—circulating heated chemotherapy (41.5°C–42.5°C) directly through the abdominal cavity for 60 to 90 minutes while the patient remains under anesthesia.',
    surgicalInnovations: [
      'Comprehensive Sugarbaker Peritoneal Cancer Index (PCI) scoring and pre-operative radiological staging',
      'Multi-compartment peritonectomy: diaphragmatic stripping, omentectomy, pelvic peritonectomy, and selective visceral resections',
      'Precision closed-abdomen or Coliseum open-bath HIPEC perfusion utilizing dedicated hyperthermic pump technology',
      'Standardized intensive care resuscitation protocols to manage fluid shifts and surgical metabolic demands',
    ],
    patientSuitability:
      'Patients with pseudomyxoma peritonei, appendiceal adenocarcinomas, recurrent or advanced epithelial ovarian cancers, and strictly localized colorectal peritoneal metastases with low to moderate PCI scores.',
    primaryGoal:
      'Achieving CC-0/CC-1 complete cytoreduction to transform previously terminal diagnoses into durable long-term disease control.',
    imageSrc: '/images/surgical_theatre.jpg',
    imageAlt: 'High-precision surgical theater prepared for extensive cytoreductive peritonectomy',
  },
  {
    id: 'sarcoma-soft-tissue',
    order: '03',
    kicker: 'RETROPERITONEAL & EXTREMITY SARCOMAS',
    title: 'Compartmental Resection and Limb-Sparing Precision',
    shortSummary:
      'Navigating complex anatomical retroperitoneal spaces and extremities to extirpate rare connective tissue tumors while maintaining limb function.',
    clinicalNarrative:
      'Sarcomas are rare, heterogeneous, and clinically unforgiving. Dr. Kalathil approaches soft tissue and retroperitoneal sarcomas with strict adherence to compartmental resection margins—removing the tumor along with the enveloping muscular or fascial barrier.',
    surgicalInnovations: [
      'Limb-preservation surgery utilizing advanced soft-tissue reconstruction rather than historic amputations',
      'High-complexity retroperitoneal compartment clearing with major vessel mobilization (vena cava, iliac vessels)',
      'Pre-operative radiation therapy sequencing designed within dedicated multidisciplinary sarcoma tumor boards',
      'Intra-operative frozen section margin control for critical fascial boundaries',
    ],
    patientSuitability:
      'Primary or recurrent retroperitoneal sarcomas, trunk and limb soft tissue sarcomas, and gastrointestinal stromal tumors (GIST).',
    primaryGoal:
      'Negative microscopic margins (R0 resection) with maximum functional limb and neurological preservation.',
    imageSrc: '/images/dr_jem_kalathil.jpg',
    imageAlt: 'Dr. Jem Kalathil reviewing cross-sectional magnetic resonance scans for complex sarcoma resection',
  },
  {
    id: 'gastrointestinal-hpb',
    order: '04',
    kicker: 'COMPLEX GASTROINTESTINAL & HEPATOBILIARY SURGERY',
    title: 'Curative Resections for Upper and Lower GI Tract Malignancies',
    shortSummary:
      'Radical lymphadenectomy, sphincter-sparing rectal resections, and comprehensive oncological clearing for complex digestive tract cancers.',
    clinicalNarrative:
      'Effective GI oncological surgery is anchored in meticulous lymph node dissection and total mesorectal or mesogastric excision.',
    surgicalInnovations: [
      'Total Mesorectal Excision (TME) and ultra-low sphincter-saving anterior resections',
      'D2 gastrectomy with anatomical lymph node station clearance',
      'Minimally invasive laparoscopic and robotic-assisted abdominal dissections',
      'Pelvic exenterations for locally recurrent pelvic malignancies with multi-specialty reconstruction',
    ],
    patientSuitability:
      'Patients with gastric carcinoma, colorectal malignancies, and locally advanced pelvic masses.',
    primaryGoal:
      'Total oncological margin clearance coupled with sphincter and functional gastrointestinal continuity.',
    imageSrc: '/images/aster_medcity_campus.jpg',
    imageAlt: 'Aster Medcity medical campus setting overlooking Kerala backwaters',
  },
];

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    stepNumber: '01',
    title: 'UNDERSTAND YOUR STORY',
    timeline: 'Within 24 Hours of Submission',
    summary:
      'We begin by listening. Every patient arrives with a unique diagnostic timeline, specific physical symptoms, previous medical advice, and personal priorities regarding organ preservation.',
    patientAction: 'Submit clinical summaries, pathology reports, and recent scan links via our portal or coordinator.',
    clinicalOutput: 'Initial clinical triage by coordinator to confirm all necessary staging parameters are in hand.',
  },
  {
    stepNumber: '02',
    title: 'REVIEW YOUR RECORDS',
    timeline: 'Within 24 to 48 Hours',
    summary:
      'Dr. Kalathil independently scrutinizes your original histopathology slides, receptor immunohistochemistry (ER/PR/HER2/MSI), and cross-sectional DICOM imaging (CT/PET-CT/MRI).',
    patientAction: 'No immediate action required while our team verifies tumor resectability and anatomical margins.',
    clinicalOutput: 'Independent verification of cancer stage, resectability status, and surgical vs. systemic sequencing.',
  },
  {
    stepNumber: '03',
    title: 'CLARIFY THE CLINICAL PICTURE',
    timeline: 'Scheduled at Your Convenience',
    summary:
      'A dedicated 45-minute clinical dialogue—conducted in person at Aster Medcity or via secure tele-oncology. Scans are displayed millimeter by millimeter, demystifying surgical options.',
    patientAction: 'Attend with trusted family members. Ask every unaddressed question regarding alternatives, margins, and recovery.',
    clinicalOutput: 'Transparent, unhurried discussion of conservative options, radical resections, recovery timelines, and risks.',
  },
  {
    stepNumber: '04',
    title: 'DISCUSS THE NEXT STEP',
    timeline: 'Delivered Immediately Following Review',
    summary:
      'You receive a structured, written surgical blueprint detailing the recommended approach, rationale, and sequencing to share with your family and local oncological team.',
    patientAction: 'Use the written blueprint to proceed with surgery at Aster Medcity or coordinate with your local clinical team.',
    clinicalOutput: 'Empowered, objective clarity with zero pressure, allowing you to move forward with peace of mind.',
  },
];

export const PREPARATION_CHECKLIST: PreparationChecklistItem[] = [
  {
    id: 'pathology-reports',
    category: '01 / HISTOPATHOLOGY',
    label: 'PATHOLOGY REPORTS',
    description:
      'Original core biopsy or surgical resection narratives, including histologic grade, subtype, and lymphovascular invasion.',
    vitalComponents: [
      'Original tissue pathology narrative report with slide identification numbers',
      'Immunohistochemistry (IHC) profile: ER, PR, HER2, Ki-67 for breast; MMR/MSI for colorectal; CD117/DOG1 for GIST',
      'Original paraffin tissue blocks and glass slides (if slide re-staining / expert re-reading is indicated)',
    ],
    whyItMatters:
      'Receptor status and histological subtype dictate whether neoadjuvant systemic therapy is required before surgery to enable tissue-preserving margins.',
  },
  {
    id: 'cross-sectional-imaging',
    category: '02 / RADIOLOGY',
    label: 'CROSS-SECTIONAL IMAGING',
    description:
      'Full DICOM digital imaging files on CD, DVD, USB, or cloud link—not merely the 1-page typed summary report.',
    vitalComponents: [
      'High-resolution Contrast-Enhanced CT (Chest, Abdomen, Pelvis)',
      '18F-FDG PET-CT whole body scan performed within preceding 6–8 weeks',
      'Targeted Multi-parametric MRI (Breast, Pelvis, or Extremity depending on primary organ site)',
    ],
    whyItMatters:
      'A surgeon operates on three-dimensional anatomy. Dr. Kalathil must examine the millimeter relationship between the tumor and major blood vessels.',
  },
  {
    id: 'treatment-history',
    category: '03 / CLINICAL TIMELINE',
    label: 'TREATMENT HISTORY',
    description:
      'Documented history of any prior surgical resections, systemic chemotherapy cycles, or radiation therapies administered.',
    vitalComponents: [
      'Operative notes and discharge summaries from previous abdominal, pelvic, or breast surgeries',
      'Chemotherapy cycle dates, specific drug regimens (e.g. FOLFOX, AC-T), cumulative dosages, and tolerance',
      'Radiation therapy completion charts detailing field localization and total Grays (Gy) administered',
    ],
    whyItMatters:
      'Tissues altered by prior radiation or extensive surgery require precise technical planning to minimize complications and anastomotic leaks.',
  },
  {
    id: 'clinical-notes',
    category: '04 / CONSULTATION DOSSIER',
    label: 'CLINICAL NOTES',
    description:
      'Letters from your primary oncologist, referring physician summaries, inpatient discharge cards, and current prescriptions.',
    vitalComponents: [
      'Primary oncologist and surgeon clinical evaluation summaries',
      'Cardiology clearance and pulmonary function tests (if prior cardiac/respiratory conditions exist)',
      'Comprehensive active medication list and anticoagulant usage',
    ],
    whyItMatters:
      'Understanding your systemic performance status ensures surgical recommendations are safely calibrated to your overall physiological reserve.',
  },
  {
    id: 'previous-reports',
    category: '05 / BIOMARKERS',
    label: 'PREVIOUS BIOCHEMICAL REPORTS',
    description:
      'Baseline serial tumor markers and routine metabolic panels to evaluate surgical fitness and systemic disease velocity.',
    vitalComponents: [
      'Organ-specific markers: CEA (Colorectal), CA-125 (Ovarian/Peritoneal), CA 19-9 (Pancreato-biliary), AFP',
      'Complete Blood Count (CBC) and Coagulation profile (PT/INR)',
      'Renal function (Serum Creatinine, eGFR) and Liver function panels (LFTs)',
    ],
    whyItMatters:
      'Tumor marker velocity helps distinguish between active peritoneal recurrence and benign postoperative changes or radiation inflammation.',
  },
  {
    id: 'questions-answered',
    category: '06 / PATIENT PRIORITIES',
    label: 'QUESTIONS YOU WANT ANSWERED',
    description:
      'Specific questions and concerns written down by you and your family prior to the clinical review.',
    vitalComponents: [
      'Questions regarding whether mastectomy can safely be replaced by oncoplastic breast preservation',
      'Questions on whether HIPEC cytoreduction offers realistic disease control for peritoneal spread',
      'Clarification on operative risks, functional recovery timelines, and alternatives to amputation',
    ],
    whyItMatters:
      'The purpose of a second opinion is to replace anxiety with informed peace of mind, ensuring no clinical concern goes unexamined.',
  },
];

export const GULF_PATIENT_DESTINATIONS = [
  { country: 'United Arab Emirates', hub: 'Dubai · Abu Dhabi', flightTime: '3h 45m', code: 'DXB / AUH' },
  { country: 'Saudi Arabia', hub: 'Riyadh · Jeddah · Dammam', flightTime: '4h 30m', code: 'RUH / JED / DMM' },
  { country: 'Qatar', hub: 'Doha', flightTime: '4h 10m', code: 'DOH' },
  { country: 'Kuwait', hub: 'Kuwait City', flightTime: '4h 45m', code: 'KWI' },
  { country: 'Bahrain', hub: 'Manama', flightTime: '4h 15m', code: 'BAH' },
  { country: 'Oman', hub: 'Muscat', flightTime: '3h 30m', code: 'MCT' },
];

export const CLINICAL_FAQS: FaqItem[] = [
  {
    id: 'timing-urgency',
    question: 'Can a second opinion change the way I understand my treatment options?',
    answer:
      'Yes, substantially. In oncological surgery, treatment decisions are rarely black and white. A second opinion often reveals that a patient previously advised total mastectomy is an ideal candidate for oncoplastic breast preservation, or that peritoneal disease previously categorized as inoperable can be cleared with Cytoreductive Surgery and HIPEC. Even when confirming the initial recommendation, an independent review provides priceless peace of mind.',
    clinicalContext: 'Treatment Clarification & Margin Safety',
  },
  {
    id: 'required-records',
    question: 'What medical records should I submit for a thorough second opinion?',
    answer:
      'For a definitive surgical appraisal, we require your original histopathology biopsy reports (with IHC receptor status: ER/PR/HER2/Ki-67/MSI), full cross-sectional imaging files (DICOM disks of CT, MRI, or PET-CT scans, not merely the 1-page typed summary), previous surgical operative notes, and chemotherapy/radiation records. Having full digital scans allows Dr. Kalathil to inspect millimeter anatomy firsthand.',
    clinicalContext: 'Diagnostic Dossier Standards',
  },
  {
    id: 'remote-consultation',
    question: 'Can I request a review from outside Kerala or from the Middle East?',
    answer:
      'Yes. Over 40% of our second opinions are conducted for patients residing across India and the GCC (UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain). You can upload DICOM imaging and pathology files securely through our coordinator. Dr. Kalathil conducts a thorough clinical review and joins you and your family for a comprehensive video consultation before you commit to international travel.',
    clinicalContext: 'Remote Tele-Oncology Review',
  },
  {
    id: 'process-workflow',
    question: 'How does the second-opinion review process work?',
    answer:
      'The process follows four disciplined stages: 1) Initial dossier assembly and triage verification within 24 hours; 2) Independent scan and pathology evaluation by Dr. Kalathil; 3) An unhurried 45-minute consultation (in-person or tele-conference) explaining anatomical margins and options; 4) Delivery of a structured written surgical blueprint for you to share with your family and treating team.',
    clinicalContext: 'Disciplined Clinical Pathway',
  },
  {
    id: 'hipec-candidacy',
    question: 'How do we know if a patient is an appropriate candidate for CRS and HIPEC?',
    answer:
      'Not all peritoneal cancers are suitable for HIPEC. Candidacy depends strictly on tumor histology (pseudomyxoma, appendiceal, epithelial ovarian, or limited colorectal), the Sugarbaker Peritoneal Cancer Index (PCI) score, absence of unresectable extra-abdominal disease, and patient performance reserve. Dr. Kalathil examines cross-sectional imaging specifically to determine if a complete (CC-0 / CC-1) cytoreduction is realistically achievable.',
    clinicalContext: 'Sugarbaker PCI Evaluation Protocol',
  },
  {
    id: 'doctor-relationship',
    question: 'Will my current treating doctor feel offended if I ask for another opinion?',
    answer:
      'Reputable oncologists respect and actively welcome second opinions. High-stakes cancer care is inherently multidisciplinary, and complex choices—such as breast conservation versus radical mastectomy, or borderline resectable sarcomas—naturally benefit from multiple specialist viewpoints. Dr. Kalathil provides objective, collegial documentation that supports your family in moving forward without hesitation.',
    clinicalContext: 'Medical Ethics & Collaborative Care',
  },
];
