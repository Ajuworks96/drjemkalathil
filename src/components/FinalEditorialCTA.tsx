import React from 'react';
import { Button } from './Button';

export interface FinalEditorialCTAProps {
  onRequestSecondOpinion: () => void;
}

export const FinalEditorialCTA: React.FC<FinalEditorialCTAProps> = ({ onRequestSecondOpinion }) => {
  return (
    <section className="final-editorial-monument" aria-labelledby="final-cta-heading">
      <div className="editorial-container">
        <div className="final-monument-inner">
          {/* Subtle Top Marker */}
          <div className="final-marker-row">
            <span className="final-marker-text">HOPE & CLARITY · SURGICAL ONCOLOGY</span>
          </div>

          {/* Monumental Impact Statement */}
          <h2 id="final-cta-heading" className="final-impact-headline">
            YOU DON'T HAVE TO<br />
            NAVIGATE A COMPLEX<br />
            CANCER DIAGNOSIS ALONE.
          </h2>

          <div className="final-triad-statement">
            <span className="triad-item">Understand your options.</span>
            <span className="triad-sep" aria-hidden="true">·</span>
            <span className="triad-item">Ask the right questions.</span>
            <span className="triad-sep" aria-hidden="true">·</span>
            <span className="triad-item highlight-clarity">Move forward with clarity.</span>
          </div>

          <div className="final-action-wrap">
            <Button
              variant="primary"
              size="lg"
              className="final-cta-button"
              onClick={onRequestSecondOpinion}
              aria-label="Request an independent second opinion consultation"
            >
              <span>Request a Second Opinion</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          <div className="final-discreet-footnote">
            Direct surgical second opinion under Dr. Jem Kalathil · Quaternary Surgical Care, Aster Medcity Kochi
          </div>
        </div>
      </div>
    </section>
  );
};
