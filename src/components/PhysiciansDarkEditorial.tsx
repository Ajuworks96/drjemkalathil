import React from 'react';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';
import { trackCtaClick } from '../utils/analytics';

export interface PhysiciansDarkEditorialProps {
  onRequestSecondOpinion: () => void;
}

export const PhysiciansDarkEditorial: React.FC<PhysiciansDarkEditorialProps> = ({
  onRequestSecondOpinion,
}) => {
  const handleReferClick = () => {
    trackCtaClick('physicians_refer_cta', 'Refer a Patient');
    onRequestSecondOpinion();
  };

  return (
    <section id="physicians" className="physicians-dark-section" aria-label="For Referring Physicians">
      <div className="editorial-container">
        <div className="physicians-dark-box">
          <div className="physicians-dark-left">
            <span className="physicians-gold-kicker">COLLEGIAL ONCOLOGY PARTNERSHIP</span>
            <h2 className="physicians-dark-headline">FOR REFERRING PHYSICIANS</h2>
            <blockquote className="physicians-quote">
              “Complex cases deserve thoughtful collaboration.”
            </blockquote>
            <p className="physicians-paragraph">
              We partner closely with medical oncologists, general surgeons, and tertiary physicians across India and
              the GCC. When evaluating borderline-resectable peritoneal spread or oncoplastic breast challenges, we
              provide direct clinician-to-clinician dialogue, strict return-of-care protocols, and complete operative
              documentation.
            </p>
          </div>

          <div className="physicians-dark-right">
            <button
              type="button"
              className="physicians-refer-btn"
              onClick={handleReferClick}
            >
              <span>REFER A PATIENT</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <a
              href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
              className="physicians-liaison-phone"
            >
              Physician Liaison: <span>{CLINICAL_DOCTOR_INFO.secretaryPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
