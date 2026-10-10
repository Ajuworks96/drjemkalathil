import React from 'react';
import { trackCtaClick } from '../utils/analytics';

export interface DocumentTeaserSectionProps {
  onRequestSecondOpinion: () => void;
}

export const DocumentTeaserSection: React.FC<DocumentTeaserSectionProps> = ({
  onRequestSecondOpinion,
}) => {
  const handleClick = () => {
    trackCtaClick('document_teaser_cta', 'Start Your Second Opinion');
    onRequestSecondOpinion();
  };

  return (
    <section className="document-teaser-strip" aria-label="Medical Records Upload Teaser">
      <div className="editorial-container">
        <div className="document-teaser-card">
          <div className="teaser-left">
            <span className="teaser-gold-kicker">SECURE RECORD SUBMISSION</span>
            <h3 className="teaser-headline">READY TO SHARE YOUR CASE?</h3>
            <p className="teaser-body">
              Upload reports, scans, prescriptions and clinical notes through our secure second-opinion form.
            </p>
          </div>

          <div className="teaser-right">
            <button
              type="button"
              className="teaser-cta-button"
              onClick={handleClick}
            >
              <span>START YOUR SECOND OPINION</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
