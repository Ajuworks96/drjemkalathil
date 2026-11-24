import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { trackCtaClick } from '../utils/analytics';
import { useSiteContent } from '../context/SiteContentContext';

export interface ClinicalAreasPageProps {
  onRequestSecondOpinion: (domainId?: string) => void;
}

interface SpecialtySectionDef {
  id: string;
  anchorId: string;
  number: string;
  title: string;
  subtitle: string;
  badgeLabel: string;
  description: string;
  imageSrc: string;
  imageCaptionBadge: string;
  procedures: Array<{ title: string; desc: string }>;
  scenarios: Array<{ badge: string; title: string; text: string }>;
  benchmarks: {
    standard: string;
    standardDetail: string;
    technique: string;
    techniqueDetail: string;
    preservation: string;
    preservationDetail: string;
  };
}

const SPECIALTY_SECTIONS: SpecialtySectionDef[] = [
  {
    id: 'breast',
    anchorId: 'breast-cancer',
    number: '01',
    title: 'Breast Cancer Surgery & Oncoplasty',
    subtitle: 'ORGAN PRESERVATION & MICROSCOPIC MARGIN CONTROL',
    badgeLabel: 'BREAST ONCOLOGY',
    description:
      'Advancing breast conservation through oncoplastic techniques that avoid mastectomy where clinically feasible, without compromising radical disease clearance. Integrating radio-guided surgery, sentinel lymph node biopsies, and aesthetic volume displacement.',
    imageSrc: '/images/clinical_case_review.jpg',
    imageCaptionBadge: 'MINIMALLY INVASIVE SURGICAL ONCOLOGY',
    scenarios: [
      {
        badge: 'ORGAN PRESERVATION',
        title: 'Proposed Total Mastectomy',
        text: 'When total mastectomy is advised elsewhere without formal evaluation of therapeutic mammaplasty, local tissue rearrangement, or oncoplastic volume displacement options.',
      },
      {
        badge: 'DIAGNOSTIC WORKUP',
        title: 'Open Excision Biopsy Proposed',
        text: 'Before undergoing invasive diagnostic excision of an undiagnosed lump, evaluate image-guided core biopsy and radio-guided occult lesion localisation (ROLL).',
      },
      {
        badge: 'NEOADJUVANT THERAPY',
        title: 'Post-Chemotherapy Downstaging',
        text: 'Reassessing surgical feasibility following systemic response to downstage tumor dimensions before committing to irreversible radical tissue sacrifice.',
      },
      {
        badge: 'AXILLARY STAGING',
        title: 'Axillary Node Clearance vs Sparing',
        text: 'Review of node-positive disease to evaluate targeted axillary dissection (TAD) and dual-tracer sentinel mapping versus full axillary clearance.',
      },
      {
        badge: 'MARGIN ASSESSMENT',
        title: 'Close or Positive Margins',
        text: 'When a previous lumpectomy reports close or positive microscopic borders, requiring specialized re-excision planning to avoid completion mastectomy.',
      },
      {
        badge: 'LYMPHOEDEMA CONTROL',
        title: 'LYMPHA Immediate Reconstruction',
        text: 'Primary prevention planning including axillary reverse mapping (ARM) and lymphovenous bypass to prevent lifelong chronic upper-limb lymphoedema.',
      },
    ],
    benchmarks: {
      standard: 'R0 Microscopic Negative Margins',
      standardDetail: 'Zero malignant cells at microscopic inked boundaries verified via specialized onco-pathology protocol.',
      technique: 'Dual-Tracer Sentinel Lymph Node Sparing',
      techniqueDetail: 'Combined radio-colloid and blue dye localisation to avoid unnecessary full axillary clearance.',
      preservation: 'Oncoplastic Volume Displacement & Symmetry',
      preservationDetail: 'Therapeutic mammaplasty & local glandular flaps restoring natural contour and contralateral symmetry.',
    },
    procedures: [
      {
        title: 'Organ-Preserving Oncoplasty with Advanced Reconstructive Techniques',
        desc: 'Preserving the breast while achieving clear surgical margins through volume displacement and local flap design.',
      },
      {
        title: 'Radio-Guided Surgery (ROLL, SNOLL & Dual-Tracer Sentinel Node Biopsy)',
        desc: 'Precision localisation of non-palpable lesions and sentinel nodes without open exploration.',
      },
      {
        title: 'Oncoplastic Symmetrisation & Contralateral Balancing',
        desc: 'Restoring bilateral symmetry in the same surgical setting, eliminating the need for a second reconstruction procedure.',
      },
      {
        title: 'Intraoperative Margin Assessment & Re-Excision Planning',
        desc: 'Real-time inked margin analysis to prevent re-operation and improve oncological clearance rates.',
      },
      {
        title: 'LYMPHA (Immediate Lymphatic Reconstruction for Lymphoedema Prevention)',
        desc: 'Performed at the time of axillary surgery to prevent chronic lymphoedema before it begins.',
      },
    ],
  },
  {
    id: 'hipec',
    anchorId: 'hipec',
    number: '02',
    title: 'Colorectal & Peritoneal Oncology · HIPEC',
    subtitle: 'CURATIVE CYTOREDUCTION & HYPERTHERMIC INTRAPERITONEAL PERFUSION',
    badgeLabel: 'PERITONEAL ONCOLOGY',
    description:
      'Pioneering aggressive multi-compartment peritonectomy combined with Hyperthermic Intraperitoneal Chemotherapy (41.5°C–42.5°C) for patients historically deemed inoperable due to peritoneal spread from colorectal, ovarian, or appendiceal origins.',
    imageSrc: '/images/hipec_perfusion_suite.jpg',
    imageCaptionBadge: 'QUATERNARY PERFUSION THEATRE',
    scenarios: [
      {
        badge: 'INOPERABLE OPINION',
        title: 'Deemed Inoperable Elsewhere',
        text: 'When peritoneal surface spread has been declared terminal without systematic cross-sectional imaging review and formal Sugarbaker PCI assessment.',
      },
      {
        badge: 'OVARIAN CARCINOMA',
        title: 'Recurrent Ovarian Carcinoma',
        text: 'Evaluating secondary cytoreduction feasibility combined with hyperthermic chemotherapy (HIPEC) in platinum-sensitive recurrence.',
      },
      {
        badge: 'PMP & APPENDIX',
        title: 'Pseudomyxoma Peritonei Clearance',
        text: 'Requiring radical multi-compartment peritonectomy by a dedicated high-volume peritoneal team to achieve complete macroscopic cytoreduction.',
      },
      {
        badge: 'PCI STAGING',
        title: 'Strict CC-0 Target Assessment',
        text: 'Comprehensive evaluation of high-resolution contrast CT/MRI scans to verify whether complete clearance (CC-0) can be achieved safely.',
      },
    ],
    benchmarks: {
      standard: 'CC-0 / CC-1 Complete Peritonectomy',
      standardDetail: 'Macroscopic cytoreduction achieving complete peritoneal clearance scored via Sugarbaker criteria.',
      technique: 'Hyperthermic Intraperitoneal Perfusion (41.5°C–42.5°C)',
      techniqueDetail: 'Continuous 60–90 minute heated perfusion circulating chemotherapy to eradicate microscopic seedings.',
      preservation: 'Systematic Organ Clearance with Standardized ICU Care',
      preservationDetail: 'Preserving vital bowel motility and organ integrity through structured multidisciplinary ICU protocols.',
    },
    procedures: [
      {
        title: 'Sugarbaker Peritoneal Cancer Index (PCI) Staging',
        desc: 'Millimeter radiological and intraoperative mapping of peritoneal involvement across all 13 abdominopelvic regions.',
      },
      {
        title: 'Complete Multi-Compartment Peritonectomy (CC-0 / CC-1)',
        desc: 'Radical stripping of parietal and visceral peritoneum to achieve total macroscopic tumor eradication.',
      },
      {
        title: 'Closed-Abdomen Hyperthermic Perfusion (42°C for 60–90 min)',
        desc: 'Circulating heated chemotherapeutic agents under rigorous real-time thermal monitoring to maximize cytotoxicity.',
      },
      {
        title: 'Pseudomyxoma Peritonei (PMP) Radical Cytoreduction',
        desc: 'Specialized complete mucinous disease clearance transforming historically fatal presentations into long-term disease control.',
      },
    ],
  },
  {
    id: 'gynec',
    anchorId: 'gynec',
    number: '03',
    title: 'Gynaecological Oncology',
    subtitle: 'RADICAL SURGICAL CLEARANCE & PELVIC AUTONOMIC NERVE PRESERVATION',
    badgeLabel: 'GYNAECOLOGICAL ONCOLOGY',
    description:
      'Subspecialty surgical oncology for advanced ovarian, uterine, and cervical malignancies. Implementing radical pelvic cytoreduction, retroperitoneal lymphadenectomy, and nerve-sparing radical hysterectomies.',
    imageSrc: '/images/neutral_hipec_or.jpg',
    imageCaptionBadge: 'ADVANCED PELVIC ONCOLOGY',
    scenarios: [
      {
        badge: 'OVARIAN MALIGNANCY',
        title: 'Advanced Stage III/IV Ovarian Cancer',
        text: 'Evaluating primary vs interval cytoreductive surgery to achieve zero residual macroscopic disease (CC-0).',
      },
      {
        badge: 'CERVICAL NEOPLASM',
        title: 'Locally Advanced Cervical Cancer',
        text: 'Evaluating nerve-sparing radical hysterectomy vs definitive chemoradiation protocols with multidisciplinary consensus.',
      },
      {
        badge: 'ENDOMETRIAL CANCER',
        title: 'Sentinel Lymph Node Mapping in Endometrial Cancer',
        text: 'High-precision indocyanine green (ICG) fluorescence mapping to avoid systemic lower-limb lymphedema.',
      },
      {
        badge: 'PELVIC RECURRENCE',
        title: 'Central Pelvic Recurrence',
        text: 'Assessing surgical candidacy for curative pelvic exenteration with multidisciplinary tissue reconstruction.',
      },
    ],
    benchmarks: {
      standard: 'Zero Residual Macroscopic Disease (CC-0)',
      standardDetail: 'Complete cytoreduction in ovarian malignancy as the single greatest determinant of overall survival.',
      technique: 'ICG Fluorescence Sentinel Lymph Node Mapping',
      techniqueDetail: 'Infrared-guided lymph node mapping sparing unnecessary complete pelvic and para-aortic lymphadenectomy.',
      preservation: 'Pelvic Splanchnic Nerve Preservation',
      preservationDetail: 'Meticulous micro-dissection of autonomic nerve pathways preserving bladder and rectal function.',
    },
    procedures: [
      {
        title: 'Radical Cytoreductive Surgery for Advanced Ovarian Cancer',
        desc: 'Diaphragmatic stripping, pelvic peritonectomy, and splenectomy when necessary to clear all macroscopic deposits.',
      },
      {
        title: 'Nerve-Sparing Radical Hysterectomy (Type C1/C2)',
        desc: 'Surgical clearance of parametrial disease with preservation of the hypogastric nerve plexus.',
      },
      {
        title: 'Sentinel Node Mapping using Indocyanine Green (ICG)',
        desc: 'Precision intraoperative lymphatic drainage mapping for endometrial and early cervical cancers.',
      },
      {
        title: 'Ultra-Radical Pelvic Exenteration & Reconstructive Conduits',
        desc: 'Curative multi-visceral resection for radiation-recurrent central pelvic malignancy.',
      },
    ],
  },
  {
    id: 'robotic',
    anchorId: 'robotic',
    number: '04',
    title: 'Robotic Surgical Oncology',
    subtitle: 'DA VINCI SURGICAL PRECISION IN DEEP PELVIC & RETROPERITONEAL SPACES',
    badgeLabel: 'ROBOTIC ONCOLOGY',
    description:
      'Deploying advanced daVinci robotic technology and 3D high-definition visualization for complex deep pelvic, retroperitoneal, and gastrointestinal resections—sparing critical nerves and blood vessels with minimal trauma.',
    imageSrc: '/images/robotic_oncology_frontier.jpg',
    imageCaptionBadge: 'DA VINCI ROBOTIC ONCOLOGY SUITE',
    scenarios: [
      {
        badge: 'ROBOTIC ALTERNATIVE',
        title: 'Open Laparotomy vs daVinci Robotic',
        text: 'When open surgery has been proposed, but robotic 3D binocular optics and tremor filtration offer equal radicality with significantly reduced tissue trauma.',
      },
      {
        badge: 'SPHINCTER PRESERVATION',
        title: 'Low Rectal Sphincter Preservation',
        text: 'Where permanent stoma was advised, but robotic deep pelvic dexterity permits ultra-low resection and sphincter preservation.',
      },
      {
        badge: 'RETROPERITONEAL SARCOMA',
        title: 'Complex Pelvic & Retroperitoneal Tumors',
        text: 'Compartmental resection around major vascular pathways (vena cava, iliac vessels) with meticulous preservation of nerve plexuses.',
      },
      {
        badge: 'ERAS PROTOCOLS',
        title: 'Accelerated Oncology Recovery',
        text: 'Minimizing wound complications and length of stay to ensure planned adjuvant chemotherapy or radiation begins strictly on schedule.',
      },
    ],
    benchmarks: {
      standard: 'Anatomical Nodal Dissection with 3D Robotic Vision',
      standardDetail: 'High-definition 3D stereoscopic view ensuring clear margins around major retroperitoneal vessels.',
      technique: 'daVinci Robotic Tremor-Filtered Micro-Dissection',
      techniqueDetail: '540-degree wrist articulation allowing tremor-free micro-dissection in deep confined pelvic planes.',
      preservation: 'Sphincter Sparing & Autonomic Nerve Preservation',
      preservationDetail: 'Preserving pelvic autonomic nerves for continence and enabling rapid return to adjuvant treatment.',
    },
    procedures: [
      {
        title: 'Robotic Total Mesorectal Excision (TME) for Rectal Cancer',
        desc: 'Clear radial margins in deep bony pelvis with higher rates of sphincter and nerve preservation.',
      },
      {
        title: 'Robotic-Assisted Esophagectomy & D2 Gastrectomy',
        desc: 'Radical station lymphadenectomy with minimal cardiopulmonary physiological insult.',
      },
      {
        title: 'Retroperitoneal Sarcoma Compartmental Mobilization',
        desc: 'Precision vascular dissection along the inferior vena cava, aorta, and iliac vessels.',
      },
      {
        title: 'Robotic Radical Pelvic Lymphadenectomy',
        desc: 'Extensive lymphatic basin clearance with minimized risk of obturator or femoral nerve injury.',
      },
    ],
  },
  {
    id: 'general',
    anchorId: 'general',
    number: '05',
    title: 'General Surgical Oncology',
    subtitle: 'COMPREHENSIVE ONCOLOGICAL RESECTION & COMPLEX SOFT TISSUE SARCOMAS',
    badgeLabel: 'SURGICAL ONCOLOGY',
    description:
      'Compartmental resection for complex trunk and extremity soft tissue sarcomas, gastrointestinal malignancies, endocrine tumors, and locally advanced abdominal neoplasms requiring multi-organ resection.',
    imageSrc: '/images/surgical_precision_instruments.jpg',
    imageCaptionBadge: 'COMPREHENSIVE ONCOLOGICAL SUITE',
    scenarios: [
      {
        badge: 'SARCOMA PRESERVATION',
        title: 'Limb-Sparing vs Amputation in Sarcomas',
        text: 'When amputation was proposed elsewhere, evaluating radical compartmental muscle group excision to preserve a functional limb.',
      },
      {
        badge: 'MULTI-ORGAN RESECTION',
        title: 'Locally Advanced Colon & Gastric Tumors',
        text: 'En-bloc resection of adjacent involved organs (spleen, pancreas, abdominal wall) achieving microscopic R0 margins.',
      },
      {
        badge: 'THYROID ONCOLOGY',
        title: 'Locally Invasive Thyroid Carcinoma',
        text: 'Careful preservation of recurrent laryngeal nerves and parathyroids while extirpating aggressive invasive nodal metastases.',
      },
      {
        badge: 'RE-OPERATIVE SURGERY',
        title: 'Recurrent Abdominal Malignancies',
        text: 'Navigating heavily scarred prior surgical fields to achieve complete re-excision of recurrent oncological disease.',
      },
    ],
    benchmarks: {
      standard: 'R0 Compartmental Muscular & Fascial Margins',
      standardDetail: 'Resecting tumors within an unbroken envelope of healthy investing tissue to prevent local recurrence.',
      technique: 'En-Bloc Vascular & Multi-Visceral Mobilization',
      techniqueDetail: 'Planned simultaneous resection and reconstruction of involved venous or arterial segments.',
      preservation: 'Major Motor Nerve & Limb Function Preservation',
      preservationDetail: 'Avoiding limb amputation through targeted high-dose pre-operative radiotherapy and micro-dissection.',
    },
    procedures: [
      {
        title: 'Compartmental Resection for Extremity & Retroperitoneal Sarcomas',
        desc: 'Complete anatomical compartment extirpation ensuring zero capsule violation.',
      },
      {
        title: 'Limb-Sparing Onco-Surgical Resections with Functional Reconstruction',
        desc: 'Teaming radical clearance with local rotational or free micro-vascular flap coverage.',
      },
      {
        title: 'D2 Lymphadenectomy & Radical Gastrectomy',
        desc: 'Curative clearance of perigastric and extra-perigastric nodal stations.',
      },
      {
        title: 'Comprehensive Thyroidectomy & Central/Lateral Neck Dissection',
        desc: 'Micro-dissection of the recurrent laryngeal nerve and parathyroid auto-transplantation.',
      },
    ],
  },
];

