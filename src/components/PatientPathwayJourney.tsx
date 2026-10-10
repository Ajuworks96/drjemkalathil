import React, { useEffect, useRef, useState } from 'react';

export const PatientPathwayJourney: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Progressively activate numbers as the line draws
          setTimeout(() => setActiveStep(1), 300);
          setTimeout(() => setActiveStep(2), 900);
          setTimeout(() => setActiveStep(3), 1500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pathwaySteps = [
    {
      num: '01',
      title: 'SHARE YOUR CASE',
      detail: 'Provide initial diagnosis details, prior surgical history, and specific questions.',
    },
    {
      num: '02',
      title: 'UPLOAD YOUR RECORDS',
      detail: 'Securely transfer pathology biopsies, CT/PET scans, and clinical discharge summaries.',
    },
    {
      num: '03',
      title: 'RECEIVE A RESPONSE',
      detail: 'Direct specialist assessment on surgical viability and clear recommendations within 48 hours.',
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`patient-pathway-journey ${inView ? 'is-in-view' : ''}`}
      aria-label="Clinical Pathway: How It Works"
    >
      <div className="editorial-container">
        <header className="pathway-section-header">
          <span className="editorial-gold-kicker">CLINICAL PATHWAY</span>
          <h2 className="pathway-main-heading">HOW IT WORKS</h2>
        </header>

        {/* Horizontal Clinical Pathway with progressively drawing line */}
        <div className="pathway-horizontal-track">
          {/* Connecting Background Hairline */}
          <div className="pathway-connecting-base" aria-hidden="true" />
          
          {/* Animated Drawing Line (Left to Right) */}
          <div
            className="pathway-drawing-line"
            style={{
              width: activeStep === 0 ? '0%' : activeStep === 1 ? '33%' : activeStep === 2 ? '66%' : '100%',
            }}
            aria-hidden="true"
          />

          {/* Three Sequential Clinical Stations */}
          <div className="pathway-stations-row">
            {pathwaySteps.map((step, idx) => {
              const stepIndex = idx + 1;
              const isActive = activeStep >= stepIndex;

              return (
                <div
                  key={step.num}
                  className={`pathway-station ${isActive ? 'station-active' : 'station-inactive'}`}
                >
                  <div className="station-indicator-wrap">
                    <span className="station-number">{step.num}</span>
                    <span className="station-node-dot" aria-hidden="true" />
                  </div>

                  <h3 className="station-title">{step.title}</h3>
                  <p className="station-detail">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
