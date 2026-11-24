import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchWordpressPostBySlug, type WPPost } from '../services/wordpress';
import { useSiteContent } from '../context/SiteContentContext';

export interface ArticleDetailPageProps {
  onRequestSecondOpinion?: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ onRequestSecondOpinion }) => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { siteSettings } = useSiteContent();

  useEffect(() => {
    let isMounted = true;
    if (!slug) return;

    setLoading(true);
    fetchWordpressPostBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setPost(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn(`Could not load article for slug: ${slug}`, err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Dynamic SEO metadata injection for Google indexing & social cards
  useEffect(() => {
    if (!post) return;

    const originalTitle = document.title;
    const pageTitle = post.seo?.title || `${post.title} | Dr. Jem Kalathil`;
    document.title = pageTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc && post.seo?.description) {
      metaDesc.setAttribute('content', post.seo.description);
    }

    // Dynamic Article Schema.org for Google Search E-E-A-T
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'article-structured-data';
    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      headline: post.title,
      description: post.seo?.description || post.excerpt.replace(/<[^>]+>/g, '').trim(),
      datePublished: post.date,
      image: post.featuredImage || 'https://drjemkalathil.vercel.app/images/clinical_case_review.jpg',
      author: {
        '@type': 'Physician',
        name: post.authorName || 'Dr. Jem Kalathil',
        jobTitle: 'Surgical Oncologist',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Dr. Jem Kalathil Surgical Oncology',
        url: 'https://drjemkalathil.vercel.app',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href,
      },
    });
    document.head.appendChild(schemaScript);

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc);
      const existingSchema = document.getElementById('article-structured-data');
      if (existingSchema) existingSchema.remove();
    };
  }, [post]);

  if (loading) {
    return (
      <div className="article-reader-loading">
        <div className="loading-spinner" aria-hidden="true" />
        <p>Fetching clinical perspective from Dr. Jem Kalathil's archive...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="article-reader-not-found">
        <div className="section-container">
          <h2>Clinical Perspective Not Found</h2>
          <p>The requested surgical article could not be located or may have been archived.</p>
          <Link to="/articles" className="return-articles-btn">
            &larr; Back to All Clinical Insights
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Jem Kalathil's Clinical Desk, I am reading the article "${post.title}" and would like to enquire about a second opinion consultation.`
  );
  const whatsappUrl = `https://wa.me/${siteSettings.whatsappPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <article className="article-reader-page">
      {/* 01. LUXURY EDITORIAL ARTICLE HEADER */}
      <header className="article-reader-header">
        <div className="editorial-container">
          <nav className="article-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/articles">Clinical Insights</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{post.title}</span>
          </nav>

          <div className="article-meta-pill-row">
            <span className="meta-category-tag">{post.categoryName}</span>
            <span className="meta-bullet" aria-hidden="true">&bull;</span>
            <span className="meta-read-time">⏱ {post.readTimeMinutes} min clinical read</span>
            <span className="meta-bullet" aria-hidden="true">&bull;</span>
            <span className="meta-published-date">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="article-reader-title">{post.title}</h1>

          {post.excerpt && (
            <div
              className="article-reader-standfirst"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}

          <div className="article-author-byline">
            <img
              src="/images/dr_jem_kalathil.jpg"
              alt="Dr. Jem Kalathil"
              className="byline-avatar"
              width="50"
              height="50"
            />
            <div className="byline-details">
              <span className="byline-name">{post.authorName}</span>
              <span className="byline-title">
                MS, FRCS (Edin) &bull; Surgical Oncologist
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 02. FEATURED CLINICAL PHOTOGRAPHY HERO */}
      {post.featuredImage && (
        <section className="article-featured-hero-section">
          <div className="editorial-container">
            <div className="article-featured-hero-frame">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="article-featured-hero-img"
                loading="eager"
              />
              <div className="featured-hero-overlay" />
              <div className="featured-hero-badge">
                <span className="live-dot" aria-hidden="true">●</span>
                <span>CLINICAL PERSPECTIVE · SURGICAL ONCOLOGY</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 03. ARTICLE CONTENT (2-COLUMN EDITORIAL GRID) */}
      <section className="article-reader-content">
        <div className="editorial-container">
          <div className="article-reader-layout-grid">
            {/* Left: Main Prose Column */}
            <div className="article-main-column">
              <div
                className="article-body-prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Key Clinical Takeaways Box */}
              <div className="article-takeaways-box">
                <div className="takeaways-header">
                  <span className="takeaways-icon" aria-hidden="true">📋</span>
                  <h4 className="takeaways-title">Key Clinical Takeaways</h4>
                </div>
                <ul className="takeaways-list">
                  <li>Early quaternary consultation before irreversible incisions enables optimal organ preservation.</li>
                  <li>Multidisciplinary Tumor Board (MDT) validation prevents unnecessary radical tissue sacrifice.</li>
                  <li>Microscopic R0 margins and standardized histological clearance remain the definitive oncological goal.</li>
                </ul>
              </div>

              {/* Dr. Jem Kalathil Signature Card */}
              <div className="article-signature-card">
                <img
                  src="/images/dr_jem_kalathil.jpg"
                  alt="Dr. Jem Kalathil"
                  className="signature-avatar"
                />
                <div className="signature-info">
                  <span className="signature-badge">AUTHORED PERSPECTIVE</span>
                  <h4 className="signature-doctor-name">Dr. Jem Kalathil</h4>
                  <p className="signature-doctor-creds">MS, FRCS (Edin) &bull; Surgical Oncologist</p>
                  <p className="signature-doctor-bio">
                    Three decades of specialised surgical oncology practice focused exclusively on oncoplastic breast surgery, cytoreductive surgery with HIPEC for peritoneal malignancies, and robotic precision oncology.
                  </p>
                  {onRequestSecondOpinion && (
                    <button
                      type="button"
                      className="btn-signature-consult"
                      onClick={onRequestSecondOpinion}
                    >
                      Request Second Opinion with Dr. Jem &rarr;
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Sticky Clinical Sidebar */}
            <aside className="article-sidebar-column">
              {/* Second Opinion Action Card */}
              <div className="sidebar-action-card">
                <span className="sidebar-card-kicker">OBJECTIVE SURGICAL CLARITY</span>
                <h4 className="sidebar-card-title">Facing an Impending Oncology Surgery?</h4>
                <p className="sidebar-card-desc">
                  Have your histopathology, imaging boundaries, and surgical options reviewed methodically by Dr. Jem Kalathil within 24–48 hours.
                </p>
                {onRequestSecondOpinion && (
                  <button
                    type="button"
                    className="btn-sidebar-primary"
                    onClick={onRequestSecondOpinion}
                  >
                    Request a Second Opinion &rarr;
                  </button>
                )}
                <Link to="/upload-records" className="btn-sidebar-secondary">
                  Upload Diagnostic Scans
                </Link>
              </div>

              {/* Direct Desk Line Card */}
              <div className="sidebar-contact-card">
                <span className="sidebar-card-kicker">DIRECT CLINICAL DESK</span>
                <h5 className="sidebar-contact-title">Dr. Jem Kalathil's Clinical Desk</h5>
                <p className="sidebar-contact-location">Kochi, Kerala · Direct Consultation Desk</p>
                <a href={`tel:${siteSettings.secretaryPhone.replace(/\s+/g, '')}`} className="sidebar-phone-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>{siteSettings.secretaryPhone}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-whatsapp-link"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  <span>WhatsApp Oncology Triage</span>
                </a>
              </div>

              {/* Related Clinical Disciplines Card */}
              <div className="sidebar-disciplines-card">
                <span className="sidebar-card-kicker">CLINICAL DISCIPLINES</span>
                <ul className="sidebar-nav-list">
                  <li>
                    <Link to="/clinical-areas#breast">
                      <span>Oncoplastic Breast Surgery</span>
                      <span className="nav-arrow" aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/clinical-areas#hipec">
                      <span>Peritoneal Oncology &amp; HIPEC</span>
                      <span className="nav-arrow" aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/clinical-areas#robotic">
                      <span>Robotic Surgical Oncology</span>
                      <span className="nav-arrow" aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 04. BOTTOM SECOND OPINION BANNER */}
      {onRequestSecondOpinion && (
        <section className="article-end-cta">
          <div className="editorial-container">
            <div className="end-cta-inner">
              <div className="end-cta-text">
                <span className="end-cta-kicker">CLINICAL CERTAINTY BEFORE SURGERY</span>
                <h3 className="end-cta-heading">Need an objective second opinion on this procedure?</h3>
                <p className="end-cta-desc">
                  Submit your imaging, biopsy records, and current operative plan for direct review by Dr. Jem Kalathil within 24–48 hours.
                </p>
              </div>
              <div className="end-cta-actions-row" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="end-cta-button"
                  onClick={onRequestSecondOpinion}
                >
                  Request a Second Opinion &rarr;
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-opinion-whatsapp"
                  style={{ textDecoration: 'none' }}
                >
                  <span>💬 WhatsApp Oncology Triage</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 05. RETURN NAVIGATION */}
      <div className="article-footer-nav">
        <div className="editorial-container">
          <Link to="/articles" className="back-link">
            &larr; Return to All Clinical Perspectives
          </Link>
        </div>
      </div>
    </article>
  );
};
