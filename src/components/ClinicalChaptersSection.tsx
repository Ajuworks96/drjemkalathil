import React, { useEffect, useRef, useState } from 'react';
import { trackCtaClick } from '../utils/analytics';

export interface ClinicalChaptersSectionProps {
  onRequestSecondOpinion: (domainId?: string) => void;
}

export const ClinicalChaptersSection: React.FC<ClinicalChaptersSectionProps> = ({
  onRequestSecondOpinion,
}) => {
  const ch1Ref = useRef<HTMLElement>(null);
  const ch2Ref = useRef<HTMLElement>(null);
  const ch3Ref = useRef<HTMLElement>(null);

  const [ch1Visible, setCh1Visible] = useState(false);
  const [ch2Visible, setCh2Visible] = useState(false);
  const [ch3Visible, setCh3Visible] = useState(false);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCh1Visible(true);
      },
      { threshold: 0.2 }
    );
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCh2Visible(true);
      },
      { threshold: 0.2 }
    );
    const observer3 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCh3Visible(true);
      },
      { threshold: 0.15 }
    );

    if (ch1Ref.current) observer1.observe(ch1Ref.current);
    if (ch2Ref.current) observer2.observe(ch2Ref.current);
    if (ch3Ref.current) observer3.observe(ch3Ref.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
      observer3.disconnect();
    };
  }, []);

  const handleExplore = (domainId: string, title: string) => {
    trackCtaClick(`chapter_explore_${domainId}`, `Explore Chapter: ${title}`);
    onRequestSecondOpinion(domainId);
  };

  return (
    <section id="clinical-areas" className="clinical-chapters-master" aria-label="Areas of Clinical Focus">
      {/* Editorial Section Anchor Heading */}
      <div className="editorial-container">
        <header className="chapters-master-header">
          <span className="editorial-gold-kicker">SPECIALIST CLINICAL CHAPTERS</span>
          <h2 className="chapters-master-title">AREAS OF CLINICAL FOCUS</h2>
          <div className="chapters-header-rule" aria-hidden="true" />
        </header>
      </div>

      {/* ========================================================
          CHAPTER 01: WHEN HOPE SEEMS LOST (Grid-Breaker: Image 55% / Text 45%)
          ======================================================== */}
      <article
        ref={ch1Ref}
        className={`clinical-chapter chapter-one ${ch1Visible ? 'is-revealed' : ''}`}
        aria-label="Chapter 01: When Hope Seems Lost"
      >
        <div className="editorial-container">
          <div className="ch1-asymmetric-grid">
            {/* Image (55% desktop width, breaks grid slightly) */}
            <div className="ch1-media-col">
              <div className="ch1-image-stage">
                <img
                  src="/images/surgical_theatre.jpg"
                  alt="Surgical theatre for cytoreductive peritonectomy and heated intraperitoneal chemotherapy (HIPEC)"
                  className="ch1-image"
                  loading="lazy"
                />
                <div className="ch1-image-accent-line" aria-hidden="true" />
              </div>
            </div>

            {/* Typography (45% desktop width) */}
            <div className="ch1-content-col">
              <span className="chapter-num" aria-hidden="true">01</span>
              <h3 className="ch1-heading">
                <span className="ch-line">WHEN HOPE</span>
                <span className="ch-line">SEEMS LOST</span>
              </h3>

              <div className="ch1-disciplines-list">
                <span className="discipline-tag">Peritoneal Surface Malignancies</span>
                <span className="discipline-sep" aria-hidden="true">·</span>
                <span className="discipline-tag">HIPEC</span>
                <span className="discipline-sep" aria-hidden="true">·</span>
                <span className="discipline-tag">Cytoreductive Surgery</span>
              </div>

              <div className="chapter-gold-hairline" aria-hidden="true" />

              <p className="chapter-narrative">
                For patients diagnosed with advanced peritoneal dissemination who have been told that further surgical
                intervention is impossible, complete cytoreductive surgery combined with hyperthermic intraperitoneal
                chemotherapy (HIPEC) offers a clinically verified pathway toward disease clearance and prolonged survival.
              </p>

              <div className="chapter-action-row">
                <button
                  type="button"
                  className="editorial-explore-link"
                  onClick={() => handleExplore('peritoneal-hipec', 'When Hope Seems Lost')}
                >
                  <span className="explore-text">EXPLORE</span>
                  <span className="explore-line" aria-hidden="true" />
                  <svg className="explore-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ========================================================
          CHAPTER 02: PRECISION THAT PROTECTS YOU (Image on LEFT, Text on RIGHT)
          ======================================================== */}
      <article
        ref={ch2Ref}
        className={`clinical-chapter chapter-two ${ch2Visible ? 'is-revealed' : ''}`}
        aria-label="Chapter 02: Precision That Protects You"
      >
        <div className="editorial-container">
          <div className="ch2-split-grid">
            {/* Image on LEFT */}
            <div className="ch2-media-col">
              <div className="ch2-image-stage">
                <img
                  src="/images/clinical_case_review.jpg"
                  alt="Oncoplastic breast surgery planning and multidisciplinary margin review"
                  className="ch2-image"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Typography on RIGHT */}
            <div className="ch2-content-col">
              <span className="chapter-num" aria-hidden="true">02</span>
              <h3 className="ch2-heading">
                <span className="ch-line">PRECISION</span>
                <span className="ch-line">THAT PROTECTS YOU</span>
              </h3>

              {/* Horizontal dividers between procedures */}
              <div className="ch2-procedures-stack">
                <div className="procedure-row">
                  <span className="procedure-name">Oncoplastic Breast Surgery</span>
                  <span className="procedure-role">Organ & Symmetry Preservation</span>
                </div>
                <div className="procedure-row">
                  <span className="procedure-name">Sentinel Node Biopsy</span>
                  <span className="procedure-role">Lymphatic Sparing Staging</span>
                </div>
                <div className="procedure-row">
                  <span className="procedure-name">Radio-Guided Surgery</span>
                  <span className="procedure-role">Occult Lesion Localization</span>
                </div>
                <div className="procedure-row">
                  <span className="procedure-name">Breast Reconstruction</span>
                  <span className="procedure-role">Immediate & Delayed Restorations</span>
                </div>
              </div>

              <p className="chapter-narrative">
                Eradicating breast cancer must never force a compromise between oncologic safety and personal wholeness.
                By marrying radical tumor clearance with micro-surgical reconstruction, we safeguard both life and physical
                confidence in a single surgical discipline.
              </p>

              <div className="chapter-action-row">
                <button
                  type="button"
                  className="editorial-explore-link"
                  onClick={() => handleExplore('breast-oncology', 'Precision That Protects You')}
                >
                  <span className="explore-text">EXPLORE</span>
                  <span className="explore-line" aria-hidden="true" />
                  <svg className="explore-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ========================================================
          CHAPTER 03: SURGERY AT THE FRONTIER (Cinematic Full-Width Bleed)
          ======================================================== */}
      <article
        ref={ch3Ref}
        className={`clinical-chapter chapter-three ${ch3Visible ? 'is-revealed' : ''}`}
        aria-label="Chapter 03: Surgery at the Frontier"
      >
        <div className="ch3-cinematic-stage">
          {/* Background Full-Width Image with Dark Burgundy Overlay */}
          <div className="ch3-backdrop-wrapper" aria-hidden="true">
            <img
              src="/images/robotic_oncology_frontier.jpg"
              alt=""
              className="ch3-backdrop-image"
              loading="lazy"
            />
            <div className="ch3-burgundy-overlay" />
          </div>

          {/* Text Over Image */}
          <div className="editorial-container ch3-inner-container">
            <div className="ch3-text-monument">
              <span className="ch3-num" aria-hidden="true">03</span>
              <h3 className="ch3-heading">
                <span className="ch-line">SURGERY</span>
                <span className="ch-line">AT THE</span>
                <span className="ch-line">FRONTIER</span>
              </h3>

              <div className="ch3-disciplines-row">
                <span className="ch3-spec-pill">Robotic Oncology</span>
                <span className="ch3-spec-bullet" aria-hidden="true">/</span>
                <span className="ch3-spec-pill">Minimally Invasive Cancer Surgery</span>
                <span className="ch3-spec-bullet" aria-hidden="true">/</span>
                <span className="ch3-spec-pill">Complex Resection</span>
              </div>

              <p className="ch3-description">
                Sub-millimeter articulation, 3D high-magnification optics, and wrist-guided instrumentation enable the
                complete clearance of deep pelvic and retroperitoneal tumors with reduced tissue disruption, negligible
                blood loss, and rapid functional convalescence.
              </p>

              <div className="ch3-action-wrap">
                <button
                  type="button"
                  className="editorial-explore-link ch3-explore-link"
                  onClick={() => handleExplore('sarcoma-soft-tissue', 'Surgery at the Frontier')}
                >
                  <span className="explore-text">EXPLORE</span>
                  <span className="explore-line" aria-hidden="true" />
                  <svg className="explore-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
