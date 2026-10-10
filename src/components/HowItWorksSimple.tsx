import React from 'react';
import { SIMPLE_HOW_IT_WORKS } from '../constants/content';

export const HowItWorksSimple: React.FC = () => {
  return (
    <section id="how-it-works" className="simple-steps-section" aria-label="How the Second Opinion Process Works">
      <div className="simple-steps-container">
        <header className="simple-steps-header">
          <span className="simple-section-tag">CLINICAL PATHWAY</span>
          <h2 className="simple-steps-title">HOW IT WORKS</h2>
        </header>

        <div className="simple-steps-flow">
          <div className="simple-steps-axis" aria-hidden="true" />

          <div className="simple-steps-grid">
            {SIMPLE_HOW_IT_WORKS.map((step) => (
              <div key={step.number} className="simple-step-item">
                <div className="simple-step-num-wrap">
                  <span className="simple-step-num">{step.number}</span>
                </div>
                <h3 className="simple-step-heading">{step.title}</h3>
                <p className="simple-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
