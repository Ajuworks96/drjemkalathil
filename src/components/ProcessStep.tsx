import React, { useState } from 'react';
import { PROCESS_STEPS } from '../constants/content';

export const ProcessStep: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section id="journey" className="editorial-journey-section" aria-labelledby="journey-main-heading">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="journey-header-block">
          <div className="journey-eyebrow">
            <span className="journey-eyebrow-num">03</span>
            <span className="journey-eyebrow-divider" aria-hidden="true" />
            <span className="journey-eyebrow-label">CLINICAL METHODOLOGY & NAVIGATION</span>
          </div>

          <h2 id="journey-main-heading" className="journey-display-headline">
            HOW WE REVIEW<br />AND NAVIGATE YOUR CASE
          </h2>

          <p className="journey-lead-statement">
            A second opinion is not an algorithm. It is a systematic surgical investigation conducted with clinical patience, independent scrutiny, and complete anatomical transparency.
          </p>
        </div>

        {/* Continuous Editorial Timeline Track with Connecting Line */}
        <div className="journey-editorial-track" role="region" aria-label="Four Stages of Case Review">
          <div className="journey-connecting-spine" aria-hidden="true">
            <div
              className="journey-spine-progress"
              style={{ width: `${((activeStepIndex + 1) / PROCESS_STEPS.length) * 100}%` }}
            />
          </div>

          <div className="journey-steps-row">
            {PROCESS_STEPS.map((step, index) => {
              const isActive = activeStepIndex === index;
              const isPast = activeStepIndex > index;

              return (
                <div
                  key={step.stepNumber}
                  className={`journey-stage-node ${isActive ? 'is-active' : ''} ${isPast ? 'is-passed' : ''}`}
                  onClick={() => setActiveStepIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStepIndex(index);
                    }
                  }}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {/* Elegant Large Numeral & Line Node */}
                  <div className="stage-marker-area">
                    <span className="stage-num-editorial">{step.stepNumber}</span>
                    <span className="stage-node-dot" aria-hidden="true" />
                  </div>

                  {/* Stage Headline & Timing */}
                  <div className="stage-text-block">
                    <span className="stage-timeline-badge">{step.timeline}</span>
                    <h3 className="stage-title">{step.title}</h3>
                    <p className="stage-summary-text">{step.summary}</p>

                    {/* Stage Detail Reveal */}
                    <div className="stage-action-note">
                      <div className="stage-action-item">
                        <span className="action-tag">Clinical Output:</span>
                        <span className="action-desc">{step.clinicalOutput}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Journey Footnote / Assurance */}
        <div className="journey-footer-meta">
          <div className="journey-meta-line" aria-hidden="true" />
          <div className="journey-meta-content">
            <span className="meta-tag-highlight">OBJECTIVE CLINICAL AUTONOMY</span>
            <p className="meta-desc">
              At no point in this journey is there any pressure to undergo surgery at Aster Medcity. The written roadmap is yours to discuss with your family and proceed with your treating surgical team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
