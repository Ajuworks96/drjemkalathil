import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';
import type { SupportedLanguage } from '../types';
import { LanguageNoticeModal } from './LanguageNoticeModal';
import { trackCtaClick } from '../utils/analytics';

export interface NavbarProps {
  onRequestSecondOpinion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestSecondOpinion }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<SupportedLanguage>('en');
  const [noticeLang, setNoticeLang] = useState<SupportedLanguage | null>(null);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/clinical-areas', label: 'Clinical Areas' },
    { to: '/patient-journey', label: 'Patient Journey' },
    { to: '/upload-records', label: 'Upload Records' },
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
        {/* 1. Top Institutional Utility Strip */}
        <div className="navbar-top-utility">
          <div className="navbar-container">
            <div className="navbar-top-inner">
              <div className="utility-left">
                <span className="utility-inst">ASTER MEDCITY</span>
                <span className="utility-sep" aria-hidden="true">/</span>
                <span className="utility-dept">DEPARTMENT OF SURGICAL ONCOLOGY</span>
                <span className="utility-sep" aria-hidden="true">/</span>
                <span className="utility-loc">CHERANALLUR, KOCHI</span>
              </div>

              <div className="utility-right">
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
                  href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
                  className="nav-desk-call-pill"
                  aria-label={`Call clinical desk at ${CLINICAL_DOCTOR_INFO.secretaryPhone}`}
                  title="Direct Clinical Desk Line"
                >
                  <span className="pill-call-icon" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span className="pill-call-number">{CLINICAL_DOCTOR_INFO.secretaryPhone}</span>
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
