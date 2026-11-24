import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWordpressPosts, type WPPost } from '../services/wordpress';
import { WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';

export interface ArticlesPageProps {
  onRequestSecondOpinion?: () => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onRequestSecondOpinion }) => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchWordpressPosts()
      .then((data) => {
        if (isMounted) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Could not load WordPress articles:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update page title & meta for SEO
  useEffect(() => {
    document.title = 'Clinical Insights & Surgical Oncology Perspectives | Dr. Jem Kalathil';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Clinical perspectives on oncoplastic breast surgery, CRS & HIPEC for peritoneal malignancies, and robotic oncology by Dr. Jem Kalathil, Surgical Oncologist in Kochi, Kerala.'
      );
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.categoryName || 'Oncology')))];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = activeCategory === 'All' || post.categoryName === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="subpage-wrapper articles-page-wrapper">
      {/* 01. LUXURY EDITORIAL HEADER */}
      <section className="subpage-editorial-hero" aria-label="Clinical Perspectives & Articles">
        <div className="editorial-container">
          <div className="subpage-breadcrumb">
            <Link to="/" className="crumb-item">HOME</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">CLINICAL PERSPECTIVES &amp; INSIGHTS</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="" className="hero-crest-img" />
              <span>PEER-REVIEWED RIGOR · ETHICAL SURGICAL ONCOLOGY · CALM DECISION-MAKING</span>
            </div>

            <h1 className="subpage-title">
              Evidence, Clarity &amp; <span className="hero-title-accent">Oncological Truth.</span>
            </h1>

            <p className="subpage-lead">
              Authored perspectives by Dr. Jem Kalathil examining surgical boundaries, organ-preservation protocols, heated intraperitoneal chemotherapy (HIPEC), and the ethics of calm clinical decision-making.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="articles-interactive-toolbar">
            <div className="category-pills-scroll" role="tablist" aria-label="Article Categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`category-filter-pill ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>

            <div className="articles-search-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                className="articles-search-input"
                placeholder="Search clinical perspectives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 02. ARTICLES LUXURY DISPLAY SECTION */}
      <section className="articles-grid-section">
        <div className="editorial-container">
          {/* Persistent Author Attribution Banner */}
          <div className="articles-persistent-attribution">
            <p>All perspectives authored by Dr. Jem Kalathil, MS, FRCS (Edin), Surgical Oncologist</p>
          </div>

          {loading ? (
            <div className="articles-loading-state">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Fetching clinical perspectives from Dr. Jem Kalathil's knowledge base...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="articles-empty-state">
              <div className="empty-icon">📖</div>
              <h3>No clinical perspectives match your search</h3>
              <p>Try searching for terms like "HIPEC", "Breast", "Margins", or "Second Opinion".</p>
              <button
                type="button"
                className="btn-opinion-primary"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* FEATURED SPOTLIGHT ARTICLE (When on "All" category & no active search) */}
              {featuredPost && activeCategory === 'All' && !searchQuery && (
                <article className="featured-article-spotlight">
                  <div className="featured-media-col">
                    <Link to={`/articles/${featuredPost.slug}`} className="featured-img-anchor">
                      <img
                        src={featuredPost.featuredImage || '/images/clinical_case_review.jpg'}
                        alt={featuredPost.title}
                        className="featured-post-img"
                        loading="eager"
                      />
                      <div className="featured-overlay-sheen" />
                      <span className="featured-spotlight-badge">
                        ★ FEATURED CLINICAL PERSPECTIVE
                      </span>
                    </Link>
                  </div>

                  <div className="featured-content-col">
                    <div className="featured-meta-header">
                      <span className="featured-cat-tag">{featuredPost.categoryName}</span>
                      <span className="meta-sep" aria-hidden="true">·</span>
                      <span className="featured-read-time">{featuredPost.readTimeMinutes} min clinical read</span>
                    </div>

                    <h2 className="featured-post-title">
                      <Link to={`/articles/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <div
                      className="featured-post-excerpt"
                      dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                    />

                    <div className="featured-footer-row">
                      <div className="featured-author-box">
                        <img
                          src="/images/dr_jem_kalathil.jpg"
                          alt="Dr. Jem Kalathil"
                          className="author-avatar-circle"
                        />
                        <div className="author-meta-copy">
                          <span className="author-name-tag">{featuredPost.authorName}</span>
                          <span className="author-title-tag">MS, FRCS (Edin) · Surgical Oncologist</span>
                        </div>
                      </div>

                      <Link to={`/articles/${featuredPost.slug}`} className="btn-featured-read">
                        <span>Read Full Insight →</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* ARTICLE CARDS GRID */}
              <div className="articles-luxury-grid">
                {(activeCategory === 'All' && !searchQuery ? remainingPosts : filteredPosts).map((post) => (
                  <article key={post.id} className="article-luxury-card">
                    {/* Media Thumbnail */}
                    <div className="article-card-media-wrapper">
                      <Link to={`/articles/${post.slug}`} className="card-img-anchor">
                        <img
                          src={post.featuredImage || '/images/clinical_case_review.jpg'}
                          alt={post.title}
                          className="article-card-thumb"
                          loading="lazy"
                        />
                        <div className="card-thumb-gradient" />
                        <span className="article-category-badge">{post.categoryName}</span>
                      </Link>
                    </div>

                    <div className="article-card-body">
                      <div className="article-card-meta-top">
                        <span className="article-read-time">⏱ {post.readTimeMinutes} min read</span>
                        <span className="article-date">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h2 className="article-card-title">
                        <Link to={`/articles/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <div
                        className="article-card-excerpt"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />

                      <div className="article-card-footer">
                        <div className="article-author-info">
                          <span className="author-name">{post.authorName}</span>
                          <span className="author-role">MS, FRCS (Edin) · Surgical Oncologist</span>
                        </div>

                        <Link to={`/articles/${post.slug}`} className="article-read-link">
                          <span>Read Insight</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* 03. EDITORIAL SECOND OPINION CTA */}
          <div className="articles-cta-interactive-card">
            <div className="cta-left-content">
              <span className="cta-kicker">OBJECTIVE SURGICAL CLARITY</span>
              <h3 className="cta-title">Facing an oncology diagnosis or impending surgery?</h3>
              <p className="cta-subtitle">
                Have your histopathology, imaging boundaries, and surgical options reviewed methodically by Dr. Jem Kalathil within 24–48 hours.
              </p>
            </div>
            <div className="cta-right-actions">
              {onRequestSecondOpinion && (
                <button
                  type="button"
                  className="btn-opinion-primary"
                  onClick={onRequestSecondOpinion}
                >
                  Request a Second Opinion →
                </button>
              )}
              <a
                href={`https://wa.me/${WHATSAPP_COORDINATOR_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Dr. Jem Kalathil's Clinical Desk, I would like to request an oncology triage second opinion.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-opinion-whatsapp"
              >
                <span>💬 WhatsApp Oncology Triage</span>
              </a>
              <Link to="/upload-records" className="btn-opinion-secondary">
                Upload Medical Records
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
