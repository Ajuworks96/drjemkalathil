import React, { useState } from 'react';
import { CLINICAL_FAQS } from '../constants/content';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(CLINICAL_FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="editorial-faq-section" aria-labelledby="faq-main-title">
      <div className="editorial-container">
        {/* Section Eyebrow */}
        <div className="faq-eyebrow-row">
          <span className="faq-eyebrow-num">09</span>
          <span className="faq-eyebrow-line" aria-hidden="true" />
          <span className="faq-eyebrow-label">ESSENTIAL CLINICAL INQUIRIES</span>
        </div>

        {/* Monumental Headline */}
        <div className="faq-heading-block">
          <h2 id="faq-main-title" className="faq-display-title">
            CLINICAL CLARIFICATIONS<br />
            <span className="faq-title-sub">FOR PATIENTS AND CAREGIVERS</span>
          </h2>
          <p className="faq-lead-text">
            Straightforward, transparent counsel on surgical timing, record submission, margin safety, and what to expect during an independent oncological review.
          </p>
        </div>

        {/* Minimal Editorial Accordion (NO CARDS, NO ICONS, THIN HAIRLINES) */}
        <div className="editorial-accordion-list" role="region" aria-label="Clinical Clarifications Accordion">
          {CLINICAL_FAQS.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            const itemNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={faq.id}
                className={`accordion-editorial-row ${isOpen ? 'is-open' : ''}`}
              >
                {/* Hairline Divider */}
                <div className="accordion-hairline" aria-hidden="true" />

                <button
                  type="button"
                  className="accordion-trigger-button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  id={`faq-btn-${faq.id}`}
                  aria-controls={`faq-panel-${faq.id}`}
                >
                  <div className="accordion-title-cluster">
                    <span className="accordion-num-tag">{itemNumber}</span>
                    <span className="accordion-question-text">{faq.question}</span>
                  </div>

                  <div className="accordion-indicator" aria-hidden="true">
                    <span className="indicator-symbol">{isOpen ? '—' : '+'}</span>
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="accordion-content-panel"
                  >
                    <div className="content-inner-grid">
                      <div className="content-context-col">
                        <span className="context-badge">CLINICAL DOMAIN</span>
                        <span className="context-value">{faq.clinicalContext || 'Surgical Oncology Standard'}</span>
                      </div>
                      <div className="content-answer-col">
                        <p className="answer-prose">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Terminal Hairline */}
          <div className="accordion-hairline" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
