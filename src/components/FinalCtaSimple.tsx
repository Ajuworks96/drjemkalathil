import React from 'react';
import { trackCtaClick } from '../utils/analytics';

export interface FinalCtaSimpleProps {
  onRequestSecondOpinion: () => void;
}

export const FinalCtaSimple: React.FC<FinalCtaSimpleProps> = ({ onRequestSecondOpinion }) => {
  const handleRequestClick = () => {
    trackCtaClick('final_cta_section', 'Request a Second Opinion (Final CTA)');
    onRequestSecondOpinion();
  };

  return (
    <section className="simple-final-cta-section" aria-label="Closing Second Opinion Call to Action">
      <div className="simple-final-container">
        <h2 className="simple-final-heading">
          FROM FEAR TO HOPE.<br />
          FROM CONFUSION TO CLARITY.
        </h2>

        <p className="simple-final-lead">
          Understand your options before deciding what comes next.
        </p>

        <div className="simple-final-action">
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
