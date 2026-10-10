import React from 'react';
import { Button } from './Button';
import { EDITORIAL_CHAPTERS } from '../constants/content';

export interface ClinicalPillarProps {
  onRequestSecondOpinion: (domainId?: string) => void;
}

export const ClinicalPillar: React.FC<ClinicalPillarProps> = ({ onRequestSecondOpinion }) => {
  const pillar1 = EDITORIAL_CHAPTERS[0]; // WHEN HOPE SEEMS LOST
  const pillar2 = EDITORIAL_CHAPTERS[1]; // PRECISION THAT PROTECTS YOU
  const pillar3 = EDITORIAL_CHAPTERS[2]; // SURGERY AT THE FRONTIER

  return (
    <section id="disciplines" className="clinical-chapters-parent" aria-labelledby="disciplines-main-title">
      {/* Chapter Section Header */}
      <div className="editorial-container">
        <div className="chapters-intro-header">
          <div className="chapters-eyebrow">
            <span className="chapters-eyebrow-num">02</span>
            <span className="chapters-eyebrow-line" aria-hidden="true" />
            <span className="chapters-eyebrow-text">CLINICAL DOMAINS & SURGICAL CHAPTERS</span>
          </div>
          <h2 id="disciplines-main-title" className="chapters-main-title">
            Three Dedicated Arenas of Surgical Precision
          </h2>
          <p className="chapters-main-lead">
            In complex surgical oncology, surgical strategy is not uniform. Each domain represents a distinct clinical battleground requiring specialized surgical philosophies, advanced equipment, and uncompromising margin discipline.
          </p>
        </div>
      </div>

      {/* ===================================================================
          PILLAR 01: WHEN HOPE SEEMS LOST
          Layout: Magazine Feature Opening with Asymmetrical Grid-Breaking Image
          =================================================================== */}
      <div className="chapter-pillar-01" aria-labelledby="pillar-01-title">
        <div className="editorial-container">
          <div className="p1-feature-grid">
            <div className="p1-text-pane">
              <div className="p1-index-tag">
                <span className="p1-number">{pillar1.number}</span>
                <span className="p1-kicker-label">{pillar1.kicker}</span>
              </div>

              <h3 id="pillar-01-title" className="p1-monumental-headline">
                WHEN HOPE<br />SEEMS LOST
              </h3>

              <div className="p1-gold-accent-bar" aria-hidden="true" />

              <p className="p1-lead-quote">
                “{pillar1.leadStatement}”
              </p>

              <p className="p1-narrative-prose">
                {pillar1.narrative}
              </p>

              {/* Editorial Topic List with Hairline Dividers */}
              <div className="p1-topics-list">
                {pillar1.topics.map((topic, i) => (
                  <div key={i} className="p1-topic-item">
                    <span className="p1-topic-bullet" aria-hidden="true">—</span>
                    <span className="p1-topic-text">{topic}</span>
                  </div>
                ))}
              </div>

              <div className="p1-action-row">
                <Button
                  variant="primary"
                  size="lg"
                  className="p1-explore-btn"
                  onClick={() => onRequestSecondOpinion(pillar1.domainId)}
                >
                  <span>Explore This Area</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
                <span className="p1-spec-badge">
                  Sugarbaker PCI Protocol · 42°C Perfusion Suite
                </span>
              </div>
            </div>

            {/* Asymmetrical Grid-Breaking Image */}
            <div className="p1-image-pane">
              <div className="p1-image-frame">
                <img
                  src={pillar1.imageSrc}
                  alt={pillar1.imageAlt}
                  className="p1-editorial-photo"
                />
                <div className="p1-image-annotation">
                  <span className="annotation-label">SURGICAL THEATRE / KOCHI</span>
                  <span className="annotation-sub">Hyperthermic Intraperitoneal Chemotherapy Console</span>
                </div>
              </div>

              {/* Floating Editorial Spec Card */}
              <div className="p1-spec-strip">
                {pillar1.specNotes.map((spec, idx) => (
                  <div key={idx} className="p1-spec-item">
                    <span className="spec-item-label">{spec.label}</span>
                    <span className="spec-item-val">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          PILLAR 02: PRECISION THAT PROTECTS YOU
          Layout: Split Editorial Composition (Opposite Side Balance, Editorial Typography)
          =================================================================== */}
      <div className="chapter-pillar-02" aria-labelledby="pillar-02-title">
        <div className="editorial-container">
          <div className="p2-split-composition">
            {/* Left Side: Large Authentic Image */}
            <div className="p2-visual-column">
              <div className="p2-photo-wrapper">
                <img
                  src={pillar2.imageSrc}
                  alt={pillar2.imageAlt}
                  className="p2-editorial-photo"
                />
                <div className="p2-photo-caption">
                  <span className="caption-tag">HISTOPATHOLOGY & RADIOLOGY REVIEW</span>
                  <span className="caption-text">Sub-millimeter negative margin verification prior to surgical reconstruction</span>
                </div>
              </div>
            </div>

            {/* Right Side: Editorial Typography & Separators */}
            <div className="p2-content-column">
              <div className="p2-index-tag">
                <span className="p2-number">{pillar2.number}</span>
                <span className="p2-kicker-label">{pillar2.kicker}</span>
              </div>

              <h3 id="pillar-02-title" className="p2-display-headline">
                PRECISION THAT<br />PROTECTS YOU
              </h3>

              <div className="p2-gold-divider" aria-hidden="true" />

              <p className="p2-lead-statement">
                {pillar2.leadStatement}
              </p>

              <p className="p2-narrative-prose">
                {pillar2.narrative}
              </p>

              {/* Topics as Elegant Editorial Rows with Hairline Separators */}
              <div className="p2-editorial-topics-flow">
                {pillar2.topics.map((topic, idx) => (
                  <div key={idx} className="p2-topic-row">
                    <span className="topic-roman">0{idx + 1}</span>
                    <span className="topic-title-string">{topic}</span>
                  </div>
                ))}
              </div>

              <div className="p2-cta-wrapper">
                <Button
                  variant="primary"
                  size="lg"
                  className="p2-explore-btn"
                  onClick={() => onRequestSecondOpinion(pillar2.domainId)}
                >
                  <span>Explore This Area</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
                <span className="p2-clinical-badge">
                  Primary Goal: Curative R0 Clearance with Anatomical Preservation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          PILLAR 03: SURGERY AT THE FRONTIER
          Layout: Dramatic Cinematic Full-Bleed Atmosphere
          =================================================================== */}
      <div className="chapter-pillar-03" aria-labelledby="pillar-03-title">
        <div className="p3-cinematic-backdrop">
          <img
            src={pillar3.imageSrc}
            alt={pillar3.imageAlt}
            className="p3-backdrop-image"
          />
          <div className="p3-cinematic-overlay" aria-hidden="true" />
        </div>

        <div className="editorial-container p3-foreground-container">
          <div className="p3-content-wrapper">
            <div className="p3-badge-header">
              <span className="p3-number">{pillar3.number}</span>
              <span className="p3-kicker">{pillar3.kicker}</span>
            </div>

            <h3 id="pillar-03-title" className="p3-dramatic-headline">
              SURGERY AT THE FRONTIER
            </h3>

            <p className="p3-lead-quote">
              “{pillar3.leadStatement}”
            </p>

            <p className="p3-narrative-text">
              {pillar3.narrative}
            </p>

            <div className="p3-spec-grid">
              {pillar3.specNotes.map((note, i) => (
                <div key={i} className="p3-spec-cell">
                  <span className="p3-cell-label">{note.label}</span>
                  <span className="p3-cell-val">{note.value}</span>
                </div>
              ))}
            </div>

            <div className="p3-actions-row">
              <Button
                variant="accent"
                size="lg"
                className="p3-action-cta"
                onClick={() => onRequestSecondOpinion(pillar3.domainId)}
              >
                <span>Explore This Area</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <span className="p3-sub-meta">
                daVinci Xi Robotics Suite · Advanced Compartmental Dissection
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
