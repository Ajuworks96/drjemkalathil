import React, { useState } from 'react';
import { Button } from '../components/Button';
import { WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';

export const DocumentUploadPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'female',
    cityCountry: '',
    phone: '',
    email: '',
    submitterRelation: 'self',
    cancerType: 'breast',
    currentStage: '',
    priorTreatment: '',
    specificQuestions: '',
    dicomLink: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; category: string }>>([
    { name: 'Core_Biopsy_Histopathology_Report.pdf', size: '2.4 MB', category: 'biopsy' },
    { name: 'PET_CT_Staging_Scan_Summary.pdf', size: '4.8 MB', category: 'imaging' },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedRef, setGeneratedRef] = useState('JK-89412');
  const [consentGiven, setConsentGiven] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileDrop = (category: string) => {
    const sampleNames: Record<string, string[]> = {
      biopsy: ['IHC_Receptor_Analysis.pdf', 'Surgical_Margin_Histopathology.pdf', 'Biopsy_Pathology_Report.pdf'],
      imaging: ['FullBody_PET_CT_Scan.pdf', 'Contrast_MRI_Pelvis.pdf', 'High_Res_CT_Abdomen.pdf'],
      notes: ['Operative_Summary_Prior_Surgery.pdf', 'Medical_Oncologist_Chemo_Protocol.pdf'],
    };
    const randomList = sampleNames[category] || ['Diagnostic_Medical_Scan.pdf'];
    const randomName = randomList[Math.floor(Math.random() * randomList.length)];
    setUploadedFiles((prev) => [
      ...prev,
      { name: randomName, size: `${(Math.random() * 3 + 1.2).toFixed(1)} MB`, category },
    ]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const refNum = `JK-${Math.floor(Math.random() * 89999 + 10000)}`;
    setGeneratedRef(refNum);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 850);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Jem Kalathil's Clinical Desk, I am uploading medical records for a second opinion consultation. Patient Name: ${formData.patientName || 'Patient'}. Reference ID: #${generatedRef}.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_COORDINATOR_NUMBER.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="subpage-wrapper">
      {/* 1. Page Header */}
      <section className="subpage-editorial-hero" aria-label="Medical Record Upload">
        <div className="editorial-container">
          <div className="subpage-breadcrumb">
            <span className="crumb-item">HOME</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-item">CLINICAL DOSSIER PORTAL</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">SECURE DOCUMENT UPLOAD</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="Aster Medcity Crest" className="hero-crest-img" />
              <span>256-BIT ENCRYPTED · STRICT CONFIDENTIALITY · ASTER MEDCITY</span>
            </div>
            <h1 className="subpage-title">
              Secure Medical Document Upload
            </h1>
            <p className="subpage-lead">
              Submit your pathology reports, imaging scans, and clinical summaries directly for review by <strong>Dr. Jem Kalathil</strong> and his senior surgical oncology panel at Aster Medcity.
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">256-bit</span>
              <span className="subpage-stat-label">Bank-Grade Encryption</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">24-48h</span>
              <span className="subpage-stat-label">Expert Review Turnaround</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Direct</span>
              <span className="subpage-stat-label">Reviewed by Dr. Jem's Panel</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Private</span>
              <span className="subpage-stat-label">Strict Patient Data Protection</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Upload Wizard Container */}
      <section className="upload-form-section">
        <div className="editorial-container">
          {isSubmitted ? (
            <div className="upload-success-monument">
              <div className="success-icon-badge">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <span className="success-reference-tag">DOSSIER REF: #{generatedRef}</span>
              <h2 className="success-heading">Medical Dossier Received Successfully</h2>
              <p className="success-message">
                Thank you, <strong>{formData.patientName || 'Patient'}</strong>. Your clinical records have been securely transmitted to Dr. Jem Kalathil’s surgical oncology desk at Aster Medcity, Kochi.
              </p>

              <div className="success-next-steps-card">
                <h3 className="next-steps-title">What Happens Next:</h3>
                <ol className="next-steps-list">
                  <li><strong>Clinical Nurse Triage (Within 2-4 Hours):</strong> Our oncology liaison nurse cross-checks imaging resolutions and biopsy histological markers.</li>
                  <li><strong>Dr. Jem's Surgical Review (24-48 Hours):</strong> Case analysis, organ-preservation assessment, and multidisciplinary tumor board scrutiny.</li>
                  <li><strong>Written Memorandum & Teleconsultation:</strong> You will be contacted via WhatsApp/Phone to schedule your 1-on-1 dialogue with Dr. Jem Kalathil.</li>
                </ol>
              </div>

              <div className="success-action-cluster">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-confirm-btn"
                >
                  <span className="whatsapp-dot">●</span>
                  <span>Notify Coordinator on WhatsApp (#{generatedRef})</span>
                </a>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                >
                  <span>Submit Another Case</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="upload-wizard-container">
              {/* Wizard Step Navigation Indicator */}
              <div className="dossier-wizard-nav" role="navigation" aria-label="Upload Steps">
                <button
                  type="button"
                  className={`wizard-step-pill ${currentStep === 1 ? 'is-active' : ''} ${currentStep > 1 ? 'is-complete' : ''}`}
                  onClick={() => setCurrentStep(1)}
                >
                  <span className="w-num">{currentStep > 1 ? '✓' : '1'}</span>
                  <span className="w-label">Demographics</span>
                </button>
                <span className="wizard-sep">→</span>

                <button
                  type="button"
                  className={`wizard-step-pill ${currentStep === 2 ? 'is-active' : ''} ${currentStep > 2 ? 'is-complete' : ''}`}
                  onClick={() => setCurrentStep(2)}
                >
                  <span className="w-num">{currentStep > 2 ? '✓' : '2'}</span>
                  <span className="w-label">Clinical Details</span>
                </button>
                <span className="wizard-sep">→</span>

                <button
                  type="button"
                  className={`wizard-step-pill ${currentStep === 3 ? 'is-active' : ''} ${currentStep > 3 ? 'is-complete' : ''}`}
                  onClick={() => setCurrentStep(3)}
                >
                  <span className="w-num">{currentStep > 3 ? '✓' : '3'}</span>
                  <span className="w-label">Upload Scans</span>
                </button>
                <span className="wizard-sep">→</span>

                <button
                  type="button"
                  className={`wizard-step-pill ${currentStep === 4 ? 'is-active' : ''}`}
                  onClick={() => setCurrentStep(4)}
                >
                  <span className="w-num">4</span>
                  <span className="w-label">Review & Submit</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="clinical-dossier-form">
                {/* STEP 1: PATIENT DEMOGRAPHICS */}
                {currentStep === 1 && (
                  <div className="form-section-card">
                    <div className="form-section-header">
                      <span className="form-step-num">01</span>
                      <div>
                        <h2 className="form-step-title">Patient Demographics & Direct Contact</h2>
                        <p className="form-step-desc">Who is this clinical second opinion consultation for?</p>
                      </div>
                    </div>

                    <div className="form-grid-2col">
                      <div className="input-field-group">
                        <label className="field-label" htmlFor="patientName">Patient Full Name *</label>
                        <input
                          id="patientName"
                          type="text"
                          name="patientName"
                          value={formData.patientName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Fathima Rahman / Anjali Nair"
                          className="text-input"
                        />
                      </div>

                      <div className="input-field-group">
                        <label className="field-label" htmlFor="age">Patient Age *</label>
                        <input
                          id="age"
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., 52"
                          className="text-input"
                        />
                      </div>

                      <div className="input-field-group">
                        <label className="field-label" htmlFor="gender">Gender *</label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="select-input"
                        >
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="input-field-group">
                        <label className="field-label" htmlFor="submitterRelation">Your Relationship to Patient *</label>
                        <select
                          id="submitterRelation"
                          name="submitterRelation"
                          value={formData.submitterRelation}
                          onChange={handleInputChange}
                          className="select-input"
                        >
                          <option value="self">I am the patient</option>
                          <option value="child">Son / Daughter</option>
                          <option value="spouse">Spouse / Partner</option>
                          <option value="relative">Close Family Member</option>
                          <option value="physician">Referring Oncologist / Physician</option>
                        </select>
                      </div>

                      <div className="input-field-group">
                        <label className="field-label" htmlFor="cityCountry">City & Country of Residence *</label>
                        <input
                          id="cityCountry"
                          type="text"
                          name="cityCountry"
                          value={formData.cityCountry}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Dubai, UAE / Muscat, Oman / Kochi, Kerala"
                          className="text-input"
                        />
                      </div>

                      <div className="input-field-group">
                        <label className="field-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+971 50 ... or +91 949..."
                          className="text-input"
                        />
                      </div>

                      <div className="input-field-group full-width-field">
                        <label className="field-label" htmlFor="email">Email Address (For Written Memorandum) *</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your.email@example.com"
                          className="text-input"
                        />
                      </div>
                    </div>

                    <div className="wizard-buttons-row">
                      <div />
                      <button
                        type="button"
                        className="wizard-next-btn"
                        onClick={handleNextStep}
                      >
                        <span>Continue to Step 2: Clinical Details</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CLINICAL BACKGROUND */}
                {currentStep === 2 && (
                  <div className="form-section-card">
                    <div className="form-section-header">
                      <span className="form-step-num">02</span>
                      <div>
                        <h2 className="form-step-title">Clinical Background & Diagnosis</h2>
                        <p className="form-step-desc">Summary of current clinical diagnosis, prior surgery, and proposed plan.</p>
                      </div>
                    </div>

                    <div className="form-grid-2col">
                      <div className="input-field-group">
                        <label className="field-label" htmlFor="cancerType">Primary Cancer Site / Condition *</label>
                        <select
                          id="cancerType"
                          name="cancerType"
                          value={formData.cancerType}
                          onChange={handleInputChange}
                          className="select-input"
                        >
                          <option value="breast">Breast Cancer (Invasive Ductal, DCIS, Lobular)</option>
                          <option value="hipec">Peritoneal Surface Spread (Colorectal, Ovarian, Appendix, PMP)</option>
                          <option value="sarcoma">Retroperitoneal / Extremity Soft Tissue Sarcoma</option>
                          <option value="gi">Gastrointestinal / Esophageal / Colorectal Cancer</option>
                          <option value="other">Other Complex or Borderline Malignancy</option>
                        </select>
                      </div>

                      <div className="input-field-group">
                        <label className="field-label" htmlFor="currentStage">Current Stage (If Known)</label>
                        <input
                          id="currentStage"
                          type="text"
                          name="currentStage"
                          value={formData.currentStage}
                          onChange={handleInputChange}
                          placeholder="e.g., Stage IIB, Stage IV peritoneal, or Not yet staged"
                          className="text-input"
                        />
                      </div>

                      <div className="input-field-group full-width-field">
                        <label className="field-label" htmlFor="priorTreatment">Prior Treatments Received or Current Doctor's Surgical Recommendation</label>
                        <textarea
                          id="priorTreatment"
                          name="priorTreatment"
                          rows={3}
                          value={formData.priorTreatment}
                          onChange={handleInputChange}
                          placeholder="e.g., Biopsy confirmed invasive ductal carcinoma; local doctor recommended modified radical mastectomy; we wish to explore oncoplastic conservation."
                          className="textarea-input"
                        />
                      </div>

                      <div className="input-field-group full-width-field">
                        <label className="field-label" htmlFor="specificQuestions">Specific Questions for Dr. Jem Kalathil</label>
                        <textarea
                          id="specificQuestions"
                          name="specificQuestions"
                          rows={3}
                          value={formData.specificQuestions}
                          onChange={handleInputChange}
                          placeholder="e.g., Is breast preservation possible? Is heated intraperitoneal chemotherapy (HIPEC) beneficial in my stage? Are there nerve/sphincter-sparing robotic options?"
                          className="textarea-input"
                        />
                      </div>
                    </div>

                    <div className="wizard-buttons-row">
                      <button
                        type="button"
                        className="wizard-prev-btn"
                        onClick={handlePrevStep}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Demographics</span>
                      </button>

                      <button
                        type="button"
                        className="wizard-next-btn"
                        onClick={handleNextStep}
                      >
                        <span>Continue to Step 3: Upload Scans</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: UPLOAD SCANS & REPORTS */}
                {currentStep === 3 && (
                  <div className="form-section-card">
                    <div className="form-section-header">
                      <span className="form-step-num">03</span>
                      <div>
                        <h2 className="form-step-title">Upload Diagnostic Scans & Pathology Reports</h2>
                        <p className="form-step-desc">Attach digital reports (PDF, JPG) or paste cloud drive links for heavy DICOM scan series.</p>
                      </div>
                    </div>

                    <div className="dropzones-grid">
                      <div
                        className="dropzone-box"
                        onClick={() => handleFileDrop('biopsy')}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="dropzone-icon">📄</span>
                        <span className="dropzone-title">Histopathology Reports</span>
                        <span className="dropzone-formats">Biopsy, IHC markers, cytology (PDF)</span>
                        <span className="dropzone-action-btn">+ Click to Attach</span>
                      </div>

                      <div
                        className="dropzone-box"
                        onClick={() => handleFileDrop('imaging')}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="dropzone-icon">🔬</span>
                        <span className="dropzone-title">Radiology Scans</span>
                        <span className="dropzone-formats">PET-CT, MRI, CT scan reports (PDF)</span>
                        <span className="dropzone-action-btn">+ Click to Attach</span>
                      </div>

                      <div
                        className="dropzone-box"
                        onClick={() => handleFileDrop('notes')}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="dropzone-icon">📋</span>
                        <span className="dropzone-title">Clinical Notes</span>
                        <span className="dropzone-formats">Prior operative notes, discharge summaries</span>
                        <span className="dropzone-action-btn">+ Click to Attach</span>
                      </div>
                    </div>

                    {/* Attached files list */}
                    {uploadedFiles.length > 0 && (
                      <div className="attached-files-container">
                        <span className="attached-heading">Attached Files Ready for Review ({uploadedFiles.length}):</span>
                        <div className="attached-files-list">
                          {uploadedFiles.map((file, idx) => (
                            <div key={idx} className="attached-file-pill">
                              <div className="file-info-group">
                                <span className="file-cat-tag">{file.category.toUpperCase()}</span>
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">({file.size})</span>
                              </div>
                              <button
                                type="button"
                                className="remove-file-btn"
                                onClick={() => handleRemoveFile(idx)}
                                title="Remove file"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cloud Drive DICOM Link for large scans */}
                    <div className="input-field-group full-width-field" style={{ marginTop: '24px' }}>
                      <label className="field-label" htmlFor="dicomLink">
                        Heavy Scans (2GB+ PET-CT/MRI DICOM Series)? Provide Cloud Drive Link
                      </label>
                      <input
                        id="dicomLink"
                        type="url"
                        name="dicomLink"
                        value={formData.dicomLink}
                        onChange={handleInputChange}
                        placeholder="Google Drive / WeTransfer / Dropbox shareable link"
                        className="text-input"
                      />
                      <span className="field-hint">
                        Our radiology desk will download the slice series directly for Dr. Jem Kalathil's screen examination.
                      </span>
                    </div>

                    {/* Direct WhatsApp Coordinator Alternative */}
                    <div className="whatsapp-help-box">
                      <div className="wa-help-icon">💬</div>
                      <div className="wa-help-text">
                        <strong>Prefer uploading via WhatsApp?</strong>
                        <p>You can send your scans directly to our Chief Oncology Coordinator at <strong>+91 949 771 2345</strong>.</p>
                      </div>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wa-help-link"
                      >
                        Send via WhatsApp →
                      </a>
                    </div>

                    <div className="wizard-buttons-row">
                      <button
                        type="button"
                        className="wizard-prev-btn"
                        onClick={handlePrevStep}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Clinical Details</span>
                      </button>

                      <button
                        type="button"
                        className="wizard-next-btn"
                        onClick={handleNextStep}
                      >
                        <span>Continue to Step 4: Review & Submit</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: REVIEW & CONFIDENTIAL TRANSMISSION */}
                {currentStep === 4 && (
                  <div className="form-section-card">
                    <div className="form-section-header">
                      <span className="form-step-num">04</span>
                      <div>
                        <h2 className="form-step-title">Review & Secure Transmission</h2>
                        <p className="form-step-desc">Verify your consultation dossier parameters before sending to Dr. Jem Kalathil.</p>
                      </div>
                    </div>

                    {/* Summary Review Card */}
                    <div className="review-summary-card">
                      <span className="summary-card-title">DOSSIER REVIEW SUMMARY</span>
                      <div className="summary-grid">
                        <div className="summary-item">
                          <span className="s-label">Patient Name:</span>
                          <span className="s-val">{formData.patientName || 'Not specified'}</span>
                        </div>
                        <div className="summary-item">
                          <span className="s-label">Age & Gender:</span>
                          <span className="s-val">{formData.age ? `${formData.age} yrs` : '—'}, {formData.gender}</span>
                        </div>
                        <div className="summary-item">
                          <span className="s-label">Residence:</span>
                          <span className="s-val">{formData.cityCountry || 'Not specified'}</span>
                        </div>
                        <div className="summary-item">
                          <span className="s-label">Contact Phone:</span>
                          <span className="s-val">{formData.phone || 'Not specified'}</span>
                        </div>
                        <div className="summary-item">
                          <span className="s-label">Clinical Category:</span>
                          <span className="s-val">{formData.cancerType.toUpperCase()}</span>
                        </div>
                        <div className="summary-item">
                          <span className="s-label">Attached Files:</span>
                          <span className="s-val">{uploadedFiles.length} file(s) attached</span>
                        </div>
                      </div>
                    </div>

                    {/* Medical Confidentiality Agreement */}
                    <div className="consent-statement-box">
                      <p>
                        <strong>Patient Confidentiality & Data Stewardship:</strong> By transmitting these medical records, you authorize Dr. Jem Kalathil and the Department of Surgical Oncology at Aster Medcity to evaluate your diagnostic reports for clinical triage and second opinion purposes. All records are stored on secure, encrypted hospital servers complying with Indian medical record ethics and international confidentiality standards.
                      </p>
                      <label className="consent-checkbox-row">
                        <input
                          type="checkbox"
                          checked={consentGiven}
                          onChange={(e) => setConsentGiven(e.target.checked)}
                          required
                        />
                        <span>I confirm that I am authorized to submit these medical records and agree to clinical evaluation.</span>
                      </label>
                      <p className="emergency-disclaimer">
                        * Immediate Emergency Notice: If the patient is experiencing acute distress, uncontrolled hemorrhage, or severe breathing difficulties, please proceed to the nearest emergency tertiary hospital immediately.
                      </p>
                    </div>

                    <div className="wizard-buttons-row">
                      <button
                        type="button"
                        className="wizard-prev-btn"
                        onClick={handlePrevStep}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Upload Scans</span>
                      </button>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="submit-dossier-btn"
                        disabled={isSubmitting || !consentGiven}
                      >
                        {isSubmitting ? (
                          <span>Transmitting Dossier Securely...</span>
                        ) : (
                          <>
                            <span>Transmit Dossier to Dr. Jem Kalathil</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
