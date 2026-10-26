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
              {/* Bespoke Heraldic Brand Crest & Typography */}
              <Link to="/" className="brand-luxury-suite" aria-label="Dr. Jem Kalathil Homepage">
                <div className="brand-crest-frame" aria-hidden="true">
                  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="23" fill="#3B0A07" stroke="#C8A96A" strokeWidth="1" />
                    <circle cx="24" cy="24" r="20" stroke="#C8A96A" strokeWidth="0.7" strokeDasharray="1.5 2" opacity="0.65" />
                    <path d="M12 28C11.5 24 13.5 19 16 16C16 18.5 15.5 22 14.5 25" stroke="#C8A96A" strokeWidth="1" strokeLinecap="round" />
                    <path d="M14 31C14 27.5 16 23.5 18.5 21C18 23.5 17.5 26.5 16.5 29" stroke="#C8A96A" strokeWidth="1" strokeLinecap="round" />
                    <path d="M36 28C36.5 24 34.5 19 32 16C32 18.5 32.5 22 33.5 25" stroke="#C8A96A" strokeWidth="1" strokeLinecap="round" />
                    <path d="M34 31C34 27.5 32 23.5 29.5 21C30 23.5 30.5 26.5 31.5 29" stroke="#C8A96A" strokeWidth="1" strokeLinecap="round" />
                    <text x="24" y="28.5" fontFamily="'Poppins', sans-serif" fontSize="14" fontWeight="600" fill="#FDFBF7" textAnchor="middle" letterSpacing="0.8">JK</text>
                    <circle cx="24" cy="37.5" r="1.5" fill="#C8A96A" />
                  </svg>
                </div>

                <div className="brand-typography-block">
                  <span className="brand-lead-name">Dr. Jem Kalathil</span>
                  <span className="brand-lead-sub">
                    FRCS (EDINBURGH) · HEAD OF SURGICAL ONCOLOGY
                  </span>
                </div>
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
