import React, { useEffect, useRef, useState } from 'react';
import { trackCtaClick } from '../utils/analytics';
import { useSiteContent } from '../context/SiteContentContext';

export interface SurgeonEditorialProfileProps {
  onRequestSecondOpinion: () => void;
}

export const SurgeonEditorialProfile: React.FC<SurgeonEditorialProfileProps> = ({
  onRequestSecondOpinion,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [showFullCredentials, setShowFullCredentials] = useState(false);
  const { siteSettings, homeContent } = useSiteContent();

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
                alt="Dr. Jem Kalathil, Senior Consultant Surgical Oncologist"
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
                  Expertise Matters.<br />
                  Understanding Matters Too.
                </h2>
              </div>
            </div>

            {/* Doctor Identity */}
            <div className="surgeon-identity-meta">
              <h3 className="surgeon-full-name">{siteSettings.doctorName}</h3>
              <p className="surgeon-clinical-role">
                {siteSettings.doctorRole}
              </p>
            </div>

            {/* Narrative & Concise Credentials */}
            <div className="surgeon-narrative-block">
              <p className="surgeon-lead-prose">
                {homeContent.surgeonProfileBio}
              </p>

              <p className="surgeon-lead-prose" style={{ marginTop: '14px' }}>
                His practice is focused on three areas: oncoplastic breast cancer surgery and reconstruction, sentinel node biopsy and radio-guided localisation of non-palpable lesions; cytoreductive surgery with HIPEC for peritoneal surface malignancies; and robotic and complex surgery for gastrointestinal and gynaecological cancers, and extremity and retroperitoneal sarcomas.
              </p>

              <div className="surgeon-concise-credentials">
                <div className="cred-bullet-item">
                  <span className="cred-bullet-marker" aria-hidden="true">—</span>
                  <span className="cred-bullet-text">UICC Fellowship in Milan under Professor Umberto Veronesi</span>
                </div>
                <div className="cred-bullet-item">
                  <span className="cred-bullet-marker" aria-hidden="true">—</span>
                  <span className="cred-bullet-text">Former Additional Professor of Surgical Oncology, Regional Cancer Centre, Thiruvananthapuram</span>
                </div>
                <div className="cred-bullet-item">
                  <span className="cred-bullet-marker" aria-hidden="true">—</span>
                  <span className="cred-bullet-text">Heads the Aster Clinical Research Centre and is Lead Principal Investigator on clinical trials</span>
                </div>
                <div className="cred-bullet-item">
                  <span className="cred-bullet-marker" aria-hidden="true">—</span>
                  <span className="cred-bullet-text">Trained in the United Kingdom, Italy, Singapore and India</span>
                </div>
              </div>

              {showFullCredentials && (
                <div className="surgeon-expanded-fellowships">
                  <p className="fellowship-note">
                    Formerly Senior Consultant, Breast Unit, Royal Hospital, Muscat. Fellowship of the Royal College of Surgeons (FRCS), Edinburgh. Directing advanced cytoreductive surgery, radio-guided breast oncoplastic surgery, and robotic surgical oncology.
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
                <span>Meet Dr. Jem Kalathil</span>
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
