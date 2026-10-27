import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CLINICAL_DOCTOR_INFO, WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';

export interface HowItWorksPageProps {
  onRequestSecondOpinion: () => void;
}

interface ChecklistItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  essentialFor: string;
}

const DOSSIER_CHECKLIST: ChecklistItem[] = [
  {
    id: 'pathology',
    number: '01',
    title: 'Histopathology & Immunohistochemistry (IHC) Reports',
    subtitle: 'CELLULAR DIAGNOSIS & RECEPTOR STATUS',
    description:
      'Formal biopsy pathology reports verifying cell differentiation, tumor grade, and molecular receptor markers (e.g., ER, PR, HER2, Ki-67 for breast lesions; MSI/MMR for colorectal and peritoneal malignancies).',
    essentialFor: 'Confirming disease biology and re-evaluating surgical aggressiveness.',
  },
  {
    id: 'scans',
    number: '02',
    title: 'High-Resolution Cross-Sectional Imaging (PET-CT, MRI, CT)',
    subtitle: 'ANATOMICAL BOUNDARIES & VASCULAR MAPPING',
    description:
      'Radiology scan reports and original imaging series (DICOM CDs or cloud links). PET-CT scans rule out distant metastases; contrast-enhanced MRI provides precise local soft-tissue and vascular mapping.',
    essentialFor: 'Determining organ preservation feasibility and Sugarbaker PCI scoring.',
  },
  {
    id: 'op_notes',
    number: '03',
    title: 'Prior Operative Notes & Histopathology Re-Excisions',
    subtitle: 'IF PRIOR INTERVENTIONS OCCURRED',
    description:
      'Detailed surgical descriptions if a previous lumpectomy, laparoscopic evaluation, or exploratory laparotomy was performed at another institution.',
    essentialFor: 'Assessing residual anatomical planes, prior scars, and true margin clearances.',
  },
  {
    id: 'treatment_summary',
    number: '04',
    title: 'Current Medical Oncology & Systemic Therapy Plan',
    subtitle: 'SYSTEMIC TREATMENT & NEOADJUVANT PROTOCOLS',
    description:
      'Details of completed or ongoing chemotherapy, targeted therapy, or hormonal agents, including cycle dates and response evaluation scans.',
    essentialFor: 'Timing surgical resection for the window of maximum biological tumor response.',
  },
];

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onRequestSecondOpinion }) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    pathology: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCount = DOSSIER_CHECKLIST.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const whatsappMessage = encodeURIComponent(
    'Hello Dr. Jem Kalathil’s Clinical Desk, I would like guidance on preparing my medical records for a second opinion consultation.'
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_COORDINATOR_NUMBER.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="subpage-wrapper">
      {/* 1. Page Editorial Header */}
      <section className="subpage-editorial-hero" aria-label="Patient Pathway Introduction">
        <div className="editorial-container">
          <div className="subpage-breadcrumb">
            <span className="crumb-item">HOME</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-item">SECOND OPINION PROTOCOL</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">THE PATIENT PATHWAY</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="Aster Medcity Crest" className="hero-crest-img" />
              <span>OBJECTIVE SURGICAL CLARITY · ASTER MEDCITY</span>
            </div>
            <h1 className="subpage-title">
              The Clinical Pathway: From Diagnostic Uncertainty to Calm Certainty
            </h1>
            <p className="subpage-lead">
              A critical cancer diagnosis demands decisive action, but hurried decisions often lead to irreversible regret. Our structured second-opinion pathway provides unhurried evaluation, rigorous scientific scrutiny, and clear surgical direction.
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">24-48h</span>
              <span className="subpage-stat-label">Initial Review Turnaround</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">1-on-1</span>
              <span className="subpage-stat-label">Direct Time with Dr. Jem Kalathil</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Written</span>
              <span className="subpage-stat-label">Formal Signed Clinical Memorandum</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Global</span>
              <span className="subpage-stat-label">Gulf & International Concierge Desk</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual 4-Stage Pathway Timeline (Dark Luxury Theme) */}
      <section className="subpage-pathway-interactive-section">
        <div className="editorial-container">
          <div className="pathway-track-header">
            <span className="editorial-gold-kicker">A RIGOROUS 4-STAGE PROTOCOL</span>
            <h2 className="pathway-track-title">How Your Case is Processed</h2>
            <p className="pathway-track-lead">
              Every dossier submitted to Dr. Jem Kalathil moves through four strict clinical milestones designed to ensure zero diagnostic oversights.
            </p>
          </div>

          <div className="pathway-stages-stack">
            {/* Stage 1 */}
            <div className="pathway-stage-row">
              <div className="stage-num-column">
                <span className="stage-badge-large">01</span>
                <span className="stage-timeframe">Within 24 Hours</span>
              </div>
              <div className="stage-info-column">
                <div className="stage-header-row">
                  <span className="stage-kicker">STAGE 1 · MEDICAL DOSSIER INTAKE & VERIFICATION</span>
                  <span className="stage-status-indicator">● CLINICAL DESK INTAKE</span>
                </div>
                <h3 className="stage-heading">Comprehensive Record Gathering & Specialized Triage</h3>
                <p className="stage-text">
                  Your medical dossier (biopsy reports, PET-CT/MRI scans, operative notes, and treatment summaries) is securely uploaded or submitted via our clinical secretary. A designated oncology nurse verifies imaging resolutions and coordinates missing parameters so Dr. Jem Kalathil receives a complete, chronological clinical timeline.
                </p>
                <div className="stage-checklist-inline">
                  <span className="checklist-item">✓ Histopathology & IHC Receptor Markers</span>
                  <span className="checklist-item">✓ High-Resolution Radiology Scans & DICOM CDs</span>
                  <span className="checklist-item">✓ Primary Oncologist's Current Treatment Proposal</span>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="pathway-stage-row">
              <div className="stage-num-column">
                <span className="stage-badge-large">02</span>
                <span className="stage-timeframe">48 Hours</span>
              </div>
              <div className="stage-info-column">
                <div className="stage-header-row">
                  <span className="stage-kicker">STAGE 2 · MULTIDISCIPLINARY SCRUTINY</span>
                  <span className="stage-status-indicator">● TUMOR BOARD SCRUTINY</span>
                </div>
                <h3 className="stage-heading">Independent Surgical Staging & Tumor Board Evaluation</h3>
                <p className="stage-text">
                  Dr. Jem Kalathil re-evaluates surgical resectability from a quaternary perspective. In complex borderline cases—such as exploring organ preservation where mastectomy was advised, or calculating Sugarbaker PCI feasibility for peritoneal spread—scans are cross-examined with Aster Medcity's multidisciplinary oncology panel.
                </p>
                <div className="stage-checklist-inline">
                  <span className="checklist-item">✓ Independent Staging & Margin Validation</span>
                  <span className="checklist-item">✓ Organ-Preserving Feasibility Analysis</span>
                  <span className="checklist-item">✓ Complete Resection (R0 / CC-0) Feasibility</span>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="pathway-stage-row">
              <div className="stage-num-column">
                <span className="stage-badge-large">03</span>
                <span className="stage-timeframe">Scheduled Appointment</span>
              </div>
              <div className="stage-info-column">
                <div className="stage-header-row">
                  <span className="stage-kicker">STAGE 3 · UNHURRIED CONSULTATION</span>
                  <span className="stage-status-indicator">● 1-ON-1 SURGEON DIALOGUE</span>
                </div>
                <h3 className="stage-heading">Detailed 1-on-1 Discussion with Dr. Jem Kalathil</h3>
                <p className="stage-text">
                  You and your family meet directly with Dr. Jem Kalathil—either in person at Aster Medcity Kochi or via encrypted video teleconsultation. Dr. Jem translates intricate clinical data into transparent, human language, reviews surgical alternatives, and answers every question without time pressure.
                </p>
                <div className="stage-checklist-inline">
                  <span className="checklist-item">✓ Direct 1-on-1 Consultation Time</span>
                  <span className="checklist-item">✓ Transparent, Jargon-Free Clarifications</span>
                  <span className="checklist-item">✓ Direct Review of Scans on Screen</span>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="pathway-stage-row">
              <div className="stage-num-column">
                <span className="stage-badge-large">04</span>
                <span className="stage-timeframe">Written Delivery</span>
              </div>
              <div className="stage-info-column">
                <div className="stage-header-row">
                  <span className="stage-kicker">STAGE 4 · FORMAL CLINICAL MEMORANDUM</span>
                  <span className="stage-status-indicator">● EMPOWERED DIRECTION</span>
                </div>
                <h3 className="stage-heading">Formal Signed Memorandum & Actionable Treatment Roadmap</h3>
                <p className="stage-text">
                  You receive a formal written Clinical Memorandum detailing Dr. Jem Kalathil's findings, alternative surgical options, and recommended timelines. You are empowered to proceed with absolute clarity—whether returning to your primary local oncologist with our backing, or transitioning to Aster Medcity for surgical admission.
                </p>
                <div className="stage-checklist-inline">
                  <span className="checklist-item">✓ Signed Written Clinical Assessment</span>
                  <span className="checklist-item">✓ Collaborative Respect for Local Doctors</span>
                  <span className="checklist-item">✓ Dedicated International / Gulf Concierge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Diagnostic Dossier Preparation Checklist (Native Dark Luxury) */}
      <section className="subpage-checklist-dark-section" aria-label="Diagnostic Records Preparation Checklist">
        <div className="editorial-container">
          <div className="checklist-dark-header">
            <div className="checklist-header-text">
              <span className="editorial-gold-kicker">STANDARDIZED CLINICAL INTAKE</span>
              <h2 className="checklist-dark-headline">Preparing Your Medical Records</h2>
              <p className="checklist-dark-lead">
                A surgical oncologist operates on precise anatomical landmarks and microscopic cellular pathology. Assemble these key records to ensure Dr. Jem can evaluate margins with millimeter accuracy.
              </p>
            </div>

            {/* Interactive Progress Meter */}
            <div className="checklist-progress-card">
              <div className="meter-label-row">
                <span className="meter-title">DOSSIER READINESS</span>
                <span className="meter-counter">{completedCount} OF {totalCount} READY ({progressPercent}%)</span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-bar"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="meter-tip">
                {progressPercent === 100
                  ? '✨ Your dossier is 100% complete for direct surgical triage!'
                  : 'Click each record type below to track what you have ready for review.'}
              </span>
            </div>
          </div>

          <div className="checklist-dark-grid">
            {DOSSIER_CHECKLIST.map((item) => {
              const isChecked = !!checkedIds[item.id];
              return (
                <div
                  key={item.id}
                  className={`checklist-dark-card ${isChecked ? 'is-checked' : ''}`}
                  onClick={() => toggleCheck(item.id)}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleCheck(item.id);
                    }
                  }}
                >
                  <div className="card-check-box">
                    {isChecked ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span className="check-placeholder" />
                    )}
                  </div>

                  <div className="card-content-area">
                    <div className="card-meta-line">
                      <span className="card-item-num">RECORD {item.number}</span>
                      <span className="card-essential-badge">{item.subtitle}</span>
                    </div>
                    <h3 className="card-item-title">{item.title}</h3>
                    <p className="card-item-desc">{item.description}</p>
                    <div className="card-why-row">
                      <span className="why-label">Clinical Relevance:</span>
                      <span className="why-text">{item.essentialFor}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Comparison Table: Standard Practice vs Dr. Jem Kalathil's Pathway */}
      <section className="subpage-comparison-section">
        <div className="editorial-container">
          <div className="comparison-intro-header">
            <span className="simple-section-tag">THE SECOND OPINION DIFFERENCE</span>
            <h2 className="comparison-headline">Why This Structured Pathway Matters</h2>
            <p className="comparison-lead">
              Comparing conventional rushed second opinions with our thorough, quaternary hospital-backed standard.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-editorial-table">
              <thead>
                <tr>
                  <th className="col-aspect">Evaluation Aspect</th>
                  <th className="col-standard">Conventional Second Opinion</th>
                  <th className="col-jem">Dr. Jem Kalathil's Pathway</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="row-aspect">Consultation Duration</td>
                  <td className="row-standard">Rushed 5 to 10-minute outpatient visit without scan deep-dive.</td>
                  <td className="row-jem">Unhurried, dedicated 1-on-1 session reviewing scans slice-by-slice.</td>
                </tr>
                <tr>
                  <td className="row-aspect">Histopathology Review</td>
                  <td className="row-standard">Passive glance at the summary conclusion line only.</td>
                  <td className="row-jem">Rigorous re-examination of IHC markers, margins, and tumor grade.</td>
                </tr>
                <tr>
                  <td className="row-aspect">Organ Preservation</td>
                  <td className="row-standard">Default acceptance of radical surgery (e.g., total mastectomy).</td>
                  <td className="row-jem">Proactive planning of oncoplastic & tissue-sparing options where safe.</td>
                </tr>
                <tr>
                  <td className="row-aspect">Multidisciplinary Backup</td>
                  <td className="row-standard">Single clinician perspective without tumor board scrutiny.</td>
                  <td className="row-jem">Aster Medcity Quaternary Multidisciplinary Tumor Board (MDT).</td>
                </tr>
                <tr>
                  <td className="row-aspect">Deliverable to Patient</td>
                  <td className="row-standard">Verbal comments or handwritten prescription notes.</td>
                  <td className="row-jem">Formal Signed Written Clinical Memorandum with clear options.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Gulf & Regional Patient Travel Support Strip */}
      <section className="subpage-gulf-concierge-section">
        <div className="editorial-container">
          <div className="gulf-concierge-card">
            <div className="gulf-concierge-left">
              <span className="gulf-badge-gold">DEDICATED INTERNATIONAL LIAISON</span>
              <h2 className="gulf-concierge-title">Traveling from the Gulf Region to Kochi?</h2>
              <p className="gulf-concierge-desc">
                Patients from UAE, Oman, Qatar, Saudi Arabia, Kuwait, and Bahrain receive direct coordination before boarding a flight. We review records remotely first to confirm surgical suitability.
              </p>
              <div className="gulf-services-grid">
                <div className="gulf-service-item">
                  <span className="service-dot">●</span>
                  <span>Cochin International Airport (COK) reception — 45 mins to Aster Medcity</span>
                </div>
                <div className="gulf-service-item">
                  <span className="service-dot">●</span>
                  <span>Direct Arabic, English, and Malayalam bilingual patient coordinators</span>
                </div>
                <div className="gulf-service-item">
                  <span className="service-dot">●</span>
                  <span>Priority fast-track pre-operative assessment and admission booking</span>
                </div>
              </div>
            </div>

            <div className="gulf-concierge-right">
              <div className="gulf-contact-box">
                <span className="box-kicker">DIRECT INTERNATIONAL DESK</span>
                <span className="box-phone">{CLINICAL_DOCTOR_INFO.secretaryPhone}</span>
                <span className="box-hours">Mon – Sat, 09:00 AM – 04:00 PM IST</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gulf-whatsapp-btn"
                >
                  <span>WhatsApp Gulf Liaison</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom Conversion Banner */}
      <section className="subpage-bottom-cta">
        <div className="editorial-container">
          <div className="subpage-cta-inner">
            <span className="subpage-cta-kicker">COMMENCE YOUR EVALUATION WITH COMPLETE CONFIDENCE</span>
            <h2 className="subpage-cta-title">Begin Your Pathway to Clarity</h2>
            <p className="subpage-cta-text">
              Have your diagnostic reports and scans reviewed by Dr. Jem Kalathil and his senior surgical oncology team at Aster Medcity.
            </p>
            <div className="subpage-cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={onRequestSecondOpinion}
              >
                <span>Request Second Opinion Review</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
