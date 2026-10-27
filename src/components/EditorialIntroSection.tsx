import React, { useEffect, useRef, useState } from 'react';

export const EditorialIntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-concept"
      ref={sectionRef}
      className={`editorial-intro-chapter ${isVisible ? 'is-revealed' : ''}`}
      aria-label="Hope and Clarity Introduction"
    >
      <div className="editorial-intro-container">
        {/* Small gold label */}
        <div className="editorial-intro-tag-wrap">
          <span className="editorial-intro-gold-tag">HOPE & CLARITY</span>
        </div>

        {/* Large headline with line-by-line reveal */}
        <h2 className="editorial-intro-headline">
          <span className="headline-line headline-line-1">When the Diagnosis Is Complex,</span>
          <span className="headline-line headline-line-2">Clarity Matters.</span>
        </h2>

        {/* Short 2-3 line paragraph */}
        <p className="editorial-intro-paragraph">
          A cancer diagnosis carries an overwhelming weight of urgency, complex clinical terms, and high-stakes choices.
          Before committing to irreversible surgery or demanding treatment regimens, patients and families deserve
          unhurried clarity, objective clinical validation, and compassionate insight.
        </p>

        {/* Elegant smaller statement */}
        <div className="editorial-intro-quote-wrap">
          <p className="editorial-intro-quote">
            “From fear to hope.<br />
            From confusion to clarity.”
          </p>
        </div>

        {/* Subtle horizontal gold rule that animates from 0 -> 100% */}
        <div className="editorial-intro-gold-rule-wrap" aria-hidden="true">
          <div className="editorial-intro-gold-rule" />
        </div>
      </div>
    </section>
  );
};
