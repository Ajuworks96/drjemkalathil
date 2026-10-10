import React, { useState } from 'react';

interface FaqItemData {
  number: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItemData[] = [
  {
    number: '01',
    question: 'Can I request a second opinion if I am already receiving treatment?',
    answer:
      'Yes. Many patients reach out during ongoing chemotherapy, following an initial biopsy, or prior to scheduled surgery. A second opinion can validate your current treatment protocol, verify surgical margins, or introduce alternative organ-preserving or minimally invasive approaches before definitive interventions.',
  },
  {
    number: '02',
    question: 'What records should I submit?',
    answer:
      'To provide a comprehensive clinical assessment, we recommend submitting: (1) Formal histopathology / biopsy reports; (2) Recent radiological imaging (PET-CT, MRI, or contrast-enhanced CT scans); (3) Prior operative notes if earlier surgeries occurred; and (4) Your most recent medical oncology treatment summary.',
  },
  {
    number: '03',
    question: 'Can patients outside Kerala submit their case?',
    answer:
      'Yes. A significant portion of our second-opinion reviews are conducted for patients residing across the United Arab Emirates, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain, and other Indian states. You can submit your digital records remotely, and our surgical oncology team will conduct an independent evaluation before any travel is arranged.',
  },
  {
    number: '04',
    question: 'How quickly will the team respond?',
    answer:
      'Our dedicated oncology coordinators acknowledge your case submission within hours. Once complete clinical imaging and pathology reports are received, Dr. Jem Kalathil and the surgical panel deliver a detailed review and clear clinical recommendation within our 48-hour response commitment.',
  },
];

export const ClinicalClarificationsAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default for immediate context

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="clinical-faq-editorial-section" aria-label="Clinical Clarifications for Patients and Caregivers">
      <div className="editorial-container">
        <header className="faq-editorial-header">
          <span className="editorial-gold-kicker">FOR PATIENTS AND CAREGIVERS</span>
          <h2 className="faq-editorial-title">CLINICAL CLARIFICATIONS</h2>
        </header>

        {/* Large Horizontal Editorial Accordion Rows */}
        <div className="faq-editorial-accordion-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.number}
                className={`faq-editorial-row ${isOpen ? 'is-active-row' : ''}`}
              >
                <button
                  type="button"
                  className="faq-row-trigger"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-row-num" aria-hidden="true">{item.number}</span>
                  <span className="faq-row-question">{item.question}</span>
                  <span className="faq-row-sign" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  className="faq-row-body"
                  style={{
                    maxHeight: isOpen ? '400px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="faq-row-body-inner">
                    <p className="faq-row-answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
