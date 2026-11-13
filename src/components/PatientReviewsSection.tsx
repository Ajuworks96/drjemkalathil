import React, { useEffect, useState } from 'react';
import { fetchPatientReviews, type PatientReview } from '../services/sanity';

export const PatientReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<PatientReview[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchPatientReviews()
      .then((data) => {
        if (isMounted) {
          setReviews(data);
        }
      })
      .catch((err) => {
        console.warn('Could not load reviews:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="patient-reviews-section" aria-label="Patient Experiences and Verified Reviews">
      <div className="section-container">
        
        {/* Header Block */}
        <div className="reviews-section-header">
          <div className="reviews-eyebrow-pill" role="status">
            <span className="pill-gold-dot" aria-hidden="true" />
            <span>Clinical Trust &amp; Verified Experiences</span>
          </div>

          <h2 className="reviews-main-title">
            Patient Voices &amp; <span className="title-gold-italic">Surgical Outcomes.</span>
          </h2>

          <p className="reviews-sub-description">
            Transparent reflections from patients and families who navigated critical breast oncoplasty, advanced HIPEC cytoreduction, and second opinions under Dr. Jem Kalathil at Aster Medcity.
          </p>

          <div className="reviews-aggregate-bar">
            <div className="aggregate-stars" aria-label="5.0 out of 5 stars based on verified clinical outcomes">
              ★★★★★
            </div>
            <span className="aggregate-score">5.0 / 5.0</span>
            <span className="aggregate-divider" aria-hidden="true">·</span>
            <span className="aggregate-metric">30+ Years Leadership</span>
            <span className="aggregate-divider" aria-hidden="true">·</span>
            <span className="aggregate-location">Aster Medcity, Kochi &amp; Overseas GCC</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-cards-grid">
          {reviews.map((rev) => (
            <article key={rev.id} className="review-luxury-card" itemScope itemType="https://schema.org/Review">
              <div className="card-top-row">
                <div className="card-stars-row" aria-label={`${rev.rating} out of 5 stars`} itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content={String(rev.rating)} />
                  <meta itemProp="bestRating" content="5" />
                  {'★'.repeat(Math.min(5, Math.max(1, rev.rating)))}
                </div>
                <span className="card-treatment-tag">{rev.surgeryType}</span>
              </div>

              <blockquote className="review-quote-text" itemProp="reviewBody">
                &ldquo;{rev.reviewText}&rdquo;
              </blockquote>

              <div className="card-author-footer">
                <div className="author-avatar-initial" aria-hidden="true">
                  {rev.patientName.charAt(0)}
                </div>
                <div className="author-meta" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div className="author-name-row">
                    <span className="author-name" itemProp="name">{rev.patientName}</span>
                    {rev.isVerified && (
                      <span className="verified-pill" title="Verified Surgical Case Review">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Verified Case</span>
                      </span>
                    )}
                  </div>
                  <div className="author-sub-line">
                    {rev.location && <span className="author-loc">{rev.location}</span>}
                    {rev.location && rev.date && <span className="author-sep" aria-hidden="true">·</span>}
                    {rev.date && <span className="author-date">{rev.date}</span>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="reviews-disclaimer-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span>All reviews reflect voluntary testimonials and verified clinical second opinion outcomes under Dr. Jem Kalathil. Individual surgical prognoses vary based on staging, pathology, and multidisciplinary tumor board review.</span>
        </div>

      </div>
    </section>
  );
};
