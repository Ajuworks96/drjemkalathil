import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';

const CURRENT_YEAR = new Date().getFullYear();

export interface FooterProps {
  onRequestSecondOpinion: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestSecondOpinion }) => {
  const { siteSettings } = useSiteContent();
  return (
    <footer className="publication-editorial-footer" role="contentinfo">
      <div className="editorial-container">
        {/* Top Publication Masthead */}
        <div className="publication-footer-masthead">
          <div className="publication-brand-block">
            <Link to="/" className="publication-logo-link" aria-label="Hope & Clarity by Dr. Jem Kalathil">
              <img
                src="/images/hope_and_clarity_logo_trimmed.png"
                alt="Hope & Clarity by Dr. Jem Kalathil"
                className="publication-footer-logo"
                width="220"
                height="70"
                loading="lazy"
              />
            </Link>
            <p className="publication-brand-motto">
              From fear to hope.<br />
              From confusion to clarity.
            </p>
            <div className="publication-credentials-tag">
              <span>Surgical Oncology & Clinical Second Opinion</span>
              <span className="dot-sep" aria-hidden="true">·</span>
              <span>Kochi, Kerala</span>
            </div>

            {/* Social Media Channels */}
            <div className="publication-social-channels" aria-label="Official Social Channels">
              <span className="pub-social-title">Follow &amp; Connect:</span>
              <div className="pub-social-list">
                <a
                  href={siteSettings.instagramUrl || 'https://www.instagram.com/drjemkalathil'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-social-link"
                  aria-label="Instagram"
                  title="Dr. Jem Kalathil on Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href={siteSettings.facebookUrl || 'https://www.facebook.com/drjemkalathil'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-social-link"
                  aria-label="Facebook"
                  title="Dr. Jem Kalathil on Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  href={siteSettings.youtubeUrl || 'https://www.youtube.com/@drjemkalathil'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-social-link"
                  aria-label="YouTube"
                  title="Dr. Jem Kalathil on YouTube"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
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
            <Link to="/gallery" className="publication-nav-link">Gallery</Link>
            <Link to="/upload-records" className="publication-nav-link">Upload Records</Link>
            <Link to="/articles" className="publication-nav-link">Clinical Insights</Link>
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
                href={`tel:${siteSettings.secretaryPhone.replace(/\s+/g, '')}`}
                className="pub-desk-val pub-desk-phone"
              >
                {siteSettings.secretaryPhone}
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
            <span>© {CURRENT_YEAR} Dr. Jem Kalathil. All rights reserved.</span>
          </div>

          <div className="colophon-right">
            <span>Designed as an independent editorial patient resource.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