const CLINICAL_PAGE_FAQS = [
  {
    num: '01',
    category: 'BREAST ONCOLOGY',
    question: 'When is total mastectomy avoidable with the right surgical planning?',
    answer:
      'Total mastectomy is avoidable in the majority of early and locally advanced breast cancer cases when subspecialty surgical oncology planning begins before the first incision. After neoadjuvant chemotherapy, therapeutic mammaplasty and oncoplastic local tissue rearrangement techniques allow complete tumour excision with verified clear margins and preserved breast contour in most patients who have been told they need a mastectomy. The window to plan this is narrow — it closes once neoadjuvant therapy begins without a mapped conservation approach.',
  },
  {
    num: '02',
    category: 'PERITONEAL ONCOLOGY & HIPEC',
    question: 'Who is a candidate for cytoreductive surgery and HIPEC, and when is it too late?',
    answer:
      'Candidates for cytoreductive surgery (CRS) and HIPEC are patients with peritoneal surface disease confined primarily to the abdominal cavity, most commonly from colorectal, appendiceal, or gynaecological primaries. Eligibility is determined by the Peritoneal Cancer Index (PCI) score, the completeness of cytoreduction (CC) score achievable, organ function, and systemic disease status. PCI above 20 in colorectal disease or significant extra-abdominal spread typically excludes curative HIPEC intent. Early referral for formal PCI staging before systemic therapy is advisable — chemotherapy can lower PCI and convert a borderline case into an operable one.',
  },
  {
    num: '03',
    category: 'ROBOTIC SURGICAL ONCOLOGY',
    question: 'How does robotic surgery change outcomes in colorectal and gynaecological oncology?',
    answer:
      'Robotic surgical oncology in the pelvis offers three measurable advantages over open or standard laparoscopic surgery: superior visualisation of the deep pelvic planes (critical for TME in rectal cancer), tremor-free instrument precision at the pelvic sidewall and parametrium, and preservation of autonomic nerve bundles controlling bladder and sexual function. For rectal cancer, robotic TME achieves comparable oncological clearance with significantly lower conversion-to-open rates. For gynaecological cancers, robotic radical hysterectomy with pelvic nodal dissection reduces blood loss and inpatient stay without compromising the oncological resection.',
  },
  {
    num: '04',
    category: 'MDT INTEGRATION',
    question: 'How does the multidisciplinary board protect the surgical plan from a single-specialist bias?',
    answer:
      'A multidisciplinary tumor board prevents the single-specialist bias that is the most common cause of suboptimal oncological decisions. When a surgical oncologist reviews a case alone, they see it through a surgical lens. When the same case is reviewed with a medical oncologist, radiation oncologist, and specialist pathologist simultaneously, the sequencing of treatment — surgery before or after chemotherapy, radiation margins that protect the surgical field, pathological biomarkers that change the operative plan — is optimised across all disciplines before any single treatment begins. For every patient seen through Hope & Clarity, no surgical recommendation is issued before this board review is complete.',
  },
];

