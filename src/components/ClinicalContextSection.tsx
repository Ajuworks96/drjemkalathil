import React from 'react';

export const ClinicalContextSection: React.FC = () => {
  return (
    <section className="editorial-context-section" aria-labelledby="context-heading">
      <div className="editorial-container">
        {/* Eyebrow Label */}
        <div className="context-eyebrow-row">
          <span className="context-eyebrow-num">08</span>
          <span className="context-eyebrow-line" aria-hidden="true" />
          <span className="context-eyebrow-tag">CLINICAL CONTEXT</span>
        </div>

        <div className="context-editorial-grid">
          {/* Left Column: Towering Editorial Title & Narrative */}
          <div className="context-narrative-col">
            <h2 id="context-heading" className="context-headline">
              A Quaternary Surgical Environment Built for Uncompromising Oncology
            </h2>

            <p className="context-lead-text">
              Dr. Jem Kalathil directs the Department of Surgical Oncology at Aster Medcity, Kochi—a JCI-accredited quaternary medical institution situated along the tranquil Cheranallur backwaters in Kerala.
            </p>

            <p className="context-body-text">
              High-complexity procedures—such as multi-compartment peritonectomies with heated chemotherapy (HIPEC), compartmental retroperitoneal sarcoma clearances, and robotic oncological resections—cannot be performed safely in isolation. They require an entire ecosystem of multidisciplinary precision.
            </p>

            {/* Editorial Benchmark Points with Hairline Dividers (NO CARDS) */}
            <div className="context-benchmarks-list">
              <div className="benchmark-row">
                <span className="benchmark-num">01</span>
                <div className="benchmark-info">
                  <h3 className="benchmark-title">Joint Commission International (JCI) Accredited</h3>
                  <p className="benchmark-desc">Rigorous global benchmarks for surgical safety, infection control, and clinical outcome monitoring.</p>
                </div>
              </div>

              <div className="benchmark-row">
                <span className="benchmark-num">02</span>
                <div className="benchmark-info">
                  <h3 className="benchmark-title">Dedicated Perfusion & Robotic Suites</h3>
                  <p className="benchmark-desc">Specialized closed-circuit hyperthermic pump consoles and 3D daVinci Xi robotic surgical consoles.</p>
                </div>
              </div>

              <div className="benchmark-row">
                <span className="benchmark-num">03</span>
                <div className="benchmark-info">
                  <h3 className="benchmark-title">Multidisciplinary Onco-Tumor Board</h3>
                  <p className="benchmark-desc">Weekly collaborative case reviews uniting surgical oncologists, medical oncologists, onco-radiologists, and pathologists.</p>
                </div>
              </div>

              <div className="benchmark-row">
                <span className="benchmark-num">04</span>
                <div className="benchmark-info">
                  <h3 className="benchmark-title">Specialized Surgical ICU (SICU)</h3>
                  <p className="benchmark-desc">24/7 dedicated critical-care intensivist management following prolonged cytoreductive or reconstructive interventions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography */}
          <div className="context-visual-col">
            <div className="context-image-wrapper">
              <img
                src="/images/aster_medcity_campus.jpg"
                alt="Aster Medcity quaternary hospital campus along the Cheranallur waterfront in Kochi"
                className="context-campus-image"
              />
              <div className="context-caption-strip">
                <span className="caption-tag">ASTER MEDCITY · KOCHI, KERALA</span>
                <span className="caption-sub">A serene, waterfront healing campus engineered for world-class surgical oncology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
