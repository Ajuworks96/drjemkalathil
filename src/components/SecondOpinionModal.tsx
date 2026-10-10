import React, { useState, useEffect } from 'react';
import { FormField } from './FormField';
import { FileUploader } from './FileUploader';
import type { SecondOpinionFormData, SubmissionResponse, FileRecord } from '../types';
import { CLINICAL_DOCTOR_INFO, WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';
import { trackFormStart, trackSecondOpinionSubmit } from '../utils/analytics';

export interface SecondOpinionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomainId?: string;
}

export const SecondOpinionModal: React.FC<SecondOpinionModalProps> = ({
  isOpen,
  onClose,
  initialDomainId,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<SecondOpinionFormData>({
    patientFullName: '',
    patientAge: '',
    patientGender: '',
    country: '',
    city: '',
    contactPhone: '',
    contactEmail: '',
    diagnosisCondition: '',
    currentTreatment: '',
    previousSurgery: '',
    treatingHospitalDoctor: '',
    specificClinicalQuestion: '',
    consultationMode: 'in-person-kochi',
    uploadedFiles: [],
    diagnosisCategory: initialDomainId ? (initialDomainId as any) : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);

  // Sync initial domain if provided
  useEffect(() => {
    if (initialDomainId) {
      setFormData((prev) => ({
        ...prev,
        diagnosisCategory: initialDomainId as any,
        diagnosisCondition:
          prev.diagnosisCondition ||
          (initialDomainId === 'peritoneal-hipec'
            ? 'Peritoneal Surface Malignancy / HIPEC Candidate'
            : initialDomainId === 'breast-oncology'
            ? 'Breast Cancer / Oncoplastic Evaluation'
            : initialDomainId === 'sarcoma-soft-tissue'
            ? 'Soft Tissue / Retroperitoneal Sarcoma'
            : ''),
      }));
    }
  }, [initialDomainId]);

  // Track form open/start
  useEffect(() => {
    if (isOpen) {
      trackFormStart(initialDomainId || 'homepage');
    }
  }, [isOpen, initialDomainId]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.patientFullName.trim()) {
      newErrors.patientFullName = 'Please provide the patient’s full name.';
    }
    if (!formData.patientAge.trim() || isNaN(Number(formData.patientAge))) {
      newErrors.patientAge = 'Please enter a valid age.';
    }
    if (!formData.contactPhone.trim() || formData.contactPhone.length < 8) {
      newErrors.contactPhone = 'Please provide a telephone or WhatsApp number with country code.';
    }
    if (!formData.contactEmail.trim() || !formData.contactEmail.includes('@')) {
      newErrors.contactEmail = 'Please provide a valid email address.';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Please enter your country.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.diagnosisCondition.trim()) {
      newErrors.diagnosisCondition = 'Please mention the diagnosis or condition.';
    }
    if (!formData.specificClinicalQuestion.trim()) {
      newErrors.specificClinicalQuestion =
        'Please let us know what you would like Dr. Jem Kalathil and the team to review or clarify.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Simulate backend submission + email notifications
    setTimeout(() => {
      const generatedRef = `HC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const response: SubmissionResponse = {
        referenceId: generatedRef,
        patientName: formData.patientFullName,
        patientEmail: formData.contactEmail,
        patientPhone: formData.contactPhone,
        receivedTimestamp: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        estimatedReviewTurnaround: '48 hours',
        consultationMode: formData.consultationMode,
      };

      setSubmissionResult(response);
      setIsSubmitting(false);

      // GA4 conversion tracking: only fires AFTER successful submission
      trackSecondOpinionSubmit(generatedRef, formData.consultationMode);

      // Email Workflow Simulation:
      // 1. Automatic patient acknowledgement email
      console.info('[Email Sent to Patient]', {
        to: formData.contactEmail,
        subject: `Hope & Clarity — Case Received [Ref: ${generatedRef}]`,
        referenceId: generatedRef,
        commitment: '48-hour response commitment',
      });

      // 2. Surgical team notification email
      console.info('[Email Sent to Surgical Team Desk]', {
        to: CLINICAL_DOCTOR_INFO.email,
        subject: `New Second Opinion Dossier [${generatedRef}] - ${formData.patientFullName}`,
        patient: formData.patientFullName,
        age: formData.patientAge,
        phone: formData.contactPhone,
        diagnosis: formData.diagnosisCondition,
        question: formData.specificClinicalQuestion,
        filesAttached: formData.uploadedFiles.length,
      });
    }, 900);
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setCurrentStep(1);
    setFormData({
      patientFullName: '',
      patientAge: '',
      patientGender: '',
      country: '',
      city: '',
      contactPhone: '',
      contactEmail: '',
      diagnosisCondition: '',
      currentTreatment: '',
      previousSurgery: '',
      treatingHospitalDoctor: '',
      specificClinicalQuestion: '',
      consultationMode: 'in-person-kochi',
      uploadedFiles: [],
    });
    setErrors({});
    onClose();
  };

  const cleanPhone = WHATSAPP_COORDINATOR_NUMBER.replace(/[^\d+]/g, '');
  const successWhatsappUrl = submissionResult
    ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
        `Hello, I have submitted my case to Hope & Clarity with Reference ID: ${submissionResult.referenceId} for ${submissionResult.patientName}.`
      )}`
    : `https://wa.me/${cleanPhone.replace('+', '')}`;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="so-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog simple-so-dialog">
        {/* Header */}
        <div className="modal-header simple-so-header">
          <div>
            <span className="simple-modal-eyebrow">DEPARTMENT OF SURGICAL ONCOLOGY</span>
            <h2 id="so-modal-title" className="modal-header-title">
              REQUEST A SECOND OPINION
            </h2>
            <p className="modal-header-sub">
              Share your medical information and questions with our team for review.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* 48-Hour Response Commitment Banner */}
        <div className="simple-modal-commitment-strip">
          <div className="commitment-strip-inner">
            <span className="strip-gold-tag">48-HOUR RESPONSE COMMITMENT</span>
            <span className="strip-text">
              Our oncology team reviews your information and responds within 48 hours.
            </span>
          </div>
        </div>

        <div className="modal-content-body">
          {submissionResult ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="simple-success-state">
              <div className="success-crest-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <span className="success-ref-code">CASE REFERENCE: {submissionResult.referenceId}</span>

              <h3 className="success-heading">CASE RECEIVED</h3>

              <p className="success-message">
                Thank you. Your information has been received by the Hope &amp; Clarity team.
              </p>

              <div className="success-promise-card">
                <span className="promise-title">48-HOUR RESPONSE PROMISE</span>
                <p className="promise-desc">
                  We aim to respond within 48 hours. Our clinical coordinator will review your submitted reports 
                  and reach out via WhatsApp / phone ({submissionResult.patientPhone}) with next steps.
                </p>
                <div className="promise-email-note">
                  An automatic confirmation has also been sent to <strong>{submissionResult.patientEmail}</strong>.
                </div>
              </div>

              <div className="success-actions">
                <a
                  href={successWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="simple-btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>WhatsApp the Department Coordinator</span>
                </a>

                <button
                  type="button"
                  className="simple-btn-primary"
                  onClick={handleReset}
                >
                  <span>Done &amp; Close</span>
                </button>
              </div>
            </div>
          ) : (
            /* TWO-STEP PATIENT FORM */
            <div>
              {/* Step indicator */}
              <div className="simple-step-indicator-bar">
                <div className={`step-dot-wrap ${currentStep === 1 ? 'active' : 'completed'}`}>
                  <span className="step-num-pill">1</span>
                  <span className="step-name">Your Details</span>
                </div>
                <div className="step-connecting-line" aria-hidden="true" />
                <div className={`step-dot-wrap ${currentStep === 2 ? 'active' : ''}`}>
                  <span className="step-num-pill">2</span>
                  <span className="step-name">About Your Case</span>
                </div>
              </div>

              {currentStep === 1 ? (
                /* STEP 1 — YOUR DETAILS */
                <form onSubmit={handleNextStep} noValidate>
                  <div className="form-section-intro">
                    <h3 className="form-step-title">Step 1 — Your Contact Details</h3>
                    <p className="form-step-sub">
                      Please enter your contact information so Dr. Jem Kalathil’s team can reach you.
                    </p>
                  </div>

                  <FormField
                    id="patientFullName"
                    label="Full Name"
                    required
                    error={errors.patientFullName}
                  >
                    <input
                      id="patientFullName"
                      type="text"
                      className={`form-input ${errors.patientFullName ? 'error' : ''}`}
                      placeholder="e.g. Ramesh Nair"
                      value={formData.patientFullName}
                      onChange={(e) =>
                        setFormData({ ...formData, patientFullName: e.target.value })
                      }
                      autoFocus
                    />
                  </FormField>

                  <div className="form-row-2col">
                    <FormField
                      id="patientAge"
                      label="Age"
                      required
                      error={errors.patientAge}
                    >
                      <input
                        id="patientAge"
                        type="text"
                        className={`form-input ${errors.patientAge ? 'error' : ''}`}
                        placeholder="e.g. 52"
                        value={formData.patientAge}
                        onChange={(e) =>
                          setFormData({ ...formData, patientAge: e.target.value })
                        }
                      />
                    </FormField>

                    <FormField id="patientGender" label="Gender">
                      <select
                        id="patientGender"
                        className="form-select"
                        value={formData.patientGender}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            patientGender: e.target.value as 'female' | 'male' | 'other' | '',
                          })
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </FormField>
                  </div>

                  <div className="form-row-2col">
                    <FormField
                      id="country"
                      label="Country"
                      required
                      error={errors.country}
                    >
                      <input
                        id="country"
                        type="text"
                        className={`form-input ${errors.country ? 'error' : ''}`}
                        placeholder="e.g. India, UAE, Oman, etc."
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                      />
                    </FormField>

                    <FormField id="city" label="City">
                      <input
                        id="city"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Kochi, Dubai, Muscat, etc."
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </FormField>
                  </div>

                  <div className="form-row-2col">
                    <FormField
                      id="contactPhone"
                      label="Phone / WhatsApp"
                      required
                      error={errors.contactPhone}
                      hint="Include country code (e.g. +91 94470 12345 or +971 50 123 4567)"
                    >
                      <input
                        id="contactPhone"
                        type="tel"
                        className={`form-input ${errors.contactPhone ? 'error' : ''}`}
                        placeholder="+91 94470 12345"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, contactPhone: e.target.value })
                        }
                      />
                    </FormField>

                    <FormField
                      id="contactEmail"
                      label="Email"
                      required
                      error={errors.contactEmail}
                      hint="Where we will send the review confirmation"
                    >
                      <input
                        id="contactEmail"
                        type="email"
                        className={`form-input ${errors.contactEmail ? 'error' : ''}`}
                        placeholder="patient.family@example.com"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, contactEmail: e.target.value })
                        }
                      />
                    </FormField>
                  </div>

                  <div className="form-modal-footer">
                    <button
                      type="button"
                      className="simple-btn-text"
                      onClick={onClose}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="simple-btn-primary"
                    >
                      <span>Continue to Case Information</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2 — ABOUT YOUR CASE */
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-section-intro">
                    <h3 className="form-step-title">Step 2 — About Your Case</h3>
                    <p className="form-step-sub">
                      Tell us about your diagnosis and what you would like Dr. Jem Kalathil to review.
                    </p>
                  </div>

                  <FormField
                    id="diagnosisCondition"
                    label="Diagnosis / Condition"
                    required
                    error={errors.diagnosisCondition}
                    hint="e.g. Breast cancer, Peritoneal carcinomatosis, Ovarian mass, Sarcoma, etc."
                  >
                    <input
                      id="diagnosisCondition"
                      type="text"
                      className={`form-input ${errors.diagnosisCondition ? 'error' : ''}`}
                      placeholder="e.g. Invasive breast cancer / advised total mastectomy"
                      value={formData.diagnosisCondition}
                      onChange={(e) =>
                        setFormData({ ...formData, diagnosisCondition: e.target.value })
                      }
                      autoFocus
                    />
                  </FormField>

                  <div className="form-row-2col">
                    <FormField
                      id="currentTreatment"
                      label="Current Treatment"
                      hint="e.g. Chemotherapy, hormone therapy, radiation, or not started"
                    >
                      <input
                        id="currentTreatment"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Completed 3 cycles of chemotherapy"
                        value={formData.currentTreatment}
                        onChange={(e) =>
                          setFormData({ ...formData, currentTreatment: e.target.value })
                        }
                      />
                    </FormField>

                    <FormField
                      id="previousSurgery"
                      label="Previous Surgery"
                      hint="e.g. Biopsy only, prior resection, or none"
                    >
                      <input
                        id="previousSurgery"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Core biopsy done 2 weeks ago"
                        value={formData.previousSurgery}
                        onChange={(e) =>
                          setFormData({ ...formData, previousSurgery: e.target.value })
                        }
                      />
                    </FormField>
                  </div>

                  <FormField
                    id="treatingHospitalDoctor"
                    label="Treating Hospital / Doctor"
                    hint="Optional — helps understand current clinical protocols"
                  >
                    <input
                      id="treatingHospitalDoctor"
                      type="text"
                      className="form-input"
                      placeholder="e.g. City Hospital, Oncology Dept."
                      value={formData.treatingHospitalDoctor}
                      onChange={(e) =>
                        setFormData({ ...formData, treatingHospitalDoctor: e.target.value })
                      }
                    />
                  </FormField>

                  {/* Crucial Patient Question Field */}
                  <FormField
                    id="specificClinicalQuestion"
                    label="What would you like Dr. Jem Kalathil / the team to review or clarify?"
                    required
                    error={errors.specificClinicalQuestion}
                    hint="Explain your concern in your own words (e.g. Can I avoid mastectomy? Is surgery feasible?)"
                  >
                    <textarea
                      id="specificClinicalQuestion"
                      rows={3}
                      className={`form-textarea ${errors.specificClinicalQuestion ? 'error' : ''}`}
                      placeholder="Please share what questions or doubts you have about your diagnosis or proposed surgery..."
                      value={formData.specificClinicalQuestion}
                      onChange={(e) =>
                        setFormData({ ...formData, specificClinicalQuestion: e.target.value })
                      }
                    />
                  </FormField>

                  {/* Medical Document Upload Box */}
                  <FileUploader
                    files={formData.uploadedFiles}
                    onFilesChange={(files: FileRecord[]) =>
                      setFormData({ ...formData, uploadedFiles: files })
                    }
                  />

                  {/* Privacy & Trust Notice */}
                  <div className="simple-privacy-box">
                    <div className="privacy-badge-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="privacy-text">
                      <p className="privacy-lead">
                        <strong>Your medical information is submitted securely for review by the Hope &amp; Clarity team.</strong>
                      </p>
                      <p className="privacy-links">
                        All clinical files and personal information are treated with strict oncological confidentiality.
                        See our <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Hope & Clarity respects patient confidentiality and complies with healthcare privacy standards.'); }}>Privacy Policy</a> and <a href="#disclaimer" onClick={(e) => { e.preventDefault(); alert('Disclaimer: This clinical second opinion is consultative and does not replace in-person emergency examination.'); }}>Medical Disclaimer</a>.
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="form-modal-footer">
                    <button
                      type="button"
                      className="simple-btn-text"
                      onClick={handlePrevStep}
                      disabled={isSubmitting}
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      className="simple-btn-primary"
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Submitting Your Case...' : 'SUBMIT MY CASE'}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