export const ClinicalAreasPage: React.FC<ClinicalAreasPageProps> = ({ onRequestSecondOpinion }) => {
  const { siteSettings, clinicalAreasPage } = useSiteContent();
  const [activeTabId, setActiveTabId] = useState<string>('breast');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Clinical Areas | Hope & Clarity — Surgical Oncology';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Thirty years of surgical oncology practice refined across complex oncological cases. Specialized in Breast Oncoplasty, HIPEC, Robotic Oncology, and Quaternary Second Opinions.'
      );
    }
  }, []);

  const handleCta = (domainId: string) => {
    trackCtaClick(`clinical_page_${domainId}`, `Second Opinion for ${domainId}`);
    onRequestSecondOpinion(domainId);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const scrollToSection = (anchorId: string) => {
    setActiveTabId(anchorId);
    const element = document.getElementById(anchorId);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Merge default curated specialty structure with dynamic WordPress backend overrides
  const mergedSpecialties = SPECIALTY_SECTIONS.map((sec) => {
    const override = clinicalAreasPage?.disciplines?.[sec.id as keyof typeof clinicalAreasPage.disciplines];
    if (!override) return sec;
    return {
      ...sec,
      title: override.title || sec.title,
      subtitle: override.subtitle || sec.subtitle,
      description: override.description || sec.description,
      procedures:
        override.procedures && override.procedures.length > 0
          ? override.procedures.map((p, i) => ({
              title: p,
              desc: sec.procedures[i]?.desc || 'Specialized operative procedure conducted under international MDT oncological protocol.',
            }))
          : sec.procedures,
    };
  });

  const activeSpecialty = mergedSpecialties.find((s) => s.id === activeTabId || s.anchorId === activeTabId) || mergedSpecialties[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Jem Kalathil's Clinical Desk, I would like to enquire about a second opinion consultation regarding ${activeSpecialty.title}.`
  );
  const whatsappUrl = `https://wa.me/${siteSettings.whatsappPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="subpage-wrapper clinical-page-wrapper">
      {/* 01. LUXURY EDITORIAL HERO HEADER */}
      <section className="subpage-editorial-hero" aria-label="Clinical Disciplines Overview">
        <div className="editorial-container">
          <div className="subpage-breadcrumb">
            <Link to="/" className="crumb-item">HOME</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">CLINICAL AREAS</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="" className="hero-crest-img" />
              <span>SURGICAL ONCOLOGY · QUATERNARY MDT BOARD STANDARDS</span>
            </div>

            <h1 className="subpage-title">{clinicalAreasPage?.pageTitle || 'Areas of Clinical Focus'}</h1>

            <p className="subpage-lead">
              {clinicalAreasPage?.pageLead ||
                'Thirty years of surgical oncology practice, refined through thousands of complex oncological cases, is brought to bear on every clinical decision — from the first biopsy to the final margin. The goal is not just tumour clearance. It is to restore life.'}
            </p>
          </div>

          {/* Full-width Atmospheric Hero Visual Frame (A5 & B4) */}
          <div className="clinical-hero-visual-banner">
            <img
              src="/images/surgical_theatre.jpg"
              alt="Quaternary surgical operating suite equipped for high-precision oncology resections"
              className="clinical-hero-banner-img"
              loading="eager"
            />
            <div className="clinical-hero-banner-overlay" />
            <div className="clinical-hero-banner-caption">
              <span>SPECIALIST MARGIN ANALYSIS &amp; MULTIDISCIPLINARY ONCOLOGY PLANNING</span>
            </div>
          </div>
        </div>

        {/* Sticky Specialty Anchor Nav Bar (A4) */}
        <div className="specialty-sticky-anchor-bar" aria-label="Specialty Quick Navigation">
          <div className="editorial-container">
            <div className="specialty-anchor-scroll-track" role="tablist">
              {mergedSpecialties.map((sec) => {
                const isActive = activeTabId === sec.id || activeTabId === sec.anchorId;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`specialty-anchor-tab ${isActive ? 'is-active' : ''}`}
                    onClick={() => scrollToSection(sec.anchorId)}
                  >
                    <span className="tab-number">{sec.number}</span>
                    <span className="tab-name">{sec.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 02. DETAILED SPECIALTY CLINICAL SECTIONS (5 DISCIPLINES) */}
      <div className="specialty-sections-master">
        {mergedSpecialties.map((spec, sIdx) => {
          const isFirst = sIdx === 0;

          return (
            <section
              key={spec.id}
              id={spec.anchorId}
              className={`specialty-detailed-chapter ${isFirst ? 'is-first-specialty' : ''}`}
              aria-label={spec.title}
            >
              <div className="editorial-container">
                {/* Chapter Eyebrow & Main Title Header */}
                <div className="specialty-chapter-header">
                  <div className="specialty-eyebrow-pill">
                    <span className="eyebrow-dot" aria-hidden="true" />
                    <span>{spec.badgeLabel} · PILLAR {spec.number}</span>
                  </div>

                  <h2 className="specialty-chapter-h2">
                    {spec.id === 'breast' && !clinicalAreasPage?.disciplines?.breast?.title
                      ? 'Situations That Require Specialised Surgical Expertise'
                      : spec.title}
                  </h2>

                  <p className="specialty-chapter-lead">
                    {spec.id === 'breast' && !clinicalAreasPage?.disciplines?.breast?.description
                      ? 'Most surgical decisions in breast oncology are time-sensitive and irreversible. These are the clinical moments when subspecialty surgical oncology judgement matters most.'
                      : spec.description}
                  </p>
                </div>

                {/* The 4 to 6 Scenario Cards */}
                <div className="specialty-scenarios-grid">
                  {spec.scenarios.map((scen, idx) => (
                    <div key={idx} className="specialty-scenario-card">
                      <span className="scenario-badge">{scen.badge}</span>
                      <h4 className="scenario-title">{scen.title}</h4>
                      <p className="scenario-desc">{scen.text}</p>
                    </div>
                  ))}
                </div>

                {/* Atmospheric 16:9 Mid-Section Visual Break (C4) */}
                <div className="specialty-atmospheric-banner">
                  <img
                    src={spec.imageSrc}
                    alt={spec.title}
                    className="atmospheric-banner-img"
                    loading="lazy"
                  />
                  <div className="atmospheric-banner-overlay" />
                  <div className="atmospheric-banner-badge">
                    <span className="badge-pulse-dot">●</span>
                    <span>{spec.imageCaptionBadge}</span>
                  </div>
                </div>

                {/* Operative Standards Section Header (C5) */}
                <div className="operative-standards-header">
                  <span className="standards-kicker">OPERATIVE STANDARDS</span>
                  <h3 className="standards-heading">The Technical Benchmarks That Define Every Procedure</h3>
                  <p className="standards-sub">
                    Direct standards applied by Dr. Jem Kalathil to ensure curative radicality while safeguarding anatomical and functional integrity.
                  </p>
                </div>

                {/* The 3 Technique Cards (C6) */}
                <div className="discipline-benchmarks-grid">
                  <div className="benchmark-card">
                    <div className="benchmark-card-head">
                      <span className="b-badge">RADICALITY BENCHMARK</span>
                    </div>
                    <span className="benchmark-card-label">Margin Standard</span>
                    <h3 className="benchmark-card-val">{spec.benchmarks.standard}</h3>
                    <p className="benchmark-card-desc">{spec.benchmarks.standardDetail}</p>
                  </div>

                  <div className="benchmark-card">
                    <div className="benchmark-card-head">
                      <span className="b-badge">SURGICAL TECHNIQUE</span>
                    </div>
                    <span className="benchmark-card-label">Key Technique</span>
                    <h3 className="benchmark-card-val">{spec.benchmarks.technique}</h3>
                    <p className="benchmark-card-desc">{spec.benchmarks.techniqueDetail}</p>
                  </div>

                  <div className="benchmark-card">
                    <div className="benchmark-card-head">
                      <span className="b-badge">PRIMARY RECOVERY GOAL</span>
                    </div>
                    <span className="benchmark-card-label">Primary Goal</span>
                    <h3 className="benchmark-card-val">{spec.benchmarks.preservation}</h3>
                    <p className="benchmark-card-desc">{spec.benchmarks.preservationDetail}</p>
                  </div>
                </div>

                {/* Surgeon Philosophy Quote Monument */}
                <div className="surgeon-quote-monument" style={{ marginBottom: '40px' }}>
                  <div className="quote-mark" aria-hidden="true">“</div>
                  <p className="quote-text">
                    “In oncological surgery, the microscopic margin is everything. Preserving anatomy is only meaningful when curative disease clearance is absolute.”
                  </p>
                  <div className="quote-author-row">
                    <span className="quote-author-name">Dr. Jem Kalathil</span>
                    <span className="quote-author-creds">MS, FRCS (Edin) · Surgical Oncologist</span>
                  </div>
                </div>

                {/* Upgraded 2-Column Grid of Mini-Cards for Procedures (C7) */}
                <div className="specialty-procedures-mini-deck">
                  <div className="deck-header-row">
                    <span className="deck-kicker">ONCOLOGICAL REPERTOIRE</span>
                    <h4 className="deck-heading">Specialised Surgical Innovations &amp; Key Focus Areas</h4>
                  </div>

                  <div className="mini-cards-two-column-grid">
                    {spec.procedures.map((proc, pIdx) => (
                      <div key={pIdx} className="mini-procedure-card">
                        <div className="mini-card-icon" aria-hidden="true">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div className="mini-card-content">
                          <h5 className="mini-card-title">{proc.title}</h5>
                          <p className="mini-card-desc">{proc.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Executive Clinical Review CTA Block (D1, D2, D3) */}
                {isFirst ? (
                  /* Full Bordered Box for First Occurrence */
                  <div className="showcase-actions-bar full-bordered-cta-card">
                    <div className="actions-left-copy">
                      <span className="actions-kicker">EXECUTIVE CLINICAL REVIEW</span>
                      <div className="specialty-label-chip">{spec.title}</div>
                      <h4 className="actions-headline">Request an In-Person or Telehealth Evaluation</h4>
                      <p className="actions-subtext">
                        Direct review of histopathology, operative notes, and cross-sectional scans by Dr. Jem Kalathil.
                      </p>
                    </div>

                    <div className="actions-buttons-group">
                      <Button
                        variant="primary"
                        size="lg"
                        className="btn-showcase-primary"
                        onClick={() => handleCta(spec.id)}
                      >
                        <span>Request a Surgical Second Opinion →</span>
                      </Button>

                      <a
                        href={`tel:${siteSettings.secretaryPhone.replace(/\s+/g, '')}`}
                        className="btn-showcase-secondary"
                        title="Direct Line to Clinical Desk"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span>Desk: +91 484 669 9999</span>
                      </a>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-showcase-whatsapp-outlined"
                      >
                        <svg className="whatsapp-green-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.2" aria-hidden="true">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                        <span>WhatsApp Triage</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Slim Inline Bar for Subsequent Occurrences (D3) */
                  <div className="specialty-inline-cta-bar">
                    <div className="inline-bar-left">
                      <span className="inline-bar-badge">{spec.title}</span>
                      <span className="inline-bar-text">Second opinions on surgical viability and margin verification</span>
                    </div>
                    <div className="inline-bar-right">
                      <button
                        type="button"
                        className="inline-bar-opinion-link"
                        onClick={() => handleCta(spec.id)}
                      >
                        Request a Second Opinion &rarr;
                      </button>
                      <span className="inline-bar-sep" aria-hidden="true">|</span>
                      <a href={`tel:${siteSettings.secretaryPhone.replace(/\s+/g, '')}`} className="inline-bar-phone">
                        {siteSettings.secretaryPhone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Thin gold separation line between specialty sections */}
                <div className="specialty-gold-separator" aria-hidden="true" />
              </div>
            </section>
          );
        })}
      </div>

      {/* 03. TUMOR BOARD CONSENSUS PROTOCOL (MDT SECTION - NMC 6.4 COMPLIANT) */}
      <section className="tumor-board-protocol-section" aria-label="Multidisciplinary Tumor Board">
        <div className="editorial-container">
          <div className="protocol-intro-header">
            <span className="simple-section-tag">QUATERNARY ONCOLOGY STANDARD</span>
            <h2 className="protocol-headline">Every Case. One Consensus.</h2>
            <p className="protocol-sublabel">Multidisciplinary Tumor Board Standard</p>
            <p className="protocol-lead">
              No oncological surgical decision is made in isolation. Complex cases are reviewed within a multidisciplinary
              tumor board framework combining surgical oncology, medical oncology, radiation oncology, onco-radiology,
              and subspecialty histopathology to achieve consensus-driven treatment plans. For patients referred through
              Hope &amp; Clarity, this means no surgical recommendation is issued before it has been reviewed and validated
              by the full board.
            </p>
          </div>

          {/* Visual Showcase of MDT Review */}
          <div className="protocol-showcase-visual">
            <div className="protocol-visual-frame">
              <img
                src="/images/clinical_intake_dossier.jpg"
                alt="Multidisciplinary Oncology Tumor Board Case Review and Diagnostic Dossier Analysis"
                className="protocol-banner-img"
                loading="lazy"
              />
              <div className="protocol-visual-overlay">
                <div className="protocol-badge-chip">
                  <span className="pulse-dot">●</span> MDT BOARD EVALUATION · QUATERNARY ONCOLOGY STANDARD
                </div>
                <p className="protocol-visual-caption">
                  Specialized consensus on radiologic boundaries, microscopic margins, and systemic sequencing for every complex cancer case.
                </p>
              </div>
            </div>
          </div>

          <div className="protocol-pillars-grid">
            <div className="protocol-card">
              <div className="protocol-card-top">
                <span className="protocol-number">01</span>
                <span className="protocol-role-badge">SURGICAL LEAD</span>
              </div>
              <h3 className="protocol-card-title">Surgical Oncologist</h3>
              <p className="protocol-card-desc">
                Defines technical resectability, oncoplastic preservation boundaries, Sugarbaker PCI feasibility, and hyperthermic perfusion criteria.
              </p>
            </div>

            <div className="protocol-card">
              <div className="protocol-card-top">
                <span className="protocol-number">02</span>
                <span className="protocol-role-badge">SYSTEMIC LEAD</span>
              </div>
              <h3 className="protocol-card-title">Medical Oncologist</h3>
              <p className="protocol-card-desc">
                Structures neoadjuvant downstaging regimens, targeted biological therapy, and immunotherapy timing for optimal biological control.
              </p>
            </div>

            <div className="protocol-card">
              <div className="protocol-card-top">
                <span className="protocol-number">03</span>
                <span className="protocol-role-badge">RADIATION LEAD</span>
              </div>
              <h3 className="protocol-card-title">Radiation Oncologist</h3>
              <p className="protocol-card-desc">
                Evaluates stereotactic precision, organ-sparing conformal radiation, and margin sterilization protocols before or after surgical resection.
              </p>
            </div>

            <div className="protocol-card">
              <div className="protocol-card-top">
                <span className="protocol-number">04</span>
                <span className="protocol-role-badge">CELLULAR LEAD</span>
              </div>
              <h3 className="protocol-card-title">Specialist Onco-Pathologist</h3>
              <p className="protocol-card-desc">
                Validates receptor status (ER/PR/HER2), immunohistochemistry (IHC), genetic biomarkers, and intra-operative microscopic resection margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. CLINICAL CLARIFICATIONS FAQ SECTION (RESTRUCTURED PER SPEC) */}
      <section className="subpage-faq-dark-section" aria-label="Clinical Guidance">
        <div className="editorial-container">
          <div className="faq-dark-header">
            <span className="editorial-gold-kicker">CLINICAL GUIDANCE</span>
            <h2 className="faq-dark-title">Your Most Important Questions, Answered Clinically</h2>
            <p className="faq-dark-lead">
              These are the questions patients and their families ask most — and the ones that deserve a direct, expert answer before any surgical decision is made.
            </p>
          </div>

          <div className="faq-dark-accordion-list">
            {CLINICAL_PAGE_FAQS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={item.num} className={`faq-dark-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-dark-trigger"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-dark-num">{item.num}</span>
                    <div className="faq-trigger-content">
                      <span className="faq-spec-tag">{item.category}</span>
                      <span className="faq-dark-q">{item.question}</span>
                    </div>
                    <span className="faq-dark-toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-dark-body">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05. CLOSING SECOND OPINION CTA */}
      <section className="subpage-bottom-cta">
        <div className="editorial-container">
          <div className="subpage-cta-inner">
            <span className="subpage-cta-kicker">TAKE THE NEXT STEP WITH OBJECTIVE CONFIDENCE</span>
            <h2 className="subpage-cta-title">Need a Second Voice on a Surgical Recommendation?</h2>
            <p className="subpage-cta-text">
              Dr. Jem Kalathil reviews medical records from India and across the Gulf region to provide objective clinical clarity and written direction within 24–48 hours.
            </p>
            <div className="subpage-cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onRequestSecondOpinion()}
              >
                <span>Consult Dr. Jem Kalathil &rarr;</span>
              </Button>

              <Link to="/upload-records" className="btn-opinion-secondary-ghost">
                Upload Scans &amp; Pathology
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};