import React from 'react';
import { Button } from '../components/Button';
import { PatientPathwayJourney } from '../components/PatientPathwayJourney';
import { PatientChecklist } from '../components/PatientChecklist';
import { GulfRouteMinimal } from '../components/GulfRouteMinimal';

export interface HowItWorksPageProps {
  onRequestSecondOpinion: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onRequestSecondOpinion }) => {
  return (
    <div className="subpage-wrapper">
      {/* 1. Page Editorial Header */}
      <section className="subpage-editorial-hero" aria-label="Patient Pathway Introduction">
        <div className="editorial-container">
          <div className="subpage-hero-meta">
            <span className="subpage-kicker">OBJECTIVE SURGICAL CLARITY · STEP-BY-STEP</span>
            <h1 className="subpage-title">
              The Clinical Pathway: From Confusion to Calm Certainty
            </h1>
            <p className="subpage-lead">
              A cancer diagnosis demands decisive action, but hurried decisions often lead to regret. Our structured second-opinion pathway provides unhurried evaluation, scientific validation, and clear surgical direction.
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">24-48h</span>
              <span className="subpage-stat-label">Initial Review Turnaround</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">1-on-1</span>
              <span className="subpage-stat-label">Direct Time with Dr. Jem</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Written</span>
              <span className="subpage-stat-label">Formal Clinical Memorandum</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Global</span>
              <span className="subpage-stat-label">Gulf & Regional Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Stage Visual Pathway */}
      <PatientPathwayJourney />

      {/* 3. Deep-Dive Process Stages */}
      <section className="pathway-details-section">
        <div className="editorial-container">
          <div className="pathway-stages-stack">
            {/* Stage 1 */}
            <div className="pathway-stage-row">
              <div className="stage-num-column">
                <span className="stage-badge-large">01</span>
                <span className="stage-timeframe">Within 24 Hours</span>
              </div>
              <div className="stage-info-column">
                <span className="stage-kicker">STEP 1 · MEDICAL DOSSIER INTAKE</span>
                <h2 className="stage-heading">Comprehensive Record Gathering & Clinical Triage</h2>
                <p className="stage-text">
                  Your medical dossier (biopsy reports, PET-CT/MRI scans, operative notes, and treatment summaries) is securely uploaded or submitted via our clinical secretary. A designated oncology nurse coordinates missing parameters so Dr. Jem Kalathil receives a complete clinical timeline.
                </p>
                <div className="stage-checklist-inline">
                  <span className="checklist-item">✓ Histopathology & IHC Reports</span>
                  <span className="checklist-item">✓ High-resolution Radiology Scans</span>
                  <span className="checklist-item">✓ Current Oncologist’s Proposed Plan</span>
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
                <span className="stage-kicker">STEP 2 · MULTIDISCIPLINARY SCRUTINY</span>
                <h2 className="stage-heading">Independent Surgical Staging & Tumor Board Review</h2>
                <p className="stage-text">
                  Dr. Jem Kalathil re-evaluates technical surgical feasibility. In complex borderline cases—such as organ preservation in early breast cancer or complete cytoreduction for peritoneal disease—scans are cross-examined with specialist radiologists and pathologists at Aster Medcity.
                </p>
                <div className="stage-checklist-inline">
                  <span className="checklist-item">✓ Verification of Tumor Staging</span>
                  <span className="checklist-item">✓ Resectability & Margin Safety</span>
                  <span className="checklist-item">✓ Organ-Preserving Feasibility</span>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="pathway-stage-row">
              <div className="stage-num-column">
                <span className="stage-badge-large">03</span>
                <span className="stage-timeframe">Scheduled</span>
              </div>
              <div className="stage-info-column">
                <span className="stage-kicker">STEP 3 · THE CONSULTATION</span>
                <h2 className="stage-heading">Unhurried Discussion & Written Clinical Memorandum</h2>
                <p className="stage-text">
                  You and your family meet directly with Dr. Jem Kalathil—either in person at Aster Medcity Kochi or via encrypted teleconsultation. Dr. Jem explains the findings in transparent, human language, reviews all alternatives, and provides a formal written Second Opinion Memorandum.
                </p>
                <div className="stage-checklist-inline">
                  <span className="checklist-item">✓ Direct 1-on-1 Consultation</span>
                  <span className="checklist-item">✓ Clear, Jargon-Free Clarifications</span>
                  <span className="checklist-item">✓ Formal Signed Written Document</span>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="pathway-stage-row">
              <div className="stage-num-column">
                <span className="stage-badge-large">04</span>
                <span className="stage-timeframe">Seamless Transition</span>
              </div>
              <div className="stage-info-column">
                <span className="stage-kicker">STEP 4 · EMPOWERED DIRECTION</span>
                <h2 className="stage-heading">Collaborative Co-Management or Quaternary Surgical Admission</h2>
                <p className="stage-text">
                  You are empowered to proceed with absolute clarity. You may choose to return to your primary local oncologist armed with our validated recommendation, or transition seamlessly to Dr. Jem Kalathil’s surgical care team at Aster Medcity for operative admission.
                </p>
                <div className="stage-checklist-inline">
                  <span className="checklist-item">✓ Mutual respect for your primary doctor</span>
                  <span className="checklist-item">✓ Dedicated Gulf / Travel Concierge Desk</span>
                  <span className="checklist-item">✓ Direct Pre-Op Scheduling when needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Documents & Records Checklist Section */}
      <PatientChecklist />

      {/* 5. Gulf & Outstation Route Integration */}
      <GulfRouteMinimal onRequestSecondOpinion={onRequestSecondOpinion} />

      {/* 6. Bottom Conversion Banner */}
      <section className="subpage-bottom-cta">
        <div className="editorial-container">
          <div className="subpage-cta-inner">
            <h2 className="subpage-cta-title">Begin Your Pathway Today</h2>
            <p className="subpage-cta-text">
              Have your records reviewed by Dr. Jem Kalathil. Reach out directly or submit your medical dossier through our secure portal.
            </p>
            <div className="subpage-cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={onRequestSecondOpinion}
              >
                <span>Request Clinical Evaluation</span>
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
