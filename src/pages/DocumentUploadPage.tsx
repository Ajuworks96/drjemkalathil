import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CLINICAL_DOCTOR_INFO } from '../constants/content';

export const DocumentUploadPage: React.FC = () => {
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
    dicomLink: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; category: string }>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileDrop = (category: string) => {
    // Simulated upload demonstration
    const sampleNames: Record<string, string[]> = {
      biopsy: ['Biopsy_IHC_Report_Aster.pdf', 'Histopathology_Final.pdf'],
      imaging: ['PET_CT_FullBody_Report.pdf', 'Contrast_MRI_Scan.pdf'],
      notes: ['Clinical_Discharge_Summary.pdf', 'Primary_Oncologist_Note.pdf']
    };
    const randomName = sampleNames[category]?.[Math.floor(Math.random() * 2)] || 'Medical_Record.pdf';
    setUploadedFiles((prev) => [
      ...prev,
      { name: randomName, size: '2.4 MB', category }
    ]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 900);
  };

  return (
    <div className="subpage-wrapper">
      {/* 1. Page Header */}
      <section className="subpage-editorial-hero" aria-label="Medical Record Upload">
        <div className="editorial-container">
          <div className="subpage-hero-meta">
            <span className="subpage-kicker">CONFIDENTIAL CLINICAL DOSSIER INTAKE</span>
            <h1 className="subpage-title">
              Secure Medical Document Upload
            </h1>
            <p className="subpage-lead">
              Submit your pathology reports, imaging scans, and clinical summaries directly for review by Dr. Jem Kalathil and his senior surgical oncology team at Aster Medcity.
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">256-bit</span>
              <span className="subpage-stat-label">Encrypted Data Transfer</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">24-48h</span>
              <span className="subpage-stat-label">Review Turnaround</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Direct</span>
              <span className="subpage-stat-label">Handled by Dr. Jem’s Team</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Private</span>
              <span className="subpage-stat-label">Strict Patient Confidentiality</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Upload Form Container */}
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

              <span className="success-reference-tag">DOSSIER REF: #JK-{(Math.random() * 89999 + 10000).toFixed(0)}</span>
              <h2 className="success-heading">Medical Dossier Received Successfully</h2>
              <p className="success-message">
                Thank you, <strong>{formData.patientName || 'Patient'}</strong>. Your clinical documents have been securely transmitted to Dr. Jem Kalathil’s surgical desk at Aster Medcity.
              </p>

              <div className="success-next-steps-card">
                <h3 className="next-steps-title">What Happens Next:</h3>
                <ol className="next-steps-list">
                  <li><strong>Clinical Verification:</strong> Our oncology coordinator will verify all uploaded pathology and imaging files within 12 hours.</li>
                  <li><strong>Dr. Jem Kalathil's Evaluation:</strong> Dr. Jem will evaluate resectability, organ-preserving feasibility, and staging.</li>
                  <li><strong>Liaison Call:</strong> We will contact you at <strong>{formData.phone || CLINICAL_DOCTOR_INFO.secretaryPhone}</strong> to schedule your unhurried discussion and provide your written clinical summary.</li>
                </ol>
              </div>

              <div className="success-action-cluster">
                <a
                  href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
                  className="btn btn-secondary"
                >
                  <span>Call Clinical Secretary: {CLINICAL_DOCTOR_INFO.secretaryPhone}</span>
                </a>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setIsSubmitted(false);
                    setUploadedFiles([]);
                  }}
                >
                  <span>Submit Another Document</span>
                </button>
              </div>
            </div>
          ) : (
            <form className="clinical-dossier-form" onSubmit={handleSubmit}>
              {/* Step 1: Patient Information */}
              <div className="form-section-card">
                <div className="form-section-header">
                  <span className="form-step-num">01</span>
                  <div>
                    <h3 className="form-step-title">Patient Demographics & Contact</h3>
                    <p className="form-step-desc">Who is the medical consultation for?</p>
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="input-field-group">
                    <label className="field-label" htmlFor="patientName">Patient Full Name *</label>
                    <input
                      id="patientName"
                      name="patientName"
                      type="text"
                      required
                      placeholder="e.g., Fathima Rahman"
                      className="text-input"
                      value={formData.patientName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="age">Patient Age *</label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      required
                      min="1"
                      max="120"
                      placeholder="e.g., 54"
                      className="text-input"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      className="select-input"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="cityCountry">City & Country of Residence *</label>
                    <input
                      id="cityCountry"
                      name="cityCountry"
                      type="text"
                      required
                      placeholder="e.g., Dubai, UAE / Kochi, Kerala"
                      className="text-input"
                      value={formData.cityCountry}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+971 50 123 4567 or +91 98460..."
                      className="text-input"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="text-input"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Clinical Context */}
              <div className="form-section-card">
                <div className="form-section-header">
                  <span className="form-step-num">02</span>
                  <div>
                    <h3 className="form-step-title">Clinical Background & Diagnosis</h3>
                    <p className="form-step-desc">Summary of current clinical diagnosis and proposed treatment.</p>
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="input-field-group">
                    <label className="field-label" htmlFor="cancerType">Primary Cancer Site / Condition *</label>
                    <select
                      id="cancerType"
                      name="cancerType"
                      className="select-input"
                      value={formData.cancerType}
                      onChange={handleInputChange}
                    >
                      <option value="breast">Breast Cancer / Suspected Breast Mass</option>
                      <option value="hipec">Peritoneal Carcinomatosis / Ovarian / Appendix (HIPEC)</option>
                      <option value="gi">Gastrointestinal (Stomach, Esophagus, Colon, Rectum)</option>
                      <option value="thoracic">Thoracic / Lung / Mediastinal</option>
                      <option value="other">Other Solid Tumor / Rare Malignancy</option>
                    </select>
                  </div>

                  <div className="input-field-group">
                    <label className="field-label" htmlFor="currentStage">Current Stage (If Known)</label>
                    <input
                      id="currentStage"
                      name="currentStage"
                      type="text"
                      placeholder="e.g., Stage IIB, or Not yet staged"
                      className="text-input"
                      value={formData.currentStage}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-field-group full-width-field">
                  <label className="field-label" htmlFor="priorTreatment">Prior Treatments Received or Current Doctor’s Recommendation</label>
                  <textarea
                    id="priorTreatment"
                    name="priorTreatment"
                    rows={3}
                    placeholder="e.g., Biopsy done 2 weeks ago; Doctor recommended modified radical mastectomy; Looking to explore oncoplastic conservation."
                    className="textarea-input"
                    value={formData.priorTreatment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Step 3: Document Attachments */}
              <div className="form-section-card">
                <div className="form-section-header">
                  <span className="form-step-num">03</span>
                  <div>
                    <h3 className="form-step-title">Upload Medical Reports & Scans</h3>
                    <p className="form-step-desc">Attach PDFs, clear photos of reports, or DICOM cloud links.</p>
                  </div>
                </div>

                <div className="upload-dropzone-grid">
                  {/* Category 1: Biopsy & Pathology */}
                  <div className="dropzone-box" onClick={() => handleFileDrop('biopsy')}>
                    <div className="dropzone-icon">📄</div>
                    <span className="dropzone-title">Biopsy & Histopathology</span>
                    <span className="dropzone-sub">IHC markers, ER/PR/HER2, Ki-67</span>
                    <button type="button" className="dropzone-upload-btn">+ Add File</button>
                  </div>

                  {/* Category 2: Imaging & Scans */}
                  <div className="dropzone-box" onClick={() => handleFileDrop('imaging')}>
                    <div className="dropzone-icon">🔬</div>
                    <span className="dropzone-title">Radiology Scan Reports</span>
                    <span className="dropzone-sub">PET-CT, MRI, CT Scan, Mammogram</span>
                    <button type="button" className="dropzone-upload-btn">+ Add File</button>
                  </div>

                  {/* Category 3: Clinical Notes */}
                  <div className="dropzone-box" onClick={() => handleFileDrop('notes')}>
                    <div className="dropzone-icon">📋</div>
                    <span className="dropzone-title">Discharge / Clinic Notes</span>
                    <span className="dropzone-sub">Prior surgery summary, chemo chart</span>
                    <button type="button" className="dropzone-upload-btn">+ Add File</button>
                  </div>
                </div>

                {/* DICOM link input */}
                <div className="input-field-group full-width-field" style={{ marginTop: '16px' }}>
                  <label className="field-label" htmlFor="dicomLink">Google Drive / WeTransfer / DICOM Scan Link (Optional)</label>
                  <input
                    id="dicomLink"
                    name="dicomLink"
                    type="url"
                    placeholder="https://drive.google.com/..."
                    className="text-input"
                    value={formData.dicomLink}
                    onChange={handleInputChange}
                  />
                  <span className="field-hint">For large imaging DICOM CDs, paste a shared Drive/Dropbox/WeTransfer link.</span>
                </div>

                {/* Attached Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="attached-files-container">
                    <span className="attached-header">Attached Medical Files ({uploadedFiles.length})</span>
                    <div className="attached-files-list">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="attached-file-pill">
                          <span className="file-pill-icon">✓</span>
                          <span className="file-pill-name">{f.name}</span>
                          <span className="file-pill-size">({f.size})</span>
                          <button
                            type="button"
                            className="file-remove-btn"
                            onClick={() => handleRemoveFile(i)}
                            title="Remove file"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4: Specific Clinical Questions */}
              <div className="form-section-card">
                <div className="form-section-header">
                  <span className="form-step-num">04</span>
                  <div>
                    <h3 className="form-step-title">Specific Questions for Dr. Jem Kalathil</h3>
                    <p className="form-step-desc">What is the most critical question you need clarified?</p>
                  </div>
                </div>

                <div className="input-field-group full-width-field">
                  <textarea
                    id="specificQuestions"
                    name="specificQuestions"
                    rows={4}
                    required
                    placeholder="e.g., 1. Can we perform breast conservation surgery instead of total mastectomy? 2. Is HIPEC recommended for this extent of peritoneal involvement? 3. Should we complete chemotherapy before surgery?"
                    className="textarea-input"
                    value={formData.specificQuestions}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-privacy-notice">
                  <div className="privacy-lock-icon">🔒</div>
                  <div className="privacy-text-wrap">
                    <strong>Medical Confidentiality Protected:</strong> Your health records are encrypted and handled strictly within Dr. Jem Kalathil's clinical oncology team at Aster Medcity under institutional medical data protection protocols.
                  </div>
                </div>

                <div className="form-submit-row">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="submit-dossier-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Securing & Transmitting...' : 'Submit Dossier for Clinical Review'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
