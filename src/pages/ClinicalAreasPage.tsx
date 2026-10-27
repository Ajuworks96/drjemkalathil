import React, { useState } from 'react';
import { CLINICAL_AREAS, WHATSAPP_COORDINATOR_NUMBER, type ClinicalAreaDetailedItem } from '../constants/content';
import { Button } from '../components/Button';
import { trackCtaClick } from '../utils/analytics';

export interface ClinicalAreasPageProps {
  onRequestSecondOpinion: (domainId?: string) => void;
}

interface DisciplineBenchmark {
  standard: string;
  technique: string;
  preservation: string;
}

const DISCIPLINE_BENCHMARKS: Record<string, DisciplineBenchmark> = {
  breast: {
    standard: 'R0 Microscopic Negative Margins',
    technique: 'Dual-Tracer Sentinel Lymph Node Sparing',
    preservation: 'Oncoplastic Volume Displacement & Symmetry',
  },
  hipec: {
    standard: 'CC-0 / CC-1 Complete Peritonectomy',
    technique: 'Hyperthermic Intraperitoneal Perfusion (41.5°C–42.5°C)',
    preservation: 'Systematic Organ Clearance with Standardized ICU Care',
  },
  'minimally-invasive': {
    standard: 'Anatomical Nodal Dissection with 3D Robotic Vision',
    technique: 'daVinci Robotic & Laparoscopic Resection',
    preservation: 'Sphincter Sparing & Accelerated Post-Op Recovery',
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
      'Yes. More than 40% of the cases reviewed by Dr. Jem Kalathil at Aster Medcity are second opinions where patients were previously told that mastectomy was their only option, or that peritoneal disease was inoperable. An independent quaternary evaluation provides scientific reassurance or introduces alternatives.',
  },
  {
    num: '04',
    question: 'How does the Multidisciplinary Tumor Board (MDT) protect patient outcomes?',
    answer:
      'At Aster Medcity, complex oncology cases are never decided by a single clinician. The MDT brings together surgical oncologists, medical oncologists, radiation oncologists, and specialist onco-pathologists to cross-verify staging, review microscopic biopsy margins, and determine optimal surgical sequencing.',
  },
];

