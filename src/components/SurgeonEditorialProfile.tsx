import React, { useEffect, useRef, useState } from 'react';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';
import { trackCtaClick } from '../utils/analytics';

export interface SurgeonEditorialProfileProps {
  onRequestSecondOpinion: () => void;
}

export const SurgeonEditorialProfile: React.FC<SurgeonEditorialProfileProps> = ({
  onRequestSecondOpinion,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [showFullCredentials, setShowFullCredentials] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCtaClick = () => {
    trackCtaClick('meet_dr_jem_editorial_cta', 'Meet Dr. Jem Kalathil');
    onRequestSecondOpinion();
  };

  return (
    <section
      id="surgeon"
      ref={sectionRef}
      className={`surgeon-editorial-section ${inView ? 'is-revealed' : ''}`}
      aria-label="Surgeon Profile: Dr. Jem Kalathil"
    >
      <div className="editorial-container">
        <div className="surgeon-editorial-grid">
          {/* Large Authentic Portrait Column (Not inside a card) */}
          <div className="surgeon-portrait-column">
            <div className="surgeon-portrait-canvas">
              <img
                src="/images/dr_jem_kalathil.jpg"
                alt="Dr. Jem Kalathil, Senior Consultant Surgical Oncologist at Aster Medcity"
                className="surgeon-portrait-img"
                loading="lazy"
              />
              <div className="portrait-gold-edge" aria-hidden="true" />
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="surgeon-editorial-copy">
            {/* Subtle Gold Vertical Rule with Headline */}
            <div className="surgeon-headline-block">
              <div className="surgeon-gold-vertical-rule" aria-hidden="true" />
              <div className="surgeon-headline-wrap">
                <span className="editorial-gold-kicker">SURGICAL LEADERSHIP</span>
                <h2 className="surgeon-editorial-headline">
                  EXPERTISE MATTERS.<br />
                  UNDERSTANDING MATTERS TOO.
                </h2>
              </div>
            </div>

            {/* Doctor Identity */}
            <div className="surgeon-identity-meta">
              <h3 className="surgeon-full-name">{CLINICAL_DOCTOR_INFO.name}</h3>
              <p className="surgeon-clinical-role">
                Surgical Oncologist<br />
                <span className="surgeon-hospital">{CLINICAL_DOCTOR_INFO.hospital}</span>
              </p>
            </div>

            {/* Narrative & Concise Credentials */}
            <div className="surgeon-narrative-block">
              <p className="surgeon-lead-prose">
                With over 25 years of specialized oncological practice, Dr. Jem Kalathil focuses on high-complexity
                malignancies where meticulous surgical planning, complete margin clearance, and thoughtful tissue
                preservation make the difference between uncertainty and long-term recovery.
              </p>

              <div className="surgeon-concise-credentials">
                <div className="cred-bullet-item">
                  <span className="cred-bullet-marker" aria-hidden="true">—</span>
                  <span className="cred-bullet-text">Fellow of the Royal College of Surgeons (FRCS), Edinburgh</span>
                </div>
                <div className="cred-bullet-item">
                  <span className="cred-bullet-marker" aria-hidden="true">—</span>
                  <span className="cred-bullet-text">Former Professor of Surgical Oncology, Regional Cancer Centre (RCC)</span>
                </div>
                <div className="cred-bullet-item">
                  <span className="cred-bullet-marker" aria-hidden="true">—</span>
                  <span className="cred-bullet-text">Former Senior Consultant, Breast Unit, Royal Hospital Muscat</span>
                </div>
              </div>

              {showFullCredentials && (
                <div className="surgeon-expanded-fellowships">
                  <p className="fellowship-note">
                    Trained in advanced cytoreductive peritonectomy and heated intraperitoneal chemotherapy (HIPEC)
                    with international observerships across the United Kingdom and Europe. Overseeing multidisciplinary
                    tumor board reviews at Aster Medcity.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="surgeon-action-cluster">
              <button
                type="button"
                className="surgeon-primary-action-btn"
                onClick={handleCtaClick}
              >
                <span>MEET DR. JEM KALATHIL</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                type="button"
                className="surgeon-credentials-toggle-btn"
                onClick={() => setShowFullCredentials(!showFullCredentials)}
              >
                <span>{showFullCredentials ? 'Less Details' : 'View Clinical Qualifications'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
