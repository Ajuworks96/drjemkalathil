import React, { useState } from 'react';
import { CLINICAL_DOCTOR_INFO, WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';
import { Button } from '../components/Button';

export const ContactPage: React.FC = () => {
  const [sentSuccess, setSentSuccess] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const toggleTravelFaq = (idx: number) => {
    setOpenTravelFaq(openTravelFaq === idx ? null : idx);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Jem Kalathil's Clinical Desk, I would like to schedule an appointment for ${formData.name || 'a patient'}. Preferred Mode: ${consultationMode === 'in_person' ? 'In-Person at Kochi' : 'Video Teleconsultation'}.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_COORDINATOR_NUMBER.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="subpage-wrapper">
      {/* 1. Page Header */}
      <section className="subpage-editorial-hero" aria-label="Contact & Appointments Header">
        <div className="editorial-container">
          <div className="subpage-breadcrumb">
            <span className="crumb-item">HOME</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-item">DEPARTMENT OF SURGICAL ONCOLOGY</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">CONSULTATION & DIRECT DESK</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="Aster Medcity Crest" className="hero-crest-img" />
              <span>DIRECT INSTITUTIONAL & CLINICAL DESK · ASTER MEDCITY</span>
            </div>
            <h1 className="subpage-title">
              Consultation Locations & Appointment Scheduling
            </h1>
            <p className="subpage-lead">
              Direct access to <strong>Dr. Jem Kalathil</strong> and the Department of Surgical Oncology at Aster Medcity, Kochi. Coordinate in-person appointments, schedule dedicated video tele-oncology consultations, or connect with our international patient desk.
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Aster Medcity</span>
              <span className="subpage-stat-label">Cheranallur, Kochi, Kerala</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Mon – Sat</span>
              <span className="subpage-stat-label">09:00 AM – 04:00 PM IST</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">+91 484 669 9999</span>
              <span className="subpage-stat-label">Direct Clinical Secretary Desk</span>
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
                    Kuttisahib Road, Near Kothad Bridge, South Chittoor,<br />
                    Cheranallur, Kochi, Kerala 682027, India
                  </p>

                  <div className="contact-methods-list">
                    <div className="contact-method-item">
                      <div className="method-icon-wrap">📞</div>
                      <div>
                        <span className="method-label">Direct Clinical Secretary Desk</span>
                        <a href="tel:+914846699999" className="method-val">{CLINICAL_DOCTOR_INFO.secretaryPhone}</a>
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
                          {WHATSAPP_COORDINATOR_NUMBER} (Direct Chat)
                        </a>
                      </div>
                    </div>

                    <div className="contact-method-item">
                      <div className="method-icon-wrap">✉️</div>
                      <div>
                        <span className="method-label">Clinical Secretary Email</span>
                        <a href={`mailto:${CLINICAL_DOCTOR_INFO.email}`} className="method-val">
                          {CLINICAL_DOCTOR_INFO.email}
                        </a>
                      </div>
                    </div>

                    <div className="contact-method-item">
                      <div className="method-icon-wrap">🏥</div>
                      <div>
                        <span className="method-label">Outpatient Consultation Hours</span>
                        <span className="method-val-text">Monday to Saturday: 09:00 AM – 04:00 PM IST</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gulf & International Liaison Box */}
              <div className="gulf-liaison-box">
                <span className="gulf-tag">GULF & INTERNATIONAL PATIENTS</span>
                <h3 className="gulf-box-title">Dedicated Travel & Tele-Oncology Support</h3>
                <p className="gulf-box-desc">
                  Patients from UAE, Oman, Qatar, Saudi Arabia, Kuwait, and Bahrain receive direct coordination before traveling to Kochi:
                </p>
                <ul className="gulf-box-perks">
                  <li>Preliminary teleconsultation review of pathology & imaging before flight booking.</li>
                  <li>Airport reception at Cochin International Airport (COK) — 45 mins from Aster Medcity.</li>
                  <li>Priority fast-track surgical scheduling and local accommodation guidance.</li>
                  <li>Multilingual patient liaisons fluent in Arabic, English, and Malayalam.</li>
                </ul>
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
                          <option value="breast">Oncoplastic Breast Surgery & Breast Conservation</option>
                          <option value="hipec">Peritoneal Surface Oncology & HIPEC (Ovarian/Colorectal/Appendix)</option>
                          <option value="sarcoma">Robotic Oncology / Retroperitoneal Soft Tissue Sarcoma</option>
                          <option value="second_opinion">General Quaternary Oncology Second Opinion</option>
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

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="contact-submit-btn"
                      >
                        <span>Submit Consultation Request</span>
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
