import React, { useEffect, useRef, useState } from 'react';

export const EditorialBreathingTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      ref={containerRef}
      className={`breathing-transition-section ${inView ? 'is-revealed' : ''}`}
      aria-label="Editorial Reflection"
    >
      <div className="editorial-container">
        <div className="breathing-content">
          <blockquote className="breathing-statement">
            <span className="statement-line">“Every diagnosis is different.</span>
            <span className="statement-line">Every decision deserves context.”</span>
          </blockquote>

          {/* Thin gold line that draws underneath */}
          <div className="breathing-gold-rule-wrap" aria-hidden="true">
            <div className="breathing-gold-rule" />
          </div>
        </div>
      </div>
    </aside>
  );
};
