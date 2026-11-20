import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';
import type { SupportedLanguage } from '../types';
import { LanguageNoticeModal } from './LanguageNoticeModal';
import { trackCtaClick } from '../utils/analytics';
import { useSiteContent } from '../context/SiteContentContext';

export interface NavbarProps {
  onRequestSecondOpinion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestSecondOpinion }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<SupportedLanguage>('en');
  const [noticeLang, setNoticeLang] = useState<SupportedLanguage | null>(null);
  const location = useLocation();
  const { siteSettings } = useSiteContent();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/clinical-areas', label: 'Clinical Areas' },
    { to: '/patient-journey', label: 'Patient Journey' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/upload-records', label: 'Upload Records' },
    { to: '/articles', label: 'Clinical Insights' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    if (lang === 'en') {
      setActiveLang('en');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else {
      setNoticeLang(lang);
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
      }
    }
  };

  const handleCloseLangNotice = () => {
    setNoticeLang(null);
    document.documentElement.dir = 'ltr';
  };

  const handleSecondOpinionClick = () => {
    trackCtaClick('navbar_header', 'Second Opinion Header CTA');
    onRequestSecondOpinion();
  };

  return (
    <>
      <header className="navbar-executive-wrapper" role="banner">
        {/* 1. Top Clinical Utility Strip */}
        <div className="navbar-top-utility">
          <div className="navbar-container">
            <div className="navbar-top-inner">
              <div className="utility-left">
                <span className="utility-inst">SURGICAL ONCOLOGY &amp; CLINICAL SECOND OPINION</span>
              </div>

              <div className="utility-right">
                {/* Social Media Channels */}
                <div className="utility-social-links" aria-label="Official Social Channels">
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="utility-social-icon"
                    aria-label="Instagram"
                    title="Follow Dr. Jem Kalathil on Instagram"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="utility-social-icon"
                    aria-label="Facebook"
                    title="Follow Dr. Jem Kalathil on Facebook"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="utility-social-icon"
                    aria-label="YouTube"
                    title="Watch Dr. Jem Kalathil on YouTube"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                    </svg>
                  </a>
                </div>

                <span className="utility-sep" aria-hidden="true">|</span>

                {/* Language Switcher */}
                <div className="utility-lang-switcher" aria-label="Language selector">
                  <button
                    type="button"
                    className={`lang-choice-btn ${activeLang === 'en' ? 'active' : ''}`}
                    onClick={() => handleLanguageSelect('en')}
                    title="English"
                  >
                    EN
                  </button>
                  <span className="lang-sep" aria-hidden="true">/</span>
                  <button
                    type="button"
                    className="lang-choice-btn"
                    onClick={() => handleLanguageSelect('ml')}
                    title="മലയാളം (Malayalam)"
                  >
                    മലയാളം
                  </button>
                  <span className="lang-sep" aria-hidden="true">/</span>
                  <button
                    type="button"
                    className="lang-choice-btn"
                    onClick={() => handleLanguageSelect('ar')}
                    title="العربية (Arabic)"
                  >
                    العربية
                  </button>
                </div>

                <span className="utility-sep" aria-hidden="true">|</span>

                <div className="utility-status">
                  <span className="status-live-dot" aria-hidden="true" />
                  <span className="status-text">OPD: 09:00 AM – 04:00 PM IST</span>
                </div>

                <span className="utility-sep" aria-hidden="true">|</span>

                <a
                  href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
                  className="utility-call-link"
                  title="Direct Clinical Desk Line"
                >
                  <span>Direct Line:</span>
                  <strong>{CLINICAL_DOCTOR_INFO.secretaryPhone}</strong>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Executive Frosted Navigation Bar */}
        <div className="navbar-main-bar">
          <div className="navbar-container">
            <div className="navbar-main-inner">
              {/* Bespoke Luxury Brand Logo */}
              <Link to="/" className="brand-luxury-suite" aria-label="Hope & Clarity by Dr. Jem Kalathil">
                <img
                  src="/images/hope_and_clarity_logo_trimmed.png"
                  alt="Hope & Clarity by Dr. Jem Kalathil"
                  className="brand-logo-img"
                  width="156"
                  height="50"
                  loading="eager"
                />
              </Link>

              {/* Centered Editorial Navigation Links */}
              <nav className="nav-navigation-menu" aria-label="Main Navigation">
                <ul className="nav-links-row">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className={`nav-link-item ${isActive ? 'is-active' : ''}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Right Luxury Action Cluster */}
              <div className="nav-action-cluster">
                {/* Direct Desk Call Pill */}
                <a
                  href={`tel:${siteSettings.secretaryPhone.replace(/\s+/g, '')}`}
                  className="nav-desk-call-pill"
                  aria-label={`Call clinical desk at ${siteSettings.secretaryPhone}`}
                  title="Direct Clinical Desk Line"
                >
                  <span className="pill-call-icon" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span className="pill-call-number">{siteSettings.secretaryPhone}</span>
                </a>

                {/* Luxury CTA Button */}
                <button
                  type="button"
                  className="nav-luxury-cta-btn"
                  onClick={handleSecondOpinionClick}
                >
                  <span>Second Opinion</span>
                  <svg className="cta-arrow-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Mobile Menu Hamburger */}
                <button
                  type="button"
                  className="mobile-header-toggle"
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle navigation menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {mobileMenuOpen ? (
                      <path d="M18 6L6 18M6 6l12 12" />
                    ) : (
                      <path d="M3 12h18M3 6h18M3 18h18" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
              <nav className="mobile-executive-drawer" aria-label="Mobile Navigation">
                <div className="mobile-drawer-brand">
                  <img
                    src="/images/hope_and_clarity_logo_trimmed.png"
                    alt="Hope & Clarity by Dr. Jem Kalathil"
                    className="mobile-drawer-logo"
                    width="150"
                    height="48"
                  />
                </div>
                <div className="mobile-drawer-lang-row">
                  <span className="mobile-lang-label">Language:</span>
                  <div className="utility-lang-switcher">
                    <button
                      type="button"
                      className={`lang-choice-btn ${activeLang === 'en' ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect('en')}
                    >
                      EN
                    </button>
                    <span className="lang-sep">/</span>
                    <button
                      type="button"
                      className="lang-choice-btn"
                      onClick={() => handleLanguageSelect('ml')}
                    >
                      മലയാളം
                    </button>
                    <span className="lang-sep">/</span>
                    <button
                      type="button"
                      className="lang-choice-btn"
                      onClick={() => handleLanguageSelect('ar')}
                    >
                      العربية
                    </button>
                  </div>
                </div>

                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`mobile-drawer-link ${isActive ? 'is-active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      <span>{link.label}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  );
                })}

                <div className="mobile-drawer-social-row">
                  <span className="mobile-social-label">Follow Us:</span>
                  <div className="mobile-social-icons">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon" aria-label="Instagram">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon" aria-label="Facebook">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon" aria-label="YouTube">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="mobile-drawer-cta-wrap">
                  <a
                    href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
                    className="mobile-drawer-call"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>Direct Clinical Desk: {CLINICAL_DOCTOR_INFO.secretaryPhone}</span>
                  </a>
                  <button
                    type="button"
                    className="nav-luxury-cta-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSecondOpinionClick();
                    }}
                  >
                    <span>Request Second Opinion</span>
                    <svg className="cta-arrow-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Language Notice Modal for Malayalam and Arabic */}
      <LanguageNoticeModal language={noticeLang} onClose={handleCloseLangNotice} />
    </>
  );
};
