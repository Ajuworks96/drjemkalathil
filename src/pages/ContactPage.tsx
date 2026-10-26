import React, { useState } from 'react';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';
import { Button } from '../components/Button';

export const ContactPage: React.FC = () => {
  const [sentSuccess, setSentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cityCountry: '',
    consultationType: 'second_opinion',
    preferredMode: 'in_person',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
  };

  return (
    <div className="subpage-wrapper">
      {/* 1. Page Header */}
      <section className="subpage-editorial-hero" aria-label="Contact & Appointments Header">
        <div className="editorial-container">
          <div className="subpage-hero-meta">
            <span className="subpage-kicker">DIRECT INSTITUTIONAL & CLINICAL DESK</span>
            <h1 className="subpage-title">
              Consultation Locations & Contact
            </h1>
            <p className="subpage-lead">
              Direct access to Dr. Jem Kalathil’s Department of Surgical Oncology at Aster Medcity, Kochi. Coordinate appointments, request case evaluations, or connect with our international patient desk.
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
              <span className="subpage-stat-val">Direct Line</span>
              <span className="subpage-stat-label">+91 484 669 9999</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Gulf Desk</span>
              <span className="subpage-stat-label">Dedicated International Liaison</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="contact-main-section">
        <div className="editorial-container">
          <div className="contact-columns-grid">
            {/* Left Column: Direct Access Details */}
            <div className="contact-details-column">
              <div className="contact-card-premium">
                <span className="contact-card-kicker">PRIMARY PRACTICE LOCATION</span>
                <h2 className="contact-center-title">Aster Medcity, Kochi</h2>
                <p className="contact-dept-name">Department of Surgical Oncology</p>
                <p className="contact-address">
                  Kuttisahib Road, Near Kothad Bridge,<br />
                  South Chittoor, Cheranallur,<br />
                  Kochi, Kerala 682027, India
                </p>

                <div className="contact-methods-list">
                  <div className="contact-method-item">
                    <div className="method-icon">📞</div>
                    <div>
                      <span className="method-label">Direct Clinical Desk</span>
                      <a href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`} className="method-val">
                        {CLINICAL_DOCTOR_INFO.secretaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="contact-method-item">
                    <div className="method-icon">✉️</div>
                    <div>
                      <span className="method-label">Clinical Secretary Email</span>
                      <a href={`mailto:${CLINICAL_DOCTOR_INFO.email}`} className="method-val">
                        {CLINICAL_DOCTOR_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="contact-method-item">
                    <div className="method-icon">🏥</div>
                    <div>
                      <span className="method-label">Outpatient Consultation Hours</span>
                      <span className="method-val-text">Monday to Saturday: 9:00 AM – 4:00 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* International & Gulf Patient Box */}
              <div className="gulf-liaison-box">
                <div className="gulf-liaison-header">
                  <span className="gulf-tag">GULF & INTERNATIONAL PATIENTS</span>
                  <h3 className="gulf-box-title">Dedicated Travel & Teleconsultation Support</h3>
                </div>
                <p className="gulf-box-desc">
                  Patients from UAE, Oman, Qatar, Saudi Arabia, Kuwait, and Bahrain receive direct coordination before flying to Kochi:
                </p>
                <ul className="gulf-box-perks">
                  <li>Preliminary teleconsultation review of pathology & scans.</li>
                  <li>Airport reception at Cochin International Airport (COK) — 45 mins from Aster Medcity.</li>
                  <li>Priority surgical scheduling and local accommodation guidance.</li>
                  <li>Multilingual patient liaisons fluent in Arabic, English, and Malayalam.</li>
                </ul>
                <div className="gulf-desk-direct">
                  <span>International WhatsApp Desk:</span>
                  <strong>+91 484 669 9999 (Ext: Surgical Oncology)</strong>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Booking Form */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                <h2 className="form-card-heading">Schedule a Consultation or Enquiry</h2>
                <p className="form-card-lead">
                  Fill in your details below. Our clinical oncology coordinator will respond promptly to schedule an in-person or video consultation.
                </p>

                {sentSuccess ? (
                  <div className="contact-sent-notice">
                    <div className="sent-check-icon">✓</div>
                    <h3>Consultation Request Received</h3>
                    <p>
                      Thank you, <strong>{formData.name}</strong>. Our clinical coordinator will reach out to you via WhatsApp / phone at <strong>{formData.phone}</strong> within 12 hours to confirm your consultation slot.
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setSentSuccess(false)}
                      style={{ marginTop: '16px' }}
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-enquiry-form">
                    <div className="form-group">
                      <label htmlFor="name" className="field-label">Your Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g., Mohammed Al Nuaimi / Anjali Nair"
                        className="text-input"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label htmlFor="phone" className="field-label">Phone / WhatsApp *</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+971 50 ... or +91 984..."
                          className="text-input"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="field-label">Email Address *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="name@email.com"
                          className="text-input"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label htmlFor="cityCountry" className="field-label">City & Country *</label>
                        <input
                          id="cityCountry"
                          name="cityCountry"
                          type="text"
                          required
                          placeholder="e.g., Muscat, Oman or Calicut, Kerala"
                          className="text-input"
                          value={formData.cityCountry}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="preferredMode" className="field-label">Preferred Consultation Mode</label>
                        <select
                          id="preferredMode"
                          name="preferredMode"
                          className="select-input"
                          value={formData.preferredMode}
                          onChange={handleChange}
                        >
                          <option value="in_person">In-Person at Aster Medcity (Kochi)</option>
                          <option value="video_call">Video / Teleconsultation</option>
                          <option value="written_memo">Written Second Opinion Review</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="consultationType" className="field-label">Primary Area of Concern</label>
                      <select
                        id="consultationType"
                        name="consultationType"
                        className="select-input"
                        value={formData.consultationType}
                        onChange={handleChange}
                      >
                        <option value="breast_oncology">Breast Cancer / Second Opinion on Mastectomy</option>
                        <option value="hipec_peritoneal">Peritoneal Surface Malignancy / HIPEC Evaluation</option>
                        <option value="gi_thoracic">Gastrointestinal / Thoracic / Robotic Surgery</option>
                        <option value="general_second_opinion">General Surgical Oncology Second Opinion</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="field-label">Brief Clinical Summary or Question</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Briefly describe your diagnosis, current doctor's recommendation, or what you would like Dr. Jem to evaluate."
                        className="textarea-input"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-submit-wrap">
                      <Button variant="primary" size="lg" type="submit" className="submit-inquiry-btn">
                        <span>Request Clinical Appointment</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
