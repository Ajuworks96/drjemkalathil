import React from 'react';
import { Link } from 'react-router-dom';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';

export interface FooterProps {
  onRequestSecondOpinion: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestSecondOpinion }) => {
  return (
    <footer className="publication-editorial-footer" role="contentinfo">
      <div className="editorial-container">
        {/* Top Publication Masthead */}
        <div className="publication-footer-masthead">
          <div className="publication-brand-block">
            <span className="publication-brand-title">HOPE & CLARITY</span>
            <p className="publication-brand-motto">
              From fear to hope.<br />
              From confusion to clarity.
            </p>
          </div>

          <div className="publication-cta-wrap">
            <button
              type="button"
              className="publication-opinion-trigger"
              onClick={onRequestSecondOpinion}
            >
              <span>Request a Second Opinion →</span>
            </button>
          </div>
        </div>

        <div className="publication-footer-gold-divider" aria-hidden="true" />

        {/* Essential Navigation & Direct Desk Line */}
        <div className="publication-footer-middle">
          <nav className="publication-essential-nav" aria-label="Footer Essential Navigation">
            <Link to="/" className="publication-nav-link">Home</Link>
            <Link to="/clinical-areas" className="publication-nav-link">Clinical Areas</Link>
            <Link to="/patient-journey" className="publication-nav-link">Patient Journey</Link>
            <Link to="/upload-records" className="publication-nav-link">Upload Records</Link>
            <Link to="/contact" className="publication-nav-link">Contact</Link>
          </nav>

          <div className="publication-desk-summary">
            <div className="pub-desk-item">
              <span className="pub-desk-label">Clinical Location</span>
              <span className="pub-desk-val">Aster Medcity, Kochi, Kerala</span>
            </div>
            <div className="pub-desk-item">
              <span className="pub-desk-label">Direct Clinical Desk</span>
              <a
                href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
                className="pub-desk-val pub-desk-phone"
              >
                {CLINICAL_DOCTOR_INFO.secretaryPhone}
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Clinical Disclaimer */}
        <div className="publication-disclaimer-block">
          <p className="publication-disclaimer-text">
            Information provided on Hope & Clarity is curated for clinical orientation and second-opinion coordination.
            An online evaluation does not replace in-person physical examination or acute emergency oncology care.
            Patients experiencing urgent symptoms should seek immediate emergency hospital medical attention.
          </p>
        </div>

        <div className="publication-sub-divider" aria-hidden="true" />

        {/* Bottom Colophon Bar */}
        <div className="publication-colophon-bar">
          <div className="colophon-left">
            <span>© {new Date().getFullYear()} Dr. Jem Kalathil. All rights reserved.</span>
            <span className="colophon-sep" aria-hidden="true">/</span>
            <span>Department of Surgical Oncology, Aster Medcity</span>
          </div>

          <div className="colophon-right">
            <span>Designed as an independent editorial patient resource.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
