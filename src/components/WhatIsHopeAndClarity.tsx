import React from 'react';

export const WhatIsHopeAndClarity: React.FC = () => {
  return (
    <section id="about-concept" className="simple-concept-section" aria-label="What Hope and Clarity Is">
      <div className="simple-concept-container">
        <span className="simple-concept-label">HOPE & CLARITY</span>
        
        <h2 className="simple-concept-heading">
          WHEN THE DIAGNOSIS IS COMPLEX,<br className="desktop-break" />
          CLARITY MATTERS.
        </h2>

        <p className="simple-concept-lead">
          Hope & Clarity helps patients and families understand complex cancer diagnoses 
          and explore their treatment options before making important decisions.
        </p>

        <div className="simple-concept-divider" aria-hidden="true" />

        <p className="simple-concept-quote">
          “From fear to hope.<br />
          From confusion to clarity.”
        </p>
      </div>
    </section>
  );
};