export const ClinicalAreasPage: React.FC<ClinicalAreasPageProps> = ({ onRequestSecondOpinion }) => {
  const [activeAreaId, setActiveAreaId] = useState<string>('breast');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeArea: ClinicalAreaDetailedItem =
    CLINICAL_AREAS.find((a: ClinicalAreaDetailedItem) => a.id === activeAreaId) || CLINICAL_AREAS[0];

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
  const whatsappUrl = `https://wa.me/${WHATSAPP_COORDINATOR_NUMBER.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="subpage-wrapper">
      {/* 1. Page Editorial Header (Dark Luxury Theme) */}
      <section className="subpage-editorial-hero" aria-label="Clinical Disciplines Overview">
        <div className="editorial-container">
          <div className="subpage-breadcrumb">
            <span className="crumb-item">HOME</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-item">DEPARTMENT OF SURGICAL ONCOLOGY</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">CLINICAL DISCIPLINES</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="Aster Medcity Crest" className="hero-crest-img" />
              <span>ASTER MEDCITY · KOCHI · QUATERNARY SURGICAL ONCOLOGY</span>
            </div>
            <h1 className="subpage-title">
              Disciplines of Precision & Surgical Leadership
            </h1>
            <p className="subpage-lead">
              Under the clinical leadership of <strong>Dr. Jem Kalathil</strong> (FRCS Edinburgh, 25+ Years Experience), our quaternary surgical oncology units balance complete curative cancer clearance with anatomical dignity, tissue preservation, and accelerated recovery.
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">25+</span>
              <span className="subpage-stat-label">Years Surgical Leadership</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">FRCS</span>
              <span className="subpage-stat-label">Royal College of Surgeons, Edinburgh</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">HIPEC</span>
              <span className="subpage-stat-label">High-Volume Peritoneal Center</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">MDT</span>
              <span className="subpage-stat-label">Multidisciplinary Board Standard</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Pillars Tab / Detailed Switcher */}
      <section className="disciplines-detailed-section">
        <div className="editorial-container">
          <div className="disciplines-tab-nav" role="tablist" aria-label="Clinical Disciplines Selector">
            {CLINICAL_AREAS.map((area: ClinicalAreaDetailedItem) => {
              const isActive = activeAreaId === area.id;
              return (
                <button
                  key={area.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`discipline-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveAreaId(area.id)}
                >
                  <span className="tab-number">{area.number}</span>
                  <div className="tab-label-group">
                    <span className="tab-title">{area.title}</span>
                    <span className="tab-subtext">{area.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Discipline Detailed Showcase Card */}
          <div className="discipline-active-card" key={activeArea.id}>
            <div className="discipline-grid-layout">
              {/* Left Column: Image Canvas & Surgeon Insight */}
              <div className="discipline-visual-col">
                <div className="discipline-image-canvas">
                  <div className="canvas-corner-tl" />
                  <div className="canvas-corner-br" />
                  <img
                    src={activeArea.imageSrc}
                    alt={activeArea.title}
                    className="discipline-feature-img"
                  />
                  <div className="discipline-image-tag">
                    <span className="tag-dot">●</span> ASTER MEDCITY · KOCHI
                  </div>
                </div>

                <div className="discipline-metrics-card">
                  <div className="quote-icon" aria-hidden="true">“</div>
                  <span className="metric-kicker">SURGICAL PHILOSOPHY</span>
                  <p className="metric-text">
                    “In oncological surgery, the microscopic margin is everything. Preserving anatomy is only meaningful when curative disease clearance is absolute.”
                  </p>
                  <span className="metric-author">— Dr. Jem Kalathil, FRCS (Edin)</span>
                </div>

                {/* Benchmark Specifications */}
                <div className="discipline-benchmarks-box">
                  <span className="benchmark-box-title">CLINICAL QUALITY BENCHMARKS</span>
                  <div className="benchmark-items">
                    <div className="benchmark-row">
                      <span className="b-label">Margin Standard:</span>
                      <span className="b-val">{currentBenchmark.standard}</span>
                    </div>
                    <div className="benchmark-row">
                      <span className="b-label">Key Technique:</span>
                      <span className="b-val">{currentBenchmark.technique}</span>
                    </div>
                    <div className="benchmark-row">
                      <span className="b-label">Primary Goal:</span>
                      <span className="b-val">{currentBenchmark.preservation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Clinical Scope */}
              <div className="discipline-content-col">
                <div className="discipline-header-cluster">
                  <span className="discipline-badge">
                    PILLAR {activeArea.number} · {activeArea.subtitle}
                  </span>
                  <h2 className="discipline-heading">{activeArea.title}</h2>
                  <p className="discipline-description">{activeArea.description}</p>
                </div>

                <div className="discipline-subsections-group">
                  <h3 className="subsections-title">Key Surgical Innovations & Focus Areas</h3>
                  <div className="procedures-list">
                    {activeArea.procedures.map((proc: string, idx: number) => (
                      <div className="proc-pill" key={idx}>
                        <div className="proc-icon-circle">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="proc-text">{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* When is Second Opinion Critical */}
                <div className="clinical-criteria-box">
                  <div className="criteria-header-row">
                    <span className="criteria-icon">⚖️</span>
                    <h4 className="criteria-heading">When is a Second Opinion Critical in this Discipline?</h4>
                  </div>
                  <ul className="criteria-list">
                    {activeArea.id === 'breast' && (
                      <>
                        <li><span className="priority-pill">HIGH PRIORITY</span> <strong>Proposed Total Mastectomy:</strong> When mastectomy is recommended without evaluating oncoplastic breast conservation or volume displacement techniques.</li>
                        <li><span className="priority-pill">NEOADJUVANT</span> <strong>Post-Chemotherapy Downstaging:</strong> Reassessing surgical feasibility following chemotherapy before irreversible tissue excision.</li>
                        <li><span className="priority-pill">MARGIN CHECK</span> <strong>Uncertain Margin Status:</strong> When previous lumpectomy margins are close or positive, requiring specialized margin re-excision.</li>
                        <li><span className="priority-pill">SPARING</span> <strong>Lymphedema Prevention:</strong> Evaluating dual-tracer Sentinel Lymph Node Biopsy (SLNB) to spare full axillary dissection.</li>
                      </>
                    )}
                    {activeArea.id === 'hipec' && (
                      <>
                        <li><span className="priority-pill">CRITICAL</span> <strong>Deemed Inoperable Elsewhere:</strong> When peritoneal carcinomatosis has been diagnosed as terminal without formal Peritoneal Cancer Index (PCI) scoring.</li>
                        <li><span className="priority-pill">SECONDARY</span> <strong>Advanced / Recurrent Ovarian Cancer:</strong> Evaluating secondary cytoreduction feasibility combined with hyperthermic chemotherapy.</li>
                        <li><span className="priority-pill">RADICAL</span> <strong>Pseudomyxoma Peritonei (PMP) & Appendix Tumors:</strong> Requiring radical multi-compartment peritonectomy by a dedicated high-volume peritoneal team.</li>
                        <li><span className="priority-pill">PCI STAGING</span> <strong>Strict CC-0 Target Assessment:</strong> Comprehensive imaging review to confirm whether complete macroscopic clearance is surgically achievable.</li>
                      </>
                    )}
                    {activeArea.id === 'minimally-invasive' && (
                      <>
                        <li><span className="priority-pill">ROBOTIC</span> <strong>Open Surgery vs Robotic Option:</strong> When open laparotomy is advised but daVinci robotic approaches can reduce recovery time and trauma.</li>
                        <li><span className="priority-pill">SARCOMA</span> <strong>Complex Retroperitoneal Sarcomas:</strong> Requiring compartmental resection around major vascular structures (vena cava, iliac vessels) while sparing limbs.</li>
                        <li><span className="priority-pill">SPHINCTER</span> <strong>Low Rectal Sphincter Preservation:</strong> Where permanent colostomy was proposed, but robotic pelvic dexterity allows sphincter-sparing ultra-low resection.</li>
                        <li><span className="priority-pill">ERAS RECOVERY</span> <strong>Rapid Chemotherapy Transition:</strong> Minimizing post-surgical wound complications to start essential adjuvant chemotherapy on schedule.</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Action Row */}
                <div className="discipline-action-row">
                  <Button
                    variant="primary"
                    size="lg"
                    className="discipline-cta-btn"
                    onClick={() => handleCta(activeArea.id)}
                  >
                    <span>Request Second Opinion for {activeArea.title}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="discipline-whatsapp-btn"
                  >
                    <span className="whatsapp-dot">●</span>
                    <span>Chat with Oncology Triage Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Tumor Board Consensus Protocol (Dark Luxury Theme) */}
      <section className="tumor-board-protocol-section">
        <div className="editorial-container">
          <div className="protocol-intro-header">
            <span className="simple-section-tag">QUATERNARY ONCOLOGY STANDARD</span>
            <h2 className="protocol-headline">Multidisciplinary Tumor Board (MDT) Integration</h2>
            <p className="protocol-lead">
              At Aster Medcity, no surgical decision is made in clinical isolation. Every complex case is cross-scrutinized in a structured tumor board combining surgical, medical, radiation, radiology, and histopathology experts.
            </p>
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

      {/* 4. Native Dark Luxury Clinical Clarifications FAQ */}
      <section className="subpage-faq-dark-section" aria-label="Clinical Clarifications">
        <div className="editorial-container">
          <div className="faq-dark-header">
            <span className="editorial-gold-kicker">FREQUENT CLINICAL QUESTIONS</span>
            <h2 className="faq-dark-title">Second Opinion & Surgical Guidance</h2>
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

      {/* 5. Bottom Consultation Banner */}
      <section className="subpage-bottom-cta">
        <div className="editorial-container">
          <div className="subpage-cta-inner">
            <span className="subpage-cta-kicker">TAKE THE NEXT STEP WITH OBJECTIVE CONFIDENCE</span>
            <h2 className="subpage-cta-title">Require Clarity on a Surgical Recommendation?</h2>
            <p className="subpage-cta-text">
              Dr. Jem Kalathil and his team review medical records from India and across the Gulf region to provide objective clinical clarity and written direction.
            </p>
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
          </div>
        </div>
      </section>
    </div>
  );
};
