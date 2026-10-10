import React from 'react';
import { trackCtaClick } from '../utils/analytics';

export interface GulfRemoteSectionProps {
  onRequestSecondOpinion: () => void;
}

export const GulfRemoteSection: React.FC<GulfRemoteSectionProps> = ({ onRequestSecondOpinion }) => {
  const gulfCountries = [
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Kuwait',
    'Bahrain',
    'Oman',
  ];

  const handleRequestClick = () => {
    trackCtaClick('section_gulf_remote', 'Request a Second Opinion (Gulf / Remote)');
    onRequestSecondOpinion();
  };

  return (
    <section id="gulf-care" className="simple-gulf-section" aria-label="Remote Second Opinions for Gulf Patients">
      <div className="simple-gulf-container">
        <header className="simple-gulf-header">
          <span className="simple-section-tag">REMOTE CLINICAL REVIEW</span>
          <h2 className="simple-gulf-heading">
            SECOND OPINIONS,<br />
            WHEREVER YOU ARE.
          </h2>
        </header>

        <p className="simple-gulf-lead">
          For patients across Kerala and the Arabian Gulf, medical records and imaging scans 
          can be securely submitted for independent evaluation before making travel 
          or surgical decisions.
        </p>

        {/* Clean typographic list of countries - No cards, no flags, no complicated maps */}
        <div className="simple-gulf-countries-row">
          {gulfCountries.map((country, idx) => (
            <React.Fragment key={country}>
              <span className="simple-gulf-country">{country}</span>
              {idx < gulfCountries.length - 1 && (
                <span className="simple-gulf-bullet" aria-hidden="true">·</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="simple-gulf-action">
          <button
            type="button"
            className="simple-btn-primary"
            onClick={handleRequestClick}
          >
            <span>REQUEST A SECOND OPINION</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
