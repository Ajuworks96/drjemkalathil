import React, { useState } from 'react';
import { PREPARATION_CHECKLIST } from '../constants/content';

export const PatientChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCount = PREPARATION_CHECKLIST.length;

  return (
    <section id="preparation" className="editorial-guide-section" aria-labelledby="records-guide-title">
      <div className="editorial-container">
        {/* Editorial Guide Header */}
        <div className="guide-header-layout">
          <div className="guide-header-left">
            <div className="guide-eyebrow">
              <span className="guide-eyebrow-num">04</span>
              <span className="guide-eyebrow-rule" aria-hidden="true" />
              <span className="guide-eyebrow-text">DIAGNOSTIC DOSSIER STANDARDS</span>
            </div>

            <h2 id="records-guide-title" className="guide-main-headline">
              PREPARING YOUR<br />DIAGNOSTIC RECORDS<br />FOR REVIEW
            </h2>
          </div>

          <div className="guide-header-right">
            <p className="guide-intro-prose">
              A surgical oncologist operates on physical anatomy and cellular pathology, not general summaries. To ensure Dr. Jem Kalathil can scrutinize margins with millimeter precision, assemble these primary clinical records.
            </p>

            {/* Subtle Preparation Status Bar */}
            <div className="guide-status-bar" role="status" aria-live="polite">
              <div className="status-bar-info">
                <span className="status-count-label">
                  DOSSIER READINESS: <strong>{completedCount} OF {totalCount}</strong> RECORD TYPES MARKED
                </span>
                <span className="status-hint">Click any record type to track readiness</span>
              </div>
              <div className="status-progress-track">
                <div
                  className="status-progress-fill"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Printed Medical Guide Translated to Digital: Elegant List with Thin Dividers (NO CARDS) */}
        <div className="editorial-records-list" role="list" aria-label="Diagnostic Records Preparation Checklist">
          {PREPARATION_CHECKLIST.map((item, index) => {
            const isChecked = !!checkedIds[item.id];
            const itemNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={item.id}
                role="listitem"
                className={`record-editorial-entry ${isChecked ? 'is-marked' : ''}`}
                onClick={() => toggleItem(item.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
              >
                {/* Thin Top Hairline Divider */}
                <div className="entry-hairline-rule" aria-hidden="true" />

                <div className="entry-row-grid">
                  {/* Left Column: Number & Checkbox State */}
                  <div className="entry-num-col">
                    <span className="entry-num-display">{itemNumber}</span>
                    <span className="entry-checkbox-custom" aria-hidden="true">
                      {isChecked ? '✓' : ''}
                    </span>
                  </div>

                  {/* Middle Column: Title & One-Line Explanation */}
                  <div className="entry-content-col">
                    <div className="entry-title-wrap">
                      <span className="entry-category-meta">{item.category}</span>
                      <h3 className="entry-title-text">{item.label}</h3>
                    </div>

                    <p className="entry-explanation-line">
                      {item.description}
                    </p>

                    {/* Expandable / Vital Components List */}
                    <div className="entry-vital-details">
                      <span className="vital-tag">Essential Inclusions:</span>
                      <ul className="vital-items-inline">
                        {item.vitalComponents.map((component, idx) => (
                          <li key={idx} className="vital-inline-item">
                            {component}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Why Dr. Kalathil Needs This */}
                  <div className="entry-rationale-col">
                    <div className="rationale-inner">
                      <span className="rationale-tag">SURGICAL PURPOSE</span>
                      <p className="rationale-text">{item.whyItMatters}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Terminal Divider */}
          <div className="entry-hairline-rule" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
