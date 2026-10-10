import React from 'react';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';

export interface SecondOpinionCTAProps {
  onRequestSecondOpinion: () => void;
}

export const SecondOpinionCTA: React.FC<SecondOpinionCTAProps> = ({ onRequestSecondOpinion }) => {
  const whatsappUrl = `https://wa.me/${CLINICAL_DOCTOR_INFO.whatsappCoordinator.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello, I am contacting the Clinical Secretary of Dr. Jem Kalathil to request an independent surgical second opinion.'
  )}`;

  return (
    <section className="burgundy-conversion-monument" aria-labelledby="conversion-main-headline">
      <div className="editorial-container">
        <div className="conversion-monument-inner">
          {/* Top Label & 48-Hour Commitment Accent */}
          <div className="conversion-header-cluster">
            <span className="conversion-eyebrow-label">HOPE & CLARITY · SURGICAL ONCOLOGY</span>
            <div className="commitment-pill-luxury" role="note">
              <span className="commitment-gold-dot" aria-hidden="true" />
              <span className="commitment-text">48-HOUR RESPONSE COMMITMENT</span>
            </div>
          </div>

          {/* Monumental Ivory Headline */}
          <h2 id="conversion-main-headline" className="conversion-monument-headline">
            WHEN THE DECISION<br />
            FEELS UNCERTAIN,<br />
            <span className="headline-gold-sheen">CLARITY MATTERS.</span>
          </h2>

          {/* Restrained Lead Paragraph */}
          <p className="conversion-lead-statement">
            Receive an independent oncology review before making your next major treatment decision. Direct histological margin analysis and cross-sectional DICOM evaluation under the guidance of Dr. Jem Kalathil.
          </p>

          {/* Key Assurance Columns with Hairline Accents */}
          <div className="conversion-pillars-row">
            <div className="conversion-pillar-col">
              <span className="col-gold-num">01</span>
              <h3 className="col-title">Personal Surgical Review</h3>
              <p className="col-desc">
                Your imaging and histology reports are scrutinized directly by Dr. Jem Kalathil, not junior evaluators.
              </p>
            </div>

            <div className="conversion-pillar-col">
              <span className="col-gold-num">02</span>
              <h3 className="col-title">Zero Pressure Autonomy</h3>
              <p className="col-desc">
                An objective written blueprint designed for you to discuss with your family and local surgical oncologist.
              </p>
            </div>

            <div className="conversion-pillar-col">
              <span className="col-gold-num">03</span>
              <h3 className="col-title">Tele-Oncology & In-Person</h3>
              <p className="col-desc">
                Consult via secure video conference from across India and the Gulf, or attend clinic at Aster Medcity, Kochi.
              </p>
            </div>
          </div>

          {/* Dual Luxury Action Group */}
          <div className="conversion-action-suite">
            {/* Primary Action Button */}
            <button
              type="button"
              className="btn-luxury-primary"
              onClick={onRequestSecondOpinion}
              aria-label="Request an independent second opinion consultation"
            >
              <span>Request a Second Opinion</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Secondary Action: Direct WhatsApp Coordinator */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-whatsapp"
              aria-label="WhatsApp the Department Coordinator directly"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.03C9.36 7.03 9.08 7.09 8.84 7.35C8.61 7.61 7.95 8.22 7.95 9.48C7.95 10.74 8.86 11.95 8.99 12.13C9.12 12.3 10.75 14.82 13.25 15.9C13.85 16.16 14.31 16.31 14.67 16.43C15.27 16.62 15.82 16.59 16.25 16.53C16.74 16.45 17.75 15.92 17.96 15.32C18.17 14.73 18.17 14.22 18.1 14.12C18.04 14.01 17.88 13.95 17.64 13.83C17.39 13.71 16.18 13.12 15.96 13.04C15.73 12.95 15.57 12.91 15.4 13.16C15.24 13.41 14.76 13.95 14.62 14.12C14.48 14.28 14.33 14.3 14.09 14.18C13.85 14.06 12.83 13.72 11.63 12.65C10.7 11.82 10.07 10.79 9.94 10.55C9.82 10.31 9.93 10.17 10.05 10.05C10.16 9.94 10.3 9.75 10.43 9.61C10.55 9.46 10.6 9.36 10.68 9.19C10.76 9.03 10.72 8.88 10.66 8.76C10.6 8.64 10.11 7.43 9.9 6.94C9.7 6.45 9.5 6.52 9.35 6.51C9.21 6.51 9.04 6.51 8.88 6.51L9.53 7.03Z"/>
              </svg>
              <span>WhatsApp Department Coordinator</span>
            </a>
          </div>

          {/* Coordinator Direct Line Text */}
          <div className="conversion-footer-row">
            <span className="coordinator-call-line">
              Or call clinical secretary directly: <strong>{CLINICAL_DOCTOR_INFO.secretaryPhone}</strong> (09:00 AM – 04:00 PM IST)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
