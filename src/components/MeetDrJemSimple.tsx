import React, { useState } from 'react';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';
import { trackCtaClick } from '../utils/analytics';

export interface MeetDrJemSimpleProps {
  onRequestSecondOpinion: () => void;
}

export const MeetDrJemSimple: React.FC<MeetDrJemSimpleProps> = ({ onRequestSecondOpinion }) => {
  const [showBioDetails, setShowBioDetails] = useState(false);

  const handleLearnMore = () => {
    setShowBioDetails(!showBioDetails);
    trackCtaClick('meet_dr_jem_learn_more', showBioDetails ? 'Hide Details' : 'Learn More');
  };

  const handleRequestClick = () => {
    trackCtaClick('meet_dr_jem_cta', 'Request Second Opinion with Dr. Jem');
    onRequestSecondOpinion();
  };

  return (
    <section id="surgeon" className="simple-doctor-section" aria-label="Meet Dr. Jem Kalathil">
      <div className="simple-doctor-container">
        <div className="simple-doctor-grid">
          {/* Authentic Portrait */}
          <div className="simple-doctor-portrait-wrap">
            <div className="simple-doctor-frame">
              <img
                src="/images/dr_jem_kalathil.jpg"
                alt="Dr. Jem Kalathil, Senior Consultant Surgical Oncologist"
                className="simple-doctor-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Editorial Content */}
          <div className="simple-doctor-info">
            <span className="simple-section-tag">THE SURGICAL TEAM</span>
            <h2 className="simple-doctor-name">MEET DR. JEM KALATHIL</h2>

            <div className="simple-doctor-roles">
              <span className="simple-doctor-title">Surgical Oncologist</span>
              <span className="simple-doctor-sep" aria-hidden="true">·</span>
              <span className="simple-doctor-hospital">{CLINICAL_DOCTOR_INFO.hospital}</span>
            </div>

            <div className="simple-doctor-specialties">
              <span className="simple-spec-label">Specialising in:</span>
              <ul className="simple-spec-list">
                <li>Peritoneal Surface Malignancies & HIPEC</li>
                <li>Oncoplastic Breast Surgery</li>
                <li>Robotic Oncology</li>
              </ul>
            </div>

            <p className="simple-doctor-ethos">
              With over 25 years of specialized oncological surgery, Dr. Jem Kalathil focuses on 
              high-complexity cases where meticulous surgical planning and tissue preservation 
              make the crucial difference between uncertainty and long-term recovery.
            </p>

            {showBioDetails && (
              <div className="simple-doctor-expanded-bio">
                <p>
                  Former Professor of Surgical Oncology at the Regional Cancer Centre (RCC), Thiruvananthapuram, 
                  and Senior Consultant at the Breast Unit, Royal Hospital, Muscat. Fellow of the Royal College 
                  of Surgeons (Edinburgh).
                </p>
              </div>
            )}

            <div className="simple-doctor-actions">
              <button
                type="button"
                className="simple-text-link-btn"
                onClick={handleLearnMore}
              >
                {showBioDetails ? 'Show Less' : 'Learn More About Dr. Jem Kalathil'}
              </button>

              <button
                type="button"
                className="simple-btn-secondary-dark"
                onClick={handleRequestClick}
              >
                <span>Request a Second Opinion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
