import React from 'react';
import { WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';
import { trackCtaClick } from '../utils/analytics';

export interface SecondOpinionSectionProps {
  onRequestSecondOpinion: () => void;
}

export const SecondOpinionSection: React.FC<SecondOpinionSectionProps> = ({ onRequestSecondOpinion }) => {
  const cleanPhone = WHATSAPP_COORDINATOR_NUMBER.replace(/[^\d+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
    'Hello, I would like to request an oncology second opinion review with Dr. Jem Kalathil.'
  )}`;

  const handleRequestClick = () => {
    trackCtaClick('section_second_opinion', 'Request a Second Opinion');
    onRequestSecondOpinion();
  };

  const handleWhatsAppClick = () => {
    trackCtaClick('section_second_opinion_whatsapp', 'WhatsApp Department Coordinator');
  };

  return (
    <section id="second-opinion" className="simple-opinion-section" aria-label="Second Opinion Main Conversion">
      <div className="simple-opinion-container">
        <div className="simple-opinion-badge-wrap">
          <span className="simple-opinion-kicker">INDEPENDENT ONCOLOGY REVIEW</span>
        </div>

        <h2 className="simple-opinion-headline">GET A SECOND OPINION</h2>

        <p className="simple-opinion-lead">
          A complex cancer diagnosis can raise difficult questions.<br />
          Before making a major treatment decision, understand your diagnosis and possible options 
          with an independent surgical oncology review.
        </p>

        {/* 48-Hour Response Commitment Monument */}
        <div className="simple-commitment-card">
          <div className="simple-commitment-content">
            <span className="simple-commitment-tag">CLINICAL RESPONSE PROTOCOL</span>
            <h3 className="simple-commitment-title">48-HOUR RESPONSE COMMITMENT</h3>
            <p className="simple-commitment-desc">
              Once your diagnostic records and imaging are submitted, our surgical team reviews 
              your dossier and provides clear clinical direction within 48 hours.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="simple-opinion-actions">
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

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="simple-btn-secondary"
            onClick={handleWhatsAppClick}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>WhatsApp the Department Coordinator</span>
          </a>
        </div>
      </div>
    </section>
  );
};
