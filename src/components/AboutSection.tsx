import React from 'react';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="doctor-editorial-section" aria-labelledby="surgeon-editorial-heading">
      <div className="editorial-container">
        {/* Top Eyebrow */}
        <div className="surgeon-eyebrow-row">
          <span className="surgeon-eyebrow-num">07</span>
          <span className="surgeon-eyebrow-line" aria-hidden="true" />
          <span className="surgeon-eyebrow-tag">CLINICAL AUTHORITY & SURGICAL ETHOS</span>
        </div>

        {/* Monumental Dual Statement */}
        <div className="surgeon-statement-block">
          <h2 id="surgeon-editorial-heading" className="surgeon-display-statement">
            <span className="statement-line-main">EXPERTISE MATTERS.</span>
            <span className="statement-line-gold">UNDERSTANDING MATTERS TOO.</span>
          </h2>
        </div>

        {/* Asymmetrical Overlapping Portrait & Editorial Narrative (NO CARDS) */}
        <div className="surgeon-asymmetric-composition">
          {/* Left Column: Authentic Editorial Portrait */}
          <div className="surgeon-portrait-frame">
            <img
              src="/images/dr_jem_kalathil.jpg"
              alt="Dr. Jem Kalathil, Senior Consultant and Head of Surgical Oncology"
              className="surgeon-editorial-image"
            />
            <div className="surgeon-portrait-caption">
              <span className="caption-gold-mark">▪</span>
              <span className="caption-text">Dr. Jem Kalathil reviewing cross-sectional magnetic resonance scans</span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Specialized Fellowships */}
          <div className="surgeon-editorial-narrative">
            <div className="surgeon-lead-meta">
              <h3 className="surgeon-name-lead">Dr. Jem Kalathil</h3>
              <div className="surgeon-title-lead">
                Surgical Oncologist · Aster Medcity, Kochi
              </div>
              <div className="surgeon-creds-hairline">
                {CLINICAL_DOCTOR_INFO.credentials}
              </div>
            </div>

            <p className="surgeon-narrative-paragraph">
              A surgical oncologist carries a solemn responsibility: determining where radical clearance is non-negotiable, and where precision tissue preservation protects enduring human dignity.
            </p>

            <p className="surgeon-narrative-paragraph">
              With more than 25 years dedicated exclusively to complex cancer surgery, Dr. Kalathil has pioneered the clinical adoption of oncoplastic breast preservation and hyperthermic intraperitoneal chemotherapy (HIPEC) across South Asia. His approach combines the rigorous disciplinary standards of the Royal College of Surgeons with unhurried clinical empathy.
            </p>

            <div className="surgeon-quote-inset">
              <blockquote className="surgeon-quote-text">
                “Surgery in cancer is irreversible. True oncological maturity lies in knowing when aggressive resection is curative, when organ preservation is safer, and when to pause and re-evaluate the pathology before committing.”
              </blockquote>
            </div>

            {/* Academic Heritage: Presented as Refined Editorial Text (NOT CV Badges) */}
            <div className="surgeon-academic-pedigree">
              <span className="pedigree-label">CLINICAL PEDIGREE & FELLOWSHIPS</span>
              <ul className="pedigree-list">
                {CLINICAL_DOCTOR_INFO.fellowships.map((fellowship, idx) => (
                  <li key={idx} className="pedigree-item">
                    <span className="pedigree-bullet" aria-hidden="true">—</span>
                    <span className="pedigree-text">{fellowship}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
