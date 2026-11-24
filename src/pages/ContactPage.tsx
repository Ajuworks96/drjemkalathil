import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { useSiteContent } from '../context/SiteContentContext';
import { submitContactToWordPress } from '../services/wordpress';

export const ContactPage: React.FC = () => {
  const { siteSettings, contactPage } = useSiteContent();

  useEffect(() => {
    if (contactPage.seo?.title) {
      document.title = contactPage.seo.title;
    }
    if (contactPage.seo?.description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', contactPage.seo.description);
    }
  }, [contactPage]);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [consultationMode, setConsultationMode] = useState<'in_person' | 'video'>('in_person');
  const [openTravelFaq, setOpenTravelFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cityCountry: '',
    preferredDate: '',
    clinicalDomain: 'breast',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const apiRes = await submitContactToWordPress({
      ...formData,
      consultationMode,
    });

    setIsSubmitting(false);

    if (!apiRes.success) {
      setSubmitError(apiRes.message || 'Unable to submit request right now. Please try again or call our clinical desk.');
      return;
    }

    setSentSuccess(true);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const toggleTravelFaq = (idx: number) => {
    setOpenTravelFaq(openTravelFaq === idx ? null : idx);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Jem Kalathil's Clinical Desk, I would like to schedule an appointment for ${formData.name || 'a patient'}. Preferred Mode: ${consultationMode === 'in_person' ? 'In-Person at Kochi' : 'Video Teleconsultation'}.`
  );
  const whatsappUrl = `https://wa.me/${siteSettings.whatsappPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="subpage-wrapper">
      {/* 1. Page Header */}
      <section className="subpage-editorial-hero" aria-label="Contact & Appointments Header">
        <div className="editorial-container">
          <div className="subpage-breadcrumb">
            <span className="crumb-item">HOME</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-item">CONTACT</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">CONSULTATION & DIRECT DESK</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="Clinical Emblem" className="hero-crest-img" />
              <span>DIRECT CLINICAL DESK · SPECIALIST REFERRAL & SECOND OPINION</span>
            </div>
            <h1 className="subpage-title">
              {contactPage.pageTitle}
            </h1>
            <p className="subpage-lead">
              {contactPage.pageLead}
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Aster Medcity</span>
              <span className="subpage-stat-label">Cheranallur, Kochi, Kerala</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Mon – Sat</span>
              <span className="subpage-stat-label">{siteSettings.opdSchedule}</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Clinical Desk</span>
              <span className="subpage-stat-label">{siteSettings.secretaryPhone} (OPD)</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Gulf Desk</span>
              <span className="subpage-stat-label">Dedicated International Concierge</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="contact-main-section">
        <div className="editorial-container">
          <div className="contact-columns-grid">
            {/* Left Column: Direct Access Details & Hospital Profile */}
            <div className="contact-details-column">
              <div className="contact-card-premium">
                <div className="contact-card-image-wrap">
                  <img
                    src="/images/aster_medcity_campus.jpg"
                    alt="Aster Medcity Waterfront Quaternary Hospital Campus Kochi"
                    className="campus-feature-img"
                  />
                  <div className="campus-status-pill">
                    <span className="live-pulse-dot" /> OPD ACTIVE TODAY · MON – SAT
                  </div>
                </div>

                <div className="contact-card-body">
                  <span className="contact-card-kicker">PRIMARY PRACTICE LOCATION</span>
                  <h2 className="contact-center-title">Aster Medcity, Kochi</h2>
                  <p className="contact-dept-name">Department of Surgical Oncology</p>
                  <p className="contact-address">
                    {contactPage.addressBlock}
                  </p>

                  <div className="contact-methods-list">
                    <div className="contact-method-item">
                      <div className="method-icon-wrap">📞</div>
                      <div>
                        <span className="method-label">Direct Clinical Secretary Desk</span>
                        <a href={`tel:${siteSettings.secretaryPhone.replace(/\s+/g, '')}`} className="method-val">{siteSettings.secretaryPhone}</a>
                      </div>
                    </div>

                    <div className="contact-method-item">
                      <div className="method-icon-wrap">💬</div>
                      <div>
                        <span className="method-label">WhatsApp Oncology Coordinator</span>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="method-val"
                        >
                          {siteSettings.whatsappPhone} (Direct Chat)
                        </a>
                      </div>
                    </div>

                    <div className="contact-method-item">
                      <div className="method-icon-wrap">✉️</div>
                      <div>
                        <span className="method-label">Clinical Secretary Email</span>
                        <a href={`mailto:${siteSettings.consultationEmail}`} className="method-val">
                          {siteSettings.consultationEmail}
                        </a>
                      </div>
                    </div>

                    <div className="contact-method-item">
                      <div className="method-icon-wrap">🏥</div>
                      <div>
                        <span className="method-label">Outpatient Consultation Hours</span>
                        <span className="method-val-text">{siteSettings.opdSchedule}</span>
                      </div>
                    </div>
                  </div>

                    <div className="contact-social-section">
                      <span className="contact-social-heading">Connect on Social Channels</span>
                      <div className="contact-social-grid">
                        <a href={siteSettings.instagramUrl || 'https://www.instagram.com/drjemkalathil'} target="_blank" rel="noopener noreferrer" className="contact-social-pill" title="Follow on Instagram">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                          </svg>
                          <span>Instagram</span>
                        </a>
                        <a href={siteSettings.facebookUrl || 'https://www.facebook.com/drjemkalathil'} target="_blank" rel="noopener noreferrer" className="contact-social-pill" title="Follow on Facebook">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                          </svg>
                          <span>Facebook</span>
                        </a>
                        <a href={siteSettings.youtubeUrl || 'https://www.youtube.com/@drjemkalathil'} target="_blank" rel="noopener noreferrer" className="contact-social-pill" title="Watch on YouTube">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                          </svg>
                          <span>YouTube</span>
                        </a>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-social-pill" title="Chat on WhatsApp">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                </div>
              </div>

              {/* Gulf & International Liaison Box */}
              <div className="gulf-liaison-box">
                <span className="gulf-tag">GULF & INTERNATIONAL PATIENTS</span>
                <h3 className="gulf-box-title">Dedicated Travel & Tele-Oncology Support</h3>
                <p className="gulf-box-desc">
                  Patients from UAE, Oman, Qatar, Saudi Arabia, Kuwait, and Bahrain receive direct coordination before traveling to Kochi. We review your dossier remotely and confirm surgical suitability before you book your travel. No unnecessary journeys:
                </p>
                <ul className="gulf-box-perks">
                  <li>Preliminary teleconsultation review of pathology & imaging before flight booking.</li>
                  <li>Airport reception at Cochin International Airport (COK) — 45 minutes to hospital campus.</li>
                  <li>Priority fast-track surgical scheduling and local accommodation guidance.</li>
                  <li>Multilingual patient liaisons fluent in Arabic, English, and Malayalam.</li>
                </ul>
                <p className="gulf-tele-note" style={{ fontSize: '0.82rem', color: '#c8a96a', margin: '12px 0 0', lineHeight: '1.5' }}>
                  Video consultations are conducted via a secure encrypted platform. No app download required for Gulf patients.
                </p>
                <div className="gulf-desk-direct">
                  <span className="gulf-subhead">International Case Coordinator:</span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="gulf-direct-wa">
                    <span>Chat with International Desk on WhatsApp →</span>
                  </a>
                </div>
              </div>

              {/* Campus Travel Info Accordion */}
              <div className="campus-travel-card">
                <h3 className="travel-card-title">Campus Access & Travel Guidance</h3>
                
                <div className="travel-acc-item">
                  <button
                    type="button"
                    className="travel-acc-trigger"
                    onClick={() => toggleTravelFaq(0)}
                  >
                    <span>✈️ Distance from Cochin International Airport (COK)</span>
                    <span>{openTravelFaq === 0 ? '−' : '+'}</span>
                  </button>
                  {openTravelFaq === 0 && (
                    <div className="travel-acc-body">
                      <p>Aster Medcity is located approximately 26 km (40–50 minutes drive) from Cochin International Airport via Container Road / NH 966A. Dedicated taxi transfer and hospital ambulance reception can be arranged upon request.</p>
                    </div>
                  )}
                </div>

                <div className="travel-acc-item">
                  <button
                    type="button"
                    className="travel-acc-trigger"
                    onClick={() => toggleTravelFaq(1)}
                  >
                    <span>🏨 Patient Guest Rooms & Family Accommodation</span>
                    <span>{openTravelFaq === 1 ? '−' : '+'}</span>
                  </button>
                  {openTravelFaq === 1 && (
                    <div className="travel-acc-body">
                      <p>Aster Medcity maintains dedicated on-campus guest suites for accompanying family members. Additionally, premium waterfront hotels and serviced apartments are located within 10 minutes of the medical campus.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Booking Module */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                {sentSuccess ? (
                  <div className="contact-sent-notice">
                    <div className="sent-check-icon">✓</div>
                    <span className="sent-badge">REQUEST LOGGED</span>
                    <h3 className="sent-heading">Consultation Request Received</h3>
                    <p className="sent-message">
                      Thank you, <strong>{formData.name}</strong>. Our clinical oncology coordinator will review your request and contact you via phone/WhatsApp within 2-4 hours to confirm your {consultationMode === 'in_person' ? 'in-person appointment' : 'video consultation'}.
                    </p>
                    <div className="sent-action-row">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sent-wa-btn"
                      >
                        <span>Confirm Immediately on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="form-card-kicker">DIRECT CASE COORDINATION</span>
                    <h2 className="form-card-heading">Schedule a Consultation or Case Enquiry</h2>
                    <p className="form-card-lead">
                      Fill in your details below. Our clinical oncology coordinator will respond promptly to schedule an in-person or video tele-oncology consultation with Dr. Jem Kalathil.
                    </p>

                    {/* Consultation Mode Switcher */}
                    <div className="consultation-mode-toggle" role="group" aria-label="Consultation Mode">
                      <button
                        type="button"
                        className={`mode-toggle-btn ${consultationMode === 'in_person' ? 'is-active' : ''}`}
                        onClick={() => setConsultationMode('in_person')}
                      >
                        <span className="mode-icon">🏥</span>
                        <div className="mode-text">
                          <span className="mode-title">In-Person OPD</span>
                          <span className="mode-sub">Aster Medcity, Kochi</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`mode-toggle-btn ${consultationMode === 'video' ? 'is-active' : ''}`}
                        onClick={() => setConsultationMode('video')}
                      >
                        <span className="mode-icon">💻</span>
                        <div className="mode-text">
                          <span className="mode-title">Video Tele-Oncology</span>
                          <span className="mode-sub">For Gulf & Outstation Patients</span>
                        </div>
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="contact-enquiry-form">
                      <div className="form-group">
                        <label className="field-label" htmlFor="name">Patient / Contact Full Name *</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g., Mohammed Al Nuaimi / Anjali Nair"
                          className="text-input"
                        />
                      </div>

                      <div className="form-group-row">
                        <div className="form-group">
                          <label className="field-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+971 50 ... or +91 949..."
                            className="text-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label" htmlFor="email">Email Address *</label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@example.com"
                            className="text-input"
                          />
                        </div>
                      </div>

                      <div className="form-group-row">
                        <div className="form-group">
                          <label className="field-label" htmlFor="cityCountry">City & Country of Residence *</label>
                          <input
                            id="cityCountry"
                            type="text"
                            name="cityCountry"
                            value={formData.cityCountry}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Muscat, Oman or Calicut"
                            className="text-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label" htmlFor="preferredDate">Preferred Date (Optional)</label>
                          <input
                            id="preferredDate"
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="text-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="field-label" htmlFor="clinicalDomain">Clinical Discipline / Area of Concern *</label>
                        <select
                          id="clinicalDomain"
                          name="clinicalDomain"
                          value={formData.clinicalDomain}
                          onChange={handleChange}
                          className="select-input"
                        >
                          <option value="breast">Breast Cancer Surgery, Oncoplasty &amp; Reconstruction</option>
                          <option value="hipec">Advanced Cytoreductive Surgery &amp; HIPEC (Peritoneal Malignancies)</option>
                          <option value="robotic">Robotic Surgical Oncology (daVinci Precision)</option>
                          <option value="gi_colorectal">Gastrointestinal &amp; Colorectal Oncology</option>
                          <option value="gynec">Gynaecological Oncology (Ovarian, Endometrial, Cervical)</option>
                          <option value="thyroid_endocrine">Thyroid &amp; Endocrine Surgical Oncology</option>
                          <option value="general_oncology">General Surgical Oncology</option>
                          <option value="second_opinion">Specialist Surgical Second Opinion</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="field-label" htmlFor="message">Summary of Clinical Questions or Concerns</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please share current diagnosis, previous surgery dates, and specific guidance you are seeking from Dr. Jem Kalathil."
                          className="textarea-input"
                        />
                      </div>

                      {submitError && (
                        <div
                          role="alert"
                          style={{
                            marginBottom: '16px',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: 'rgba(220, 38, 38, 0.14)',
                            border: '1px solid rgba(248, 113, 113, 0.45)',
                            color: '#fecaca',
                            fontSize: '0.85rem',
                            lineHeight: 1.5,
                          }}
                        >
                          {submitError}
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="contact-submit-btn"
                        disabled={isSubmitting}
                      >
                        <span>{isSubmitting ? 'Submitting Consultation Request...' : 'Submit Consultation Request'}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
