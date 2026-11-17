import React from 'react';
import { Button } from './Button';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';

export interface HeroSectionProps {
  onRequestSecondOpinion: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestSecondOpinion }) => {
  return (
    <section 
      className="editorial-james-hero" 
      aria-label="Dr. Jem Kalathil - Surgical Oncology Consultation"
      itemScope
      itemType="https://schema.org/Physician"
    >
      {/* Hidden Structured Data for Search Engine Crawlers (Medical SEO & Local E-E-A-T) */}
      <meta itemProp="name" content="Dr. Jem Kalathil" />
      <meta itemProp="medicalSpecialty" content="Surgical Oncology" />
      <meta itemProp="hospitalAffiliation" content="Aster Medcity, Kochi" />
      <meta itemProp="telephone" content={CLINICAL_DOCTOR_INFO.secretaryPhone} />
      <meta itemProp="email" content={CLINICAL_DOCTOR_INFO.email} />

      <div className="hero-stage-container">
        <div className="hero-split-grid">
          
          {/* ================= LEFT COLUMN: SEO HEADLINE & ACTIONS ================= */}
          <div className="hero-content-col">
            
            {/* Header Block (On mobile: order 1) */}
            <div className="hero-header-block">
              {/* Top Eyebrow Badge (Modeled after reference pill, fully responsive) */}
              <div className="hero-eyebrow-pill" role="status">
                <span className="pill-pulse-dot" aria-hidden="true" />
                <svg className="pill-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="pill-text">Surgical Oncologist · Breast, Peritoneal &amp; Robotic Surgery</span>
              </div>

              {/* Primary SEO Heading (H1) */}
              <h1 className="hero-seo-title">
                Hope &amp; Clarity in <br />
                <span className="hero-title-accent">Cancer Surgery.</span>
              </h1>

              {/* Doctor Authority Line */}
              <div className="hero-doctor-title-line">
                <span className="doctor-primary-name" itemProp="name">Dr. Jem Kalathil</span>
                <span className="doctor-title-separator" aria-hidden="true">·</span>
                <span className="doctor-credentials-badge">MS (General Surgery) · Surgical Oncology</span>
              </div>
            </div>

            {/* Actions Block (On mobile: order 3) */}
            <div className="hero-actions-block">
              {/* SEO Lead Description Paragraph (Rewritten per compliance brief) */}
              <p className="hero-lead-description" itemProp="description">
                Surgical oncology guided by precision, preservation, and transparency. Specialising in Breast Cancer Surgery with Oncoplasty &amp; Reconstruction, Peritoneal Surface Malignancies &amp; HIPEC, and Robotic Surgical Oncology — with dedicated second-opinion pathways for patients across Kerala, India, and the Gulf.
              </p>

              {/* Action Buttons Row (Modeled after reference dual CTAs) */}
              <div className="hero-actions-group">
                <Button
                  variant="primary"
                  size="lg"
                  className="hero-primary-cta"
                  onClick={onRequestSecondOpinion}
                >
                  <span>Request Second Opinion</span>
                  <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>

                <a href="/clinical-areas" className="hero-secondary-btn">
                  <span>Explore Clinical Areas</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              </div>

              {/* Trust Proof & Direct Desk Strip (NMC compliant - ratings removed) */}
              <div className="hero-social-proof-strip">
                <div className="proof-text-block">
                  <span className="proof-metric">30+ Years Dedicated Practice</span>
                  <span className="proof-sub">Senior Surgical Oncologist · Comprehensive Cancer Care</span>
                </div>

                {/* Direct Desk Line */}
                <a 
                  href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`} 
                  className="proof-call-link"
                  title="Call Clinical Desk directly"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Direct Desk: +91 484 669 9999</span>
                </a>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: VISUAL STAGE WITH DOCTOR & FLOATING SPECIALTY CARDS ================= */}
          <div className="hero-visual-col">
            <div className="hero-visual-stage">
              
              {/* Rounded Backdrop Frame (Obsidian Black with subtle gold hairline & radial glow) */}
              <div className="stage-backdrop-frame" aria-hidden="true">
                <div className="frame-inner-glow" />
              </div>

              {/* Doctor Cutout Silhouette (Positioned on left side so cards NEVER cover his face) */}
              <div className="stage-doctor-cutout-wrap">
                <img
                  src="/images/dr_jem_kalathil_cutout.png"
                  alt="Dr. Jem Kalathil, Lead Senior Consultant, Surgical Oncology"
                  className="stage-doctor-img"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* 3 FLOATING SPECIALTY CARDS STACKED ON RIGHT (Exact layout matching user mockup) */}
              <div className="hero-floating-specialties-stack" aria-label="Key Clinical Pillars">
                <a href="/clinical-areas#breast" className="floating-specialty-card">
                  <div className="specialty-card-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="specialty-card-meta">
                    <span className="specialty-card-title">Breast Cancer Surgery, Oncoplasty &amp; Reconstruction</span>
                    <span className="specialty-card-sub">Organ Preservation &amp; Symmetry</span>
                  </div>
                </a>

                <a href="/clinical-areas#hipec" className="floating-specialty-card">
                  <div className="specialty-card-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24" />
                    </svg>
                  </div>
                  <div className="specialty-card-meta">
                    <span className="specialty-card-title">Peritoneal Surface Malignancies &amp; HIPEC</span>
                    <span className="specialty-card-sub">Curative Cytoreduction</span>
                  </div>
                </a>

                <a href="/clinical-areas#robotic" className="floating-specialty-card">
                  <div className="specialty-card-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M9 9h6M9 15h6" />
                    </svg>
                  </div>
                  <div className="specialty-card-meta">
                    <span className="specialty-card-title">Robotic Surgical Oncology</span>
                    <span className="specialty-card-sub">Da Vinci Precision</span>
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Baseline Clinical Authority Bar (NMC compliant - FRCS & institutional promotion replaced) */}
      <div className="container">
        <div className="hero-bottom-credentials">
          <div className="credential-item">
            <span className="credential-value">30+ Years</span>
            <span className="credential-label">Dedicated Surgical Oncology Practice</span>
          </div>
          <div className="credential-item">
            <span className="credential-value">High-Volume Specialist</span>
            <span className="credential-label">Peritoneal Surface Oncology &amp; HIPEC</span>
          </div>
          <div className="credential-item">
            <span className="credential-value">Organ Preservation</span>
            <span className="credential-label">Oncoplastic Breast Surgery &amp; Reconstruction</span>
          </div>
          <div className="credential-item">
            <span className="credential-value">MDT Standard</span>
            <span className="credential-label">Multidisciplinary Tumor Board Scrutiny</span>
          </div>
        </div>
      </div>
    </section>
  );
};
