import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLINICAL_AREAS, type ClinicalAreaDetailedItem } from '../constants/content';
import { Button } from '../components/Button';
import { trackCtaClick } from '../utils/analytics';
import { useSiteContent } from '../context/SiteContentContext';

export interface ClinicalAreasPageProps {
  onRequestSecondOpinion: (domainId?: string) => void;
}

interface DisciplineBenchmark {
  standard: string;
  technique: string;
  preservation: string;
  standardDetail: string;
  techniqueDetail: string;
  preservationDetail: string;
}

const DISCIPLINE_BENCHMARKS: Record<string, DisciplineBenchmark> = {
  breast: {
    standard: 'R0 Microscopic Negative Margins',
    technique: 'Dual-Tracer Sentinel Lymph Node Sparing',
    preservation: 'Oncoplastic Volume Displacement & Symmetry',
    standardDetail: 'Zero malignant cells at microscopic inked boundaries verified via specialized onco-pathology protocol.',
    techniqueDetail: 'Combined radio-colloid and blue dye localisation to avoid unnecessary full axillary clearance.',
    preservationDetail: 'Therapeutic mammaplasty & local glandular flaps restoring natural contour and contralateral symmetry.',
  },
  hipec: {
    standard: 'CC-0 / CC-1 Complete Peritonectomy',
    technique: 'Hyperthermic Intraperitoneal Perfusion (41.5°C–42.5°C)',
    preservation: 'Systematic Organ Clearance with Standardized ICU Care',
    standardDetail: 'Macroscopic cytoreduction achieving complete peritoneal clearance scored via Sugarbaker criteria.',
    techniqueDetail: 'Continuous 60–90 minute heated perfusion circulating chemotherapy to eradicate microscopic seedings.',
    preservationDetail: 'Preserving vital bowel motility and organ integrity through structured multidisciplinary ICU protocols.',
  },
  'minimally-invasive': {
    standard: 'Anatomical Nodal Dissection with 3D Robotic Vision',
    technique: 'daVinci Robotic & Laparoscopic Resection',
    preservation: 'Sphincter Sparing & Accelerated Post-Op Recovery',
    standardDetail: 'High-definition 3D stereoscopic view ensuring clear margins around major retroperitoneal vessels.',
    techniqueDetail: '540-degree wrist articulation allowing tremor-free micro-dissection in deep pelvic spaces.',
    preservationDetail: 'Preserving pelvic autonomic nerves for continence and enabling rapid return to adjuvant treatment.',
  },
};

const CLINICAL_PAGE_FAQS = [
  {
    num: '01',
    question: 'When should I consult a surgical oncologist for breast cancer conservation?',
    answer:
      'The ideal time is before any surgical incision is made—specifically right after a core needle biopsy confirms malignancy or following neoadjuvant chemotherapy. Early consultation allows Dr. Jem Kalathil to plan therapeutic mammaplasty or oncoplastic local tissue rearrangements, frequently avoiding total mastectomy while maintaining strict oncological margins.',
  },
  {
    num: '02',
    question: 'Am I a candidate for Cytoreductive Surgery and HIPEC for peritoneal spread?',
    answer:
      'Candidacy depends on the origin of the primary cancer (ovarian, appendiceal adenocarcinoma, pseudomyxoma peritonei, or colorectal), the volume of disease evaluated by the Sugarbaker Peritoneal Cancer Index (PCI), and your overall functional performance status. We review high-resolution PET-CT/MRI scans to determine whether complete cytoreduction (CC-0) is achievable.',
  },
  {
    num: '03',
    question: 'Can I get an independent review if surgery was recommended elsewhere?',
    answer:
      'Yes. More than 40% of the cases reviewed by Dr. Jem Kalathil are second opinions where patients were previously told that mastectomy was their only option, or that peritoneal disease was inoperable. An independent quaternary evaluation provides scientific reassurance or introduces alternatives.',
  },
  {
    num: '04',
    question: 'How does the Multidisciplinary Tumor Board (MDT) protect patient outcomes?',
    answer:
      'Complex oncology cases are never decided by a single clinician. The MDT brings together surgical oncologists, medical oncologists, radiation oncologists, and specialist onco-pathologists to cross-verify staging, review microscopic biopsy margins, and determine optimal surgical sequencing.',
  },
];

