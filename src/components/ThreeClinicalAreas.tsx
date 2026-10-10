import React from 'react';
import { SIMPLE_CLINICAL_AREAS } from '../constants/content';
import { trackCtaClick } from '../utils/analytics';

export interface ThreeClinicalAreasProps {
  onRequestSecondOpinion: (domainId?: string) => void;
}

export const ThreeClinicalAreas: React.FC<ThreeClinicalAreasProps> = ({ onRequestSecondOpinion }) => {
  const handleExplore = (domainId: string, title: string) => {
    trackCtaClick(`clinical_area_${domainId}`, `Explore: ${title}`);
    onRequestSecondOpinion(domainId);
  };

  return (
    <section id="clinical-areas" className="simple-areas-section" aria-label="Areas of Clinical Focus">
      <div className="simple-areas-container">
        <header className="simple-areas-header">
          <span className="simple-section-tag">SPECIALIST DISCIPLINES</span>
          <h2 className="simple-areas-title">AREAS OF CLINICAL FOCUS</h2>
        </header>

        <div className="simple-areas-list">
          {SIMPLE_CLINICAL_AREAS.map((area, index) => (
            <article key={area.domainId} className="simple-area-row">
              <div className="simple-area-grid">
                {/* Visual Image Column */}
                <div className="simple-area-media">
                  <div className="simple-area-image-frame">
                    <img
                      src={area.imageSrc}
                      alt={area.imageAlt}
                      className="simple-area-image"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className="simple-area-content">
                  <span className="simple-area-number" aria-hidden="true">{area.number}</span>
                  <h3 className="simple-area-name">{area.title}</h3>

                  <div className="simple-area-specialties">
                    {area.specialties.map((spec, i) => (
                      <span key={spec} className="simple-area-subtopic">
                        {spec}
                        {i < area.specialties.length - 1 && <span className="simple-bullet">·</span>}
                      </span>
                    ))}
                  </div>

                  <p className="simple-area-description">{area.description}</p>

                  <div className="simple-area-action">
                    <button
                      type="button"
                      className="simple-area-cta"
                      onClick={() => handleExplore(area.domainId, area.title)}
                    >
                      <span>Explore</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {index < SIMPLE_CLINICAL_AREAS.length - 1 && (
                <div className="simple-row-divider" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
