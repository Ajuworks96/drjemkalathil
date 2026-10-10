import React from 'react';
import { Button } from './Button';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';

export interface HeroSectionProps {
  onRequestSecondOpinion: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestSecondOpinion }) => {
  return (
    <section className="editorial-james-hero" aria-label="Clinical Introduction">
      <div className="hero-stage-container">
        {/* Giant Background Typographic Watermark (Matches "James" from reference) */}
        <div className="hero-watermark-text" aria-hidden="true">
          Kalathil
        </div>

        {/* Luminous Crystal & Gold Medical Emblem in Upper Right Background */}
        <div className="hero-crystal-emblem-wrap" aria-hidden="true">
          <img
            src="/images/clinical_crystal_emblem.png"
            alt=""
            className="hero-crystal-emblem"
          />
        </div>

        {/* Center-Left Doctor Cutout Silhouette Overlapping Watermark */}
        <div className="hero-doctor-cutout-wrap">
          <img
            src="/images/dr_jem_kalathil_cutout.png"
            alt="Dr. Jem Kalathil, Senior Consultant Surgical Oncology"
            className="hero-doctor-cutout"
          />
        </div>

        {/* Left Sub-Column (Under doctor's left side) */}
        <div className="hero-left-meta">
          <div className="hero-channel-links" aria-label="Quick Clinical Contact Links">
            <a
              href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
              className="channel-icon-btn"
              title="Direct Clinical Desk Line"
              aria-label="Call Clinical Desk"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>

            <a
              href={`mailto:${CLINICAL_DOCTOR_INFO.email}`}
              className="channel-icon-btn"
              title="Email Clinical Secretary"
              aria-label="Email Clinical Secretary"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>

            <a
              href="#about"
              className="channel-icon-btn"
              title="Aster Medcity Location"
              aria-label="Aster Medcity Location"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </a>
          </div>

          <p className="hero-left-statement">
            Dedicated to organ-preserving breast oncology, advanced HIPEC cytoreduction, and clear surgical second opinions.
          </p>
        </div>

        {/* Right Content Block (Matches Dr. James profile box & CTA) */}
        <div className="hero-right-card">
          <span className="hero-right-kicker">I AM DR. JEM KALATHIL</span>
          <h1 className="hero-right-name">Dr. Jem Kalathil</h1>
          <div className="hero-right-creds">
            {CLINICAL_DOCTOR_INFO.credentials}
          </div>
          <div className="hero-right-dept">
            Head of Department · Surgical Oncology, Aster Medcity
          </div>

          <div className="hero-right-actions">
            <Button
              variant="primary"
              size="lg"
              className="hero-primary-cta"
              onClick={onRequestSecondOpinion}
            >
              <span>Request Second Opinion</span>
              <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Social Proof / Rating Trust Block */}
          <div className="hero-trust-bar">
            <div className="trust-stars-row">
              <span className="star-icon" aria-hidden="true">★</span>
              <span className="star-icon" aria-hidden="true">★</span>
              <span className="star-icon" aria-hidden="true">★</span>
              <span className="star-icon" aria-hidden="true">★</span>
              <span className="star-icon" aria-hidden="true">★</span>
              <span className="trust-score">5.0</span>
            </div>
            <div className="trust-label">
              <strong>25+ Years Surgical Leadership</strong> · Aster Medcity Quaternary Care
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Credentials Row */}
      <div className="container">
        <div className="hero-bottom-credentials">
          <div className="credential-item">
            <span className="credential-value">{CLINICAL_DOCTOR_INFO.experienceYears}</span>
            <span className="credential-label">Years of Dedicated Surgical Practice</span>
          </div>
          <div className="credential-item">
            <span className="credential-value">FRCS</span>
            <span className="credential-label">Royal College of Surgeons, Edinburgh</span>
          </div>
          <div className="credential-item">
            <span className="credential-value">HIPEC & Breast</span>
            <span className="credential-label">Pioneering Organ-Preserving Surgery</span>
          </div>
          <div className="credential-item">
            <span className="credential-value">Aster Medcity</span>
            <span className="credential-label">Senior Consultant & Head of Department</span>
          </div>
        </div>
      </div>
    </section>
  );
};
