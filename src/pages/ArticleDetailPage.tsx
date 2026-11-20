import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchWordpressPostBySlug, type WPPost } from '../services/wordpress';

export interface ArticleDetailPageProps {
  onRequestSecondOpinion?: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ onRequestSecondOpinion }) => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

    // Dynamic Article Schema.org for Google Search
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'article-structured-data';
    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      headline: post.title,
      description: post.seo?.description || post.excerpt.replace(/<[^>]+>/g, '').trim(),
      datePublished: post.date,
      author: {
        '@type': 'Physician',
        name: post.authorName || 'Dr. Jem Kalathil',
        jobTitle: 'Lead Senior Consultant, Surgical Oncology',
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
        <p>Loading clinical perspective...</p>
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

  return (
    <article className="article-reader-page">
      {/* 01. ARTICLE HEADER & BREADCRUMBS */}
      <header className="article-reader-header">
        <div className="section-container">
          <nav className="article-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/articles">Clinical Insights</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{post.title}</span>
          </nav>

          <div className="article-meta-pill-row">
            <span className="meta-category-tag">{post.categoryName}</span>
            <span className="meta-bullet">&bull;</span>
            <span className="meta-read-time">{post.readTimeMinutes} min clinical read</span>
            <span className="meta-bullet">&bull;</span>
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
              width="48"
              height="48"
            />
            <div className="byline-details">
              <span className="byline-name">{post.authorName}</span>
              <span className="byline-title">
                Lead Senior Consultant, Surgical Oncology &bull; Over 30 Years Experience
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 02. ARTICLE CONTENT BODY */}
      <section className="article-reader-content">
        <div className="article-reader-container">
          <div
            className="article-body-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Dr. Jem Kalathil Signature Box */}
          <div className="article-signature-box">
            <div className="signature-info">
              <h4 className="signature-doctor-name">Dr. Jem Kalathil</h4>
              <p className="signature-doctor-creds">
                MS, FRCS
              </p>
              <p className="signature-doctor-bio">
                Lead Senior Consultant in Surgical Oncology. Practice focused exclusively on oncoplastic breast surgery, peritoneal surface oncology with HIPEC, and robotic surgical oncology in Kochi, Kerala.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. CALM SECOND OPINION BANNER */}
      {onRequestSecondOpinion && (
        <section className="article-end-cta">
          <div className="section-container">
            <div className="end-cta-inner">
              <div className="end-cta-text">
                <span className="end-cta-kicker">CLINICAL CERTAINTY BEFORE SURGERY</span>
                <h3 className="end-cta-heading">Need an objective second opinion on this procedure?</h3>
                <p className="end-cta-desc">
                  Submit your imaging, biopsy records, and current operative plan for direct review by Dr. Jem Kalathil within 24–48 hours.
                </p>
              </div>
              <button
                type="button"
                className="end-cta-button"
                onClick={onRequestSecondOpinion}
              >
                Request a Second Opinion
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 04. RETURN NAVIGATION */}
      <div className="article-footer-nav">
        <div className="section-container">
          <Link to="/articles" className="back-link">
            &larr; Return to All Clinical Perspectives
          </Link>
        </div>
      </div>
    </article>
  );
};

