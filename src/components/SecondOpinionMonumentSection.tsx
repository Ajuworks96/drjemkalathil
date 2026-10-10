import React, { useEffect, useRef, useState } from 'react';
import { WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';
import { trackCtaClick } from '../utils/analytics';

export interface SecondOpinionMonumentProps {
  onRequestSecondOpinion: () => void;
}

export const SecondOpinionMonumentSection: React.FC<SecondOpinionMonumentProps> = ({
  onRequestSecondOpinion,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cleanPhone = WHATSAPP_COORDINATOR_NUMBER.replace(/[^\d+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
    'Hello, I would like to request an oncology second opinion review with Dr. Jem Kalathil.'
  )}`;

  const handleRequestClick = () => {
    trackCtaClick('monument_second_opinion_btn', 'Request a Second Opinion');
    onRequestSecondOpinion();
  };

  const handleWhatsAppClick = () => {
    trackCtaClick('monument_whatsapp_coordinator', 'WhatsApp Department Coordinator');
  };

  return (
    <section
      id="second-opinion"
      ref={sectionRef}
      className={`second-opinion-monument-fullwidth ${inView ? 'is-active-burgundy' : ''}`}
      aria-label="Second Opinion Consultation Experience"
    >
      <div className="monument-content-wrapper">
        {/* Subtle institutional provenance watermark in background */}
        <div className="monument-bg-watermark" aria-hidden="true">
          SECOND OPINION
        </div>

        {/* 48-Hour Response Commitment - Prominent Gold Accent appearing first */}
        <div className="monument-commitment-banner">
          <div className="commitment-gold-kicker">CLINICAL RESPONSE PROTOCOL</div>
          <div className="commitment-emphasis-title">
            <span className="commit-num-badge">48-HOUR</span>
            <span className="commit-label-text">RESPONSE COMMITMENT</span>
          </div>
          <p className="commitment-explanatory">
            Every submitted diagnostic dossier and imaging series is evaluated directly by our surgical oncology
            panel within 48 hours of receipt.
          </p>
        </div>

        {/* Headline reveals line-by-line */}
        <h2 className="monument-headline">
          <span className="headline-part">GET A</span>
          <span className="headline-part">SECOND OPINION</span>
        </h2>

        {/* Lead Narrative */}
        <p className="monument-sublead">
          Before making a major treatment decision,<br className="monument-desk-break" />
          understand your options clearly.
        </p>

        {/* Action Pair Entering Last */}
        <div className="monument-cta-cluster">
          <button
            type="button"
            className="monument-primary-btn"
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
            className="monument-whatsapp-btn"
            onClick={handleWhatsAppClick}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>WhatsApp the Department Coordinator</span>
          </a>
        </div>
      </div>
    </section>
  );
};