export const ClinicalAreasPage: React.FC<ClinicalAreasPageProps> = ({ onRequestSecondOpinion }) => {
  const { clinicalAreasPage, siteSettings } = useSiteContent();
  const [activeAreaId, setActiveAreaId] = useState<string>('breast');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Merge dynamic WordPress discipline overrides onto curated clinical areas
  const mergedAreas: ClinicalAreaDetailedItem[] = useMemo(() => {
    return CLINICAL_AREAS.map((area) => {
      const override =
        clinicalAreasPage.disciplines[area.id as keyof typeof clinicalAreasPage.disciplines];
      if (!override) return area;
      return {
        ...area,
        title: override.title || area.title,
        subtitle: override.subtitle || area.subtitle,
        description: override.description || area.description,
        procedures: override.procedures && override.procedures.length > 0 ? override.procedures : area.procedures,
      };
    });
  }, [clinicalAreasPage]);

  useEffect(() => {
    if (clinicalAreasPage.seo?.title) {
      document.title = clinicalAreasPage.seo.title;
    } else {
      document.title = 'Clinical Specialisations & Surgical Oncology Pillars | Dr. Jem Kalathil';
    }
    if (clinicalAreasPage.seo?.description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', clinicalAreasPage.seo.description);
    }
  }, [clinicalAreasPage]);

  const activeArea: ClinicalAreaDetailedItem =
    mergedAreas.find((a: ClinicalAreaDetailedItem) => a.id === activeAreaId) || mergedAreas[0];

  const currentBenchmark = DISCIPLINE_BENCHMARKS[activeArea.id] || DISCIPLINE_BENCHMARKS.breast;

  const handleCta = (domainId: string) => {
    trackCtaClick(`clinical_page_${domainId}`, `Second Opinion for ${domainId}`);
    onRequestSecondOpinion(domainId);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Jem Kalathil's Clinical Desk, I would like to enquire about a second opinion consultation regarding ${activeArea.title}.`
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
            <span className="crumb-active">CLINICAL SPECIALISATIONS</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="" className="hero-crest-img" />
              <span>SURGICAL ONCOLOGY · QUATERNARY MDT BOARD STANDARDS</span>
            </div>

            <h1 className="subpage-title">
              {clinicalAreasPage.pageTitle || 'Clinical Specialisations & Surgical Boundaries.'}
            </h1>

            <p className="subpage-lead">
              {clinicalAreasPage.pageLead ||
                'Detailed clinical protocols across Oncoplastic Breast Surgery, Peritoneal Surface Malignancies (HIPEC), and Minimally Invasive Robotic Oncology under rigorous multidisciplinary scrutiny.'}
            </p>
          </div>

          {/* Integrated Luxury Metric Strip */}
          <div className="subpage-metrics-strip">
            <div className="metric-strip-card">
              <span className="metric-strip-val">{siteSettings.experienceYears} Years</span>
              <span className="metric-strip-label">Dedicated Surgical Oncology</span>
            </div>
            <div className="metric-strip-divider" aria-hidden="true" />
            <div className="metric-strip-card">
              <span className="metric-strip-val">High-Volume</span>
              <span className="metric-strip-label">Peritoneal Surface &amp; HIPEC Center</span>
            </div>
            <div className="metric-strip-divider" aria-hidden="true" />
            <div className="metric-strip-card">
              <span className="metric-strip-val">Organ Sparing</span>
              <span className="metric-strip-label">Oncoplastic Breast Preservation</span>
            </div>
            <div className="metric-strip-divider" aria-hidden="true" />
            <div className="metric-strip-card">
              <span className="metric-strip-val">MDT Standard</span>
              <span className="metric-strip-label">Multidisciplinary Tumor Board Scrutiny</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. INTERACTIVE PILLARS NAVIGATION & SHOWCASE SECTION */}
      <section className="disciplines-detailed-section">
        <div className="editorial-container">
          {/* Segmented Discipline Tabs */}
          <div className="disciplines-luxury-tab-bar" role="tablist" aria-label="Clinical Disciplines Selector">
            {mergedAreas.map((area: ClinicalAreaDetailedItem) => {
              const isActive = activeAreaId === area.id;
              return (
                <button
                  key={area.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`luxury-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveAreaId(area.id)}
                >
                  <span className="tab-pill-num">{area.number}</span>
                  <div className="tab-pill-text">
                    <span className="tab-pill-title">{area.title}</span>
                    <span className="tab-pill-sub">{area.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Discipline Detailed Showcase Suite */}
          <div className="discipline-active-showcase" key={activeArea.id}>
            {/* STAGE A: Cinematic Split (Visual + Discipline Lead & Philosophy) */}
            <div className="showcase-top-grid">
              {/* Cinematic Visual Frame */}
              <div className="showcase-visual-frame">
                <img
                  src={activeArea.imageSrc}
                  alt={activeArea.title}
                  className="showcase-banner-img"
                  loading="eager"
                />
                <div className="showcase-img-overlay" />
                <div className="showcase-floating-badge">
                  <span className="live-dot">●</span>
                  <span>SURGICAL SUITE EXCELLENCE · ASTER MEDCITY</span>
                </div>
              </div>

              {/* Header Content & Surgeon Philosophy */}
              <div className="showcase-header-content">
                <div className="showcase-kicker-row">
                  <span className="discipline-kicker-tag">PILLAR {activeArea.number}</span>
                  <span className="meta-sep" aria-hidden="true">·</span>
                  <span className="discipline-sub-tag">{activeArea.subtitle}</span>
                </div>

                <h2 className="discipline-primary-title">{activeArea.title}</h2>
                <p className="discipline-lead-text">{activeArea.description}</p>

                {/* Surgeon Philosophy Quote Monument */}
                <div className="surgeon-quote-monument">
                  <div className="quote-mark" aria-hidden="true">“</div>
                  <p className="quote-text">
                    “In oncological surgery, the microscopic margin is everything. Preserving anatomy is only meaningful when curative disease clearance is absolute.”
                  </p>
                  <div className="quote-author-row">
                    <span className="quote-author-name">Dr. Jem Kalathil</span>
                    <span className="quote-author-creds">MS, FRCS · Lead Senior Consultant, Surgical Oncology</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STAGE B: 3 CLINICAL QUALITY BENCHMARKS (Full-Width Executive Row) */}
            <div className="discipline-benchmarks-grid">
              <div className="benchmark-card">
                <div className="benchmark-card-head">
                  <span className="b-badge">RADICALITY BENCHMARK</span>
                </div>
                <span className="benchmark-card-label">Margin Standard</span>
                <h3 className="benchmark-card-val">{currentBenchmark.standard}</h3>
                <p className="benchmark-card-desc">{currentBenchmark.standardDetail}</p>
              </div>

              <div className="benchmark-card">
                <div className="benchmark-card-head">
                  <span className="b-badge">SURGICAL TECHNIQUE</span>
                </div>
                <span className="benchmark-card-label">Key Technique</span>
                <h3 className="benchmark-card-val">{currentBenchmark.technique}</h3>
                <p className="benchmark-card-desc">{currentBenchmark.techniqueDetail}</p>
              </div>

              <div className="benchmark-card">
                <div className="benchmark-card-head">
                  <span className="b-badge">PRIMARY RECOVERY GOAL</span>
                </div>
                <span className="benchmark-card-label">Primary Goal</span>
                <h3 className="benchmark-card-val">{currentBenchmark.preservation}</h3>
                <p className="benchmark-card-desc">{currentBenchmark.preservationDetail}</p>
              </div>
            </div>

            {/* STAGE C: SURGICAL PROCEDURES & INNOVATIONS (2-Column Luxury Grid) */}
            <div className="showcase-procedures-section">
              <div className="section-title-wrap">
                <span className="section-sub-kicker">ONCOLOGICAL REPERTOIRE</span>
                <h3 className="section-main-heading">Specialised Surgical Innovations &amp; Key Focus Areas</h3>
              </div>

              <div className="procedures-luxury-grid">
                {activeArea.procedures.map((proc: string, idx: number) => (
                  <div className="procedure-luxury-card" key={idx}>
                    <div className="proc-check-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="proc-card-title">{proc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* STAGE D: CLINICAL SECOND OPINION SAFEGUARDS */}
            <div className="second-opinion-safeguards-section">
              <div className="safeguards-header">
                <div className="safeguards-title-group">
                  <span className="safeguards-kicker">DECISION-MAKING SAFEGUARDS</span>
                  <h3 className="safeguards-heading">When is an Independent Surgical Second Opinion Critical?</h3>
                </div>
                <span className="safeguards-note">
                  Objective, evidence-grounded evaluation reviewed within 24–48 hours.
                </span>
              </div>

              <div className="safeguards-cards-grid">
                {activeArea.id === 'breast' && (
                  <>
                    <div className="safeguard-card">
                      <span className="safeguard-badge">ORGAN PRESERVATION</span>
                      <h4 className="safeguard-title">Proposed Total Mastectomy</h4>
                      <p className="safeguard-text">
                        When total mastectomy is advised elsewhere without formal evaluation of therapeutic mammaplasty, local tissue rearrangement, or oncoplastic volume displacement options.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">DIAGNOSTIC WORKUP</span>
                      <h4 className="safeguard-title">Open Excision Biopsy Proposed</h4>
                      <p className="safeguard-text">
                        Before undergoing invasive diagnostic excision of an undiagnosed lump, evaluate image-guided core biopsy and radio-guided occult lesion localisation (ROLL).
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">NEOADJUVANT THERAPY</span>
                      <h4 className="safeguard-title">Post-Chemotherapy Downstaging</h4>
                      <p className="safeguard-text">
                        Reassessing surgical feasibility following systemic response to downstage tumor dimensions before committing to irreversible radical tissue sacrifice.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">AXILLARY STAGING</span>
                      <h4 className="safeguard-title">Axillary Node Clearance vs Sparing</h4>
                      <p className="safeguard-text">
                        Review of node-positive disease to evaluate targeted axillary dissection (TAD) and dual-tracer sentinel mapping versus full axillary clearance.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">MARGIN ASSESSMENT</span>
                      <h4 className="safeguard-title">Close or Positive Margins</h4>
                      <p className="safeguard-text">
                        When a previous lumpectomy reports close or positive microscopic borders, requiring specialized re-excision planning to avoid completion mastectomy.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">LYMPHOEDEMA CONTROL</span>
                      <h4 className="safeguard-title">LYMPHA Immediate Reconstruction</h4>
                      <p className="safeguard-text">
                        Primary prevention planning including axillary reverse mapping (ARM) and lymphovenous bypass to prevent lifelong chronic upper-limb lymphoedema.
                      </p>
                    </div>
                  </>
                )}

                {activeArea.id === 'hipec' && (
                  <>
                    <div className="safeguard-card">
                      <span className="safeguard-badge">INOPERABLE OPINION</span>
                      <h4 className="safeguard-title">Deemed Inoperable Elsewhere</h4>
                      <p className="safeguard-text">
                        When peritoneal surface spread has been declared terminal without systematic cross-sectional imaging review and formal Sugarbaker PCI assessment.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">OVARIAN CARCINOMA</span>
                      <h4 className="safeguard-title">Recurrent Ovarian Carcinoma</h4>
                      <p className="safeguard-text">
                        Evaluating secondary cytoreduction feasibility combined with hyperthermic chemotherapy (HIPEC) in platinum-sensitive recurrence.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">PMP &amp; APPENDIX</span>
                      <h4 className="safeguard-title">Pseudomyxoma Peritonei Clearance</h4>
                      <p className="safeguard-text">
                        Requiring radical multi-compartment peritonectomy by a dedicated high-volume peritoneal team to achieve complete macroscopic cytoreduction.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">PCI STAGING</span>
                      <h4 className="safeguard-title">Strict CC-0 Target Assessment</h4>
                      <p className="safeguard-text">
                        Comprehensive evaluation of high-resolution contrast CT/MRI scans to verify whether complete clearance (CC-0) can be achieved safely.
                      </p>
                    </div>
                  </>
                )}

                {activeArea.id === 'minimally-invasive' && (
                  <>
                    <div className="safeguard-card">
                      <span className="safeguard-badge">ROBOTIC ALTERNATIVE</span>
                      <h4 className="safeguard-title">Open Laparotomy vs daVinci Robotic</h4>
                      <p className="safeguard-text">
                        When open surgery has been proposed, but robotic 3D binocular optics and tremor filtration offer equal radicality with significantly reduced tissue trauma.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">SPHINCTER PRESERVATION</span>
                      <h4 className="safeguard-title">Low Rectal Sphincter Preservation</h4>
                      <p className="safeguard-text">
                        Where permanent stoma was advised, but robotic deep pelvic dexterity permits ultra-low resection and sphincter preservation.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">RETROPERITONEAL SARCOMA</span>
                      <h4 className="safeguard-title">Complex Pelvic &amp; Retroperitoneal Tumors</h4>
                      <p className="safeguard-text">
                        Compartmental resection around major vascular pathways (vena cava, iliac vessels) with meticulous preservation of nerve plexuses.
                      </p>
                    </div>

                    <div className="safeguard-card">
                      <span className="safeguard-badge">ERAS PROTOCOLS</span>
                      <h4 className="safeguard-title">Accelerated Oncology Recovery</h4>
                      <p className="safeguard-text">
                        Minimizing wound complications and length of stay to ensure planned adjuvant chemotherapy or radiation begins strictly on schedule.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* STAGE E: EXECUTIVE ACTION BAR */}
            <div className="showcase-actions-bar">
              <div className="actions-left-copy">
                <span className="actions-kicker">EXECUTIVE CLINICAL REVIEW</span>
                <h4 className="actions-headline">Request an In-Person or Telehealth Evaluation</h4>
                <p className="actions-subtext">
                  Direct review of histopathology, operative notes, and contrast scans by Dr. Jem Kalathil.
                </p>
              </div>

              <div className="actions-buttons-group">
                <Button
                  variant="primary"
                  size="lg"
                  className="btn-showcase-primary"
                  onClick={() => handleCta(activeArea.id)}
                >
                  <span>Request Second Opinion for {activeArea.title}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>

                <a
                  href={`tel:${siteSettings.secretaryPhone.replace(/\s+/g, '')}`}
                  className="btn-showcase-secondary"
                  title="Direct Line to Clinical Desk"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Desk: +91 484 669 9999</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-showcase-whatsapp"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  <span>WhatsApp Triage</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. TUMOR BOARD CONSENSUS PROTOCOL (MDT SECTION) */}
      <section className="tumor-board-protocol-section">
        <div className="editorial-container">
          <div className="protocol-intro-header">
            <span className="simple-section-tag">QUATERNARY ONCOLOGY STANDARD</span>
            <h2 className="protocol-headline">Multidisciplinary Tumor Board (MDT) Integration</h2>
            <p className="protocol-lead">
              No oncological surgical decision is made in isolation. Complex cases are reviewed within a multidisciplinary tumor board framework combining surgical oncology, medical oncology, radiation oncology, onco-radiology, and subspecialty histopathology to achieve consensus-driven treatment plans.
            </p>
          </div>

          {/* Visual Showcase of MDT Review */}
          <div className="protocol-showcase-visual">
            <div className="protocol-visual-frame">
              <img
                src="/images/clinical_case_review.jpg"
                alt="Multidisciplinary Oncology Tumor Board Case Review at Aster Medcity"
                className="protocol-banner-img"
                loading="lazy"
              />
              <div className="protocol-visual-overlay">
                <div className="protocol-badge-chip">
                  <span className="pulse-dot">●</span> MDT BOARD EVALUATION · ASTER MEDCITY
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

      {/* 04. CLINICAL CLARIFICATIONS FAQ SECTION */}
      <section className="subpage-faq-dark-section" aria-label="Clinical Clarifications">
        <div className="editorial-container">
          <div className="faq-dark-header">
            <span className="editorial-gold-kicker">FREQUENT CLINICAL QUESTIONS</span>
            <h2 className="faq-dark-title">Second Opinion &amp; Surgical Guidance</h2>
            <p className="faq-dark-lead">
              Clear answers to the most important questions patients and referring physicians ask when evaluating surgical options.
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
                    <span className="faq-dark-q">{item.question}</span>
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

      {/* 05. MONUMENTAL CLOSING SECOND OPINION CTA */}
      <section className="subpage-bottom-cta">
        <div className="editorial-container">
          <div className="subpage-cta-inner">
            <span className="subpage-cta-kicker">TAKE THE NEXT STEP WITH OBJECTIVE CONFIDENCE</span>
            <h2 className="subpage-cta-title">Require Clarity on a Surgical Recommendation?</h2>
            <p className="subpage-cta-text">
              Dr. Jem Kalathil and his team review medical records from India and across the Gulf region to provide objective clinical clarity and written direction within 24–48 hours.
            </p>
            <div className="subpage-cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onRequestSecondOpinion()}
              >
                <span>Consult Dr. Jem Kalathil</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>

              <Link to="/upload-records" className="btn-opinion-secondary">
                Upload Scans &amp; Pathology
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};