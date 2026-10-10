import React, { useEffect, useRef, useState } from 'react';
import { trackCtaClick } from '../utils/analytics';

export interface FinalManifestoCTAProps {
  onRequestSecondOpinion: () => void;
}

export const FinalManifestoCTA: React.FC<FinalManifestoCTAProps> = ({
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleRequestClick = () => {
    trackCtaClick('final_manifesto_cta', 'Request a Second Opinion (Closing)');
    onRequestSecondOpinion();
  };

  return (
    <section
      ref={sectionRef}
      className={`final-manifesto-section ${inView ? 'is-revealed' : ''}`}
      aria-label="Closing Second Opinion Call to Action"
    >
      <div className="editorial-container">
        <div className="manifesto-inner-wrap">
          <div className="manifesto-gold-line-top" aria-hidden="true" />

          <h2 className="manifesto-huge-heading">
            <span className="manifesto-line">FROM FEAR TO HOPE.</span>
            <span className="manifesto-line">FROM CONFUSION TO CLARITY.</span>
          </h2>

          <p className="manifesto-minimal-text">
            Understand your options before deciding what comes next.
          </p>

          <div className="manifesto-action-row">
            <button
              type="button"
              className="manifesto-primary-btn"
              onClick={handleRequestClick}
            >
              <span>REQUEST A SECOND OPINION</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="manifesto-gold-line-bottom" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
