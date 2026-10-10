import React, { useEffect, useRef, useState } from 'react';
import { trackCtaClick } from '../utils/analytics';

export interface GulfRouteMinimalProps {
  onRequestSecondOpinion: () => void;
}

export const GulfRouteMinimal: React.FC<GulfRouteMinimalProps> = ({
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
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const geographicLocations = [
    { name: 'Kerala', hub: 'Clinical Base · Aster Medcity' },
    { name: 'United Arab Emirates', hub: 'Direct Tele-Review' },
    { name: 'Saudi Arabia', hub: 'Direct Tele-Review' },
    { name: 'Qatar', hub: 'Direct Tele-Review' },
    { name: 'Kuwait', hub: 'Direct Tele-Review' },
    { name: 'Bahrain', hub: 'Direct Tele-Review' },
    { name: 'Oman', hub: 'Direct Tele-Review' },
  ];

  const handleCtaClick = () => {
    trackCtaClick('gulf_route_cta', 'Request a Second Opinion (Gulf Remote)');
    onRequestSecondOpinion();
  };

  return (
    <section
      id="gulf-care"
      ref={sectionRef}
      className={`gulf-route-minimal-section ${inView ? 'is-revealed' : ''}`}
      aria-label="Remote Second Opinions for Regional and Gulf Patients"
    >
      <div className="editorial-container">
        <header className="gulf-route-header">
          <span className="editorial-gold-kicker">CROSS-BORDER CLINICAL ACCESS</span>
          <h2 className="gulf-route-title">
            <span className="route-line-break">SECOND OPINIONS,</span>
            <span className="route-line-break">WHEREVER YOU ARE.</span>
          </h2>
          <p className="gulf-route-supporting">
            Patients can share their medical information remotely for review.
          </p>
        </header>

        {/* Refined Horizontal Geographic Route / Line */}
        <div className="gulf-route-canvas" aria-label="Geographic connectivity line">
          <div className="gulf-route-track-bg" aria-hidden="true" />
          <div className="gulf-route-track-animated" aria-hidden="true" />

          <div className="gulf-route-nodes-row">
            {geographicLocations.map((loc, index) => (
              <div key={loc.name} className="gulf-route-node-item" style={{ animationDelay: `${index * 120}ms` }}>
                <div className="route-node-pin">
                  <span className="node-dot" />
                  <span className="node-pulse" />
                </div>
                <span className="node-location-name">{loc.name}</span>
                <span className="node-location-hub">{loc.hub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="gulf-route-action-wrap">
          <button
            type="button"
            className="monument-primary-btn"
            onClick={handleCtaClick}
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
