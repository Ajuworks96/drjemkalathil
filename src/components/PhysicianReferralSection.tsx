import React from 'react';
import { Button } from './Button';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';

export interface PhysicianReferralSectionProps {
  onRequestSecondOpinion: () => void;
}

export const PhysicianReferralSection: React.FC<PhysicianReferralSectionProps> = ({ onRequestSecondOpinion }) => {
  return (
    <section className="physician-referral-section" aria-labelledby="referral-heading">
      <div className="editorial-container">
        {/* Eyebrow Tag */}
        <div className="referral-eyebrow-row">
          <span className="referral-eyebrow-num">10</span>
          <span className="referral-eyebrow-rule" aria-hidden="true" />
          <span className="referral-eyebrow-tag">PEER-TO-PEER ONCOLOGICAL COLLABORATION</span>
        </div>

        {/* Refined Dark / Ivory Composition */}
        <div className="referral-editorial-frame">
          <div className="referral-content-grid">
            {/* Left Column: Heading & Core Statement */}
            <div className="referral-left-column">
              <h2 id="referral-heading" className="referral-headline">
                FOR REFERRING<br />PHYSICIANS
              </h2>
              <p className="referral-sub-lead">
                Complex cases deserve thoughtful collaboration.
              </p>

              <div className="referral-divider-gold" aria-hidden="true" />

              <p className="referral-body-text">
                Dr. Jem Kalathil works closely with medical oncologists, general surgeons, and gynecologists across India and internationally to evaluate high-complexity, borderline resectable, or peritoneal malignancies.
              </p>

              <div className="referral-cta-cluster">
                <Button
                  variant="primary"
                  size="lg"
                  className="referral-primary-btn"
                  onClick={onRequestSecondOpinion}
                >
                  <span>Refer a Patient for Review</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>

                <a
                  href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
                  className="referral-phone-link"
                >
                  <span>Physician Liaison: <strong>{CLINICAL_DOCTOR_INFO.secretaryPhone}</strong></span>
                </a>
              </div>
            </div>

            {/* Right Column: Three Structural Pillars of Collegial Referral */}
            <div className="referral-right-column">
              <div className="referral-principle-entry">
                <span className="principle-num">01</span>
                <div className="principle-content">
                  <h3 className="principle-title">Direct Surgeon-to-Surgeon Dialogue</h3>
                  <p className="principle-desc">
                    Dr. Kalathil is readily available for direct telephonic or virtual case review with treating oncologists to examine DICOM scan reconstructions before formal referral.
                  </p>
                </div>
              </div>

              <div className="referral-principle-entry">
                <span className="principle-num">02</span>
                <div className="principle-content">
                  <h3 className="principle-title">Strict Return-of-Care Protocol</h3>
                  <p className="principle-desc">
                    Once specialized surgical resection (such as CRS+HIPEC, oncoplastic reconstruction, or sarcoma compartment clearing) is completed, patients are systematically returned to their primary medical oncologist for adjuvant therapy.
                  </p>
                </div>
              </div>

              <div className="referral-principle-entry">
                <span className="principle-num">03</span>
                <div className="principle-content">
                  <h3 className="principle-title">Immediate Formal Operative Documentation</h3>
                  <p className="principle-desc">
                    Referring teams receive detailed operative notes, high-resolution intra-operative photographic margin records, and pathology correlation summaries within 48 hours of surgery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
