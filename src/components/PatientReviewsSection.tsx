import React from 'react';

export const PatientReviewsSection: React.FC = () => {
  return (
    <section className="evidence-trust-section" aria-label="Evidence-Based Clinical Practice">
      <div className="editorial-container">
        <div className="evidence-trust-monument">
          <div className="evidence-eyebrow-pill" role="status">
            <span className="pill-gold-dot" aria-hidden="true" />
            <span>ETHICAL SURGICAL ONCOLOGY · EVIDENCE-BASED GOVERNANCE</span>
          </div>

          <h2 className="evidence-main-title">
            Evidence-Based Practice &amp; <span className="title-gold-italic">Direct Accountability.</span>
          </h2>

          <div className="evidence-statement-card">
            <p className="evidence-lead-statement">
              Clinical decisions at Hope &amp; Clarity are guided by published oncological evidence, multidisciplinary
              case review, and direct surgeon accountability. No protocol is applied without individual case assessment.
              This platform does not display patient testimonials or outcome ratings in compliance with professional
              ethical guidelines.
            </p>

            <div className="evidence-pillars-row">
              <div className="evidence-pillar-item">
                <span className="pillar-num">01</span>
                <h4 className="pillar-title">Peer-Reviewed Evidence</h4>
                <p className="pillar-desc">
                  Every surgical recommendation is validated against published international oncological clinical trials and NCCN standards.
                </p>
              </div>

              <div className="evidence-pillar-item">
                <span className="pillar-num">02</span>
                <h4 className="pillar-title">Multidisciplinary Review</h4>
                <p className="pillar-desc">
                  Complex cases undergo cross-disciplinary scrutiny across surgical, medical, radiation, and molecular pathology specialties.
                </p>
              </div>

              <div className="evidence-pillar-item">
                <span className="pillar-num">03</span>
                <h4 className="pillar-title">Direct Surgeon Accountability</h4>
                <p className="pillar-desc">
                  Direct assessment by Dr. Jem Kalathil with formal, documented clinical conclusions provided directly to the patient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
