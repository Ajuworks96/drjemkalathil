import React, { useState } from 'react';
import { Button } from './Button';

export interface EditorialSectionProps {
  onRequestSecondOpinion: () => void;
}

interface ProgressionPillar {
  phase: string;
  keyword: string;
  summary: string;
  clarityOutcome: string;
}

const PROGRESSION_PHASES: ProgressionPillar[] = [
  {
    phase: '01',
    keyword: 'UNDERSTAND',
    summary: 'The true biological behavior, histological subtype, and genomic receptor status of the tumor.',
    clarityOutcome: 'Confirming whether systemic downstaging should precede surgery.',
  },
  {
    phase: '02',
    keyword: 'REVIEW',
    summary: 'Cross-sectional high-resolution DICOM scans and tissue margin boundaries millimeter by millimeter.',
    clarityOutcome: 'Verifying vascular clearances and true resectability status.',
  },
  {
    phase: '03',
    keyword: 'QUESTION',
    summary: 'Whether radical organ removal can be substituted with precision tissue-preserving oncoplastic alternatives.',
    clarityOutcome: 'Preventing unnecessary total mastectomies or limb amputations.',
  },
  {
    phase: '04',
    keyword: 'DECIDE',
    summary: 'Armed with an objective written surgical roadmap, unclouded by commercial pressure or clinical haste.',
    clarityOutcome: 'Proceeding with peace of mind—at Aster Medcity or locally.',
  },
];

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onRequestSecondOpinion }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  return (
    <section id="philosophy" className="editorial-statement-section" aria-labelledby="safeguard-headline">
      <div className="editorial-container">
        {/* Editorial Sub-Label & Horizontal Hairline */}
        <div className="editorial-eyebrow-row">
          <span className="editorial-badge-label">SECOND OPINION</span>
          <span className="editorial-rule-gold" aria-hidden="true" />
          <span className="editorial-meta-tag">CLINICAL SAFEGUARD PROTOCOL</span>
        </div>

        {/* Heroic Typographic Dominance */}
        <div className="editorial-manifesto-block">
          <h2 id="safeguard-headline" className="editorial-statement-headline">
            <span className="statement-line">A second opinion is not disloyalty.</span>
            <span className="statement-line emphasis-accent">It is an essential oncological safeguard.</span>
          </h2>
        </div>

        {/* Asymmetrical Editorial Composition: Narrative + Spatial Progression */}
        <div className="editorial-narrative-split">
          <div className="editorial-voice-column">
            <p className="editorial-lead-prose">
              The days following a biopsy are often overwhelmed by shock, urgent advice, and irreversible choices. Patients are told that surgery must take place tomorrow.
            </p>
            <p className="editorial-body-prose">
              Yet in 25 years of specialized surgical oncology, we know that taking 3 to 5 days to confirm histological receptors, re-examine scan boundaries, and explore organ preservation does not compromise curative outcomes. It protects both life and enduring dignity.
            </p>
            <div className="editorial-cta-wrap">
              <Button
                variant="primary"
                size="lg"
                className="editorial-action-btn"
                onClick={onRequestSecondOpinion}
              >
                <span>Request a Second Opinion</span>
                <svg className="editorial-btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <span className="editorial-cta-footnote">
                Reviewed directly by Dr. Jem Kalathil within 24–48 hours
              </span>
            </div>
          </div>

          {/* Continuous Typographic Progression (NOT Cards) */}
          <div className="editorial-progression-suite" role="region" aria-label="Four Pillars of Clinical Clarity">
            <div className="progression-suite-header">
              <span className="progression-suite-title">THE ARCHITECTURE OF CLARITY</span>
              <span className="progression-suite-sub">SELECT A PHASE TO EXAMINE THE CLINICAL SAFEGUARD</span>
            </div>

            <div className="progression-phases-list">
              {PROGRESSION_PHASES.map((item, index) => {
                const isActive = activePhaseIndex === index;
                return (
                  <div
                    key={item.keyword}
                    className={`progression-phase-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActivePhaseIndex(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActivePhaseIndex(index);
                      }
                    }}
                    aria-expanded={isActive}
                  >
                    <div className="phase-row-headline">
                      <span className="phase-num">{item.phase}</span>
                      <span className="phase-keyword">{item.keyword}</span>
                      <span className="phase-active-glyph" aria-hidden="true">
                        {isActive ? '—' : '+'}
                      </span>
                    </div>

                    <div className="phase-row-content">
                      <p className="phase-summary-text">{item.summary}</p>
                      {isActive && (
                        <div className="phase-clarity-outcome">
                          <span className="outcome-label">Clinical Outcome:</span>
                          <span className="outcome-val">{item.clarityOutcome}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
