import React, { useState } from 'react';
import { CLINICAL_AREAS, type ClinicalAreaDetailedItem } from '../constants/content';
import { Button } from '../components/Button';
import { ClinicalClarificationsAccordion } from '../components/ClinicalClarificationsAccordion';
import { trackCtaClick } from '../utils/analytics';

export interface ClinicalAreasPageProps {
  onRequestSecondOpinion: (domainId?: string) => void;
}

export const ClinicalAreasPage: React.FC<ClinicalAreasPageProps> = ({ onRequestSecondOpinion }) => {
  const [activeAreaId, setActiveAreaId] = useState<string>('breast');

  const activeArea: ClinicalAreaDetailedItem =
    CLINICAL_AREAS.find((a: ClinicalAreaDetailedItem) => a.id === activeAreaId) || CLINICAL_AREAS[0];

  const handleCta = (domainId: string) => {
    trackCtaClick(`clinical_page_${domainId}`, `Second Opinion for ${domainId}`);
    onRequestSecondOpinion(domainId);
  };

  return (
    <div className="subpage-wrapper">
      {/* 1. Page Editorial Header (Dark Luxury Theme) */}
      <section className="subpage-editorial-hero" aria-label="Clinical Disciplines Overview">
        <div className="editorial-container">
          <div className="subpage-hero-meta">
            <span className="subpage-kicker">ASTER MEDCITY · DEPARTMENT OF SURGICAL ONCOLOGY</span>
            <h1 className="subpage-title">
              Disciplines of Precision & Surgical Leadership
            </h1>
            <p className="subpage-lead">
              Dr. Jem Kalathil directs dedicated quaternary surgical teams focusing on organ-preserving breast oncoplasty, advanced HIPEC cytoreduction, and minimally invasive robotic procedures.
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">25+</span>
              <span className="subpage-stat-label">Years Operating Experience</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">FRCS</span>
              <span className="subpage-stat-label">Royal College of Surgeons, Edinburgh</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">1000s</span>
              <span className="subpage-stat-label">Complex Surgeries Performed</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">MDT</span>
              <span className="subpage-stat-label">Tumor Board Consensus Approach</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Pillars Tab / Detailed Switcher */}
      <section className="disciplines-detailed-section">
        <div className="editorial-container">
          <div className="disciplines-tab-nav" role="tablist" aria-label="Clinical Disciplines Selector">
            {CLINICAL_AREAS.map((area: ClinicalAreaDetailedItem) => (
              <button
                key={area.id}
                role="tab"
                aria-selected={activeAreaId === area.id}
                className={`discipline-tab-btn ${activeAreaId === area.id ? 'is-active' : ''}`}
                onClick={() => setActiveAreaId(area.id)}
              >
                <span className="tab-number">{area.number}</span>
                <span className="tab-title">{area.title}</span>
              </button>
            ))}
          </div>

          {/* Active Discipline Detailed Showcase */}
          <div className="discipline-active-card" key={activeArea.id}>
            <div className="discipline-grid-layout">
              <div className="discipline-visual-col">
                <div className="discipline-image-canvas">
                  <img
                    src={activeArea.imageSrc}
                    alt={activeArea.title}
                    className="discipline-feature-img"
                  />
                  <div className="discipline-image-tag">{activeArea.subtitle}</div>
                </div>

                <div className="discipline-metrics-card">
                  <span className="metric-kicker">CLINICAL PHILOSOPHY</span>
                  <p className="metric-text">
                    “Surgery in oncology is never merely about excision. It is about balancing curative completeness with functional and psychological preservation.”
                  </p>
                  <span className="metric-author">— Dr. Jem Kalathil</span>
                </div>
              </div>

              <div className="discipline-content-col">
                <span className="discipline-badge">{activeArea.number} · {activeArea.subtitle}</span>
                <h2 className="discipline-heading">{activeArea.title}</h2>
                <p className="discipline-description">{activeArea.description}</p>

                <div className="discipline-subsections-group">
                  <h3 className="subsections-title">Key Surgical Innovations & Focus Areas</h3>
                  <div className="procedures-list">
                    {activeArea.procedures.map((proc: string, idx: number) => (
                      <div className="proc-pill" key={idx}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="clinical-criteria-box">
                  <h4 className="criteria-heading">When is a Second Opinion Critical in this Discipline?</h4>
                  <ul className="criteria-list">
                    {activeArea.id === 'breast' && (
                      <>
                        <li>When mastectomy is proposed without exploring oncoplastic breast preservation techniques.</li>
                        <li>Following neoadjuvant chemotherapy to reassess surgical feasibility.</li>
                        <li>When pathology margins or axillary node management options are unclear.</li>
                        <li>For genetic/hereditary breast cancers requiring bilateral risk-reduction strategies.</li>
                      </>
                    )}
                    {activeArea.id === 'hipec' && (
                      <>
                        <li>When peritoneal carcinomatosis is deemed inoperable elsewhere without PCI scoring.</li>
                        <li>For advanced or recurrent ovarian cancer being considered for secondary cytoreduction.</li>
                        <li>For pseudomyxoma peritonei (PMP) or appendix neoplasms requiring specialized CRS.</li>
                        <li>To evaluate performance status and disease biology for complete resectability (CC-0).</li>
                      </>
                    )}
                    {activeArea.id === 'minimally-invasive' && (
                      <>
                        <li>When open surgery is recommended but minimally invasive or robotic approaches exist.</li>
                        <li>For borderline resectable esophageal or gastric malignancies requiring precise nodal dissection.</li>
                        <li>For low rectal lesions where sphincter-preservation is in question.</li>
                        <li>To minimize surgical recovery time before essential adjuvant chemotherapy.</li>
                      </>
                    )}
                  </ul>
                </div>

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Tumor Board Consensus Protocol */}
      <section className="tumor-board-protocol-section">
        <div className="editorial-container">
          <div className="protocol-intro-header">
            <span className="simple-section-tag">QUATERNARY ONCOLOGY STANDARD</span>
            <h2 className="protocol-headline">Multidisciplinary Tumor Board (MDT) Integration</h2>
            <p className="protocol-lead">
              At Aster Medcity, no surgical decision is made in isolation. Complex surgical cases are cross-examined in a structured tumor board combining surgical, medical, radiation, radiology, and histopathology experts.
            </p>
          </div>

          <div className="protocol-pillars-grid">
            <div className="protocol-card">
              <div className="protocol-icon-wrap">
                <span className="protocol-number">01</span>
              </div>
              <h3 className="protocol-card-title">Surgical Oncologist</h3>
              <p className="protocol-card-desc">
                Defines technical resectability, oncoplastic preservation boundaries, and hyperthermic perfusion criteria.
              </p>
            </div>

            <div className="protocol-card">
              <div className="protocol-icon-wrap">
                <span className="protocol-number">02</span>
              </div>
              <h3 className="protocol-card-title">Medical Oncologist</h3>
              <p className="protocol-card-desc">
                Structures neoadjuvant downstaging protocols, targeted therapy, and immunotherapy timing for optimal biology.
              </p>
            </div>

            <div className="protocol-card">
              <div className="protocol-icon-wrap">
                <span className="protocol-number">03</span>
              </div>
              <h3 className="protocol-card-title">Radiation Oncologist</h3>
              <p className="protocol-card-desc">
                Evaluates stereotactic precision, organ-sparing conformal radiation, and margin sterilization protocols.
              </p>
            </div>

            <div className="protocol-card">
              <div className="protocol-icon-wrap">
                <span className="protocol-number">04</span>
              </div>
              <h3 className="protocol-card-title">Specialist Pathologist</h3>
              <p className="protocol-card-desc">
                Validates receptor status, immunohistochemistry (IHC), genetic markers, and microscopic resection margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Clinical Clarifications Accordion */}
      <ClinicalClarificationsAccordion />

      {/* 5. Bottom Consultation Banner */}
      <section className="subpage-bottom-cta">
        <div className="editorial-container">
          <div className="subpage-cta-inner">
            <h2 className="subpage-cta-title">Require Clarity on a Surgical Recommendation?</h2>
            <p className="subpage-cta-text">
              Dr. Jem Kalathil and his team review medical records from India and across the Gulf region to provide objective clinical clarity.
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
