import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWordpressPosts, type WPPost } from '../services/wordpress';

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
    document.title = 'Clinical Insights & Oncology Perspectives | Dr. Jem Kalathil';
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

  return (
    <div className="articles-page-wrapper">
      {/* 01. LUXURY EDITORIAL HEADER */}
      <section className="articles-hero-section">
        <div className="section-container">
          <div className="articles-hero-eyebrow">
            <span className="pill-gold-dot" aria-hidden="true" />
            <span>CLINICAL PERSPECTIVES &amp; SURGICAL INSIGHTS</span>
          </div>

          <h1 className="articles-hero-title">
            Evidence, Clarity &amp; <span className="title-gold-italic">Oncological Truth.</span>
          </h1>

          <p className="articles-hero-desc">
            Authored perspectives by Dr. Jem Kalathil examining surgical boundaries, organ-preservation protocols, heated intraperitoneal chemotherapy (HIPEC), and the ethics of calm clinical decision-making.
          </p>

          {/* Search & Filter Bar */}
          <div className="articles-toolbar-row">
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
                  {cat}
                </button>
              ))}
            </div>

            <div className="articles-search-box">
              <input
                type="search"
                className="articles-search-input"
                placeholder="Search topics, HIPEC, breast surgery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02. ARTICLES LUXURY CARDS GRID */}
      <section className="articles-grid-section">
        <div className="section-container">
          {loading ? (
            <div className="articles-loading-state">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Fetching clinical perspectives from Dr. Jem Kalathil's knowledge base...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="articles-empty-state">
              <p>No articles found matching your criteria.</p>
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="articles-luxury-grid">
              {filteredPosts.map((post) => (
                <article key={post.id} className="article-luxury-card">
                  <div className="article-card-header">
                    <span className="article-category-badge">{post.categoryName}</span>
                    <span className="article-read-time">{post.readTimeMinutes} min read</span>
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
                      <span className="article-date">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <Link to={`/articles/${post.slug}`} className="article-read-link">
                      <span>Read Insight</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 03. EDITORIAL SECOND OPINION CTA */}
      {onRequestSecondOpinion && (
        <section className="articles-cta-strip">
          <div className="section-container">
            <div className="articles-cta-inner">
              <div className="articles-cta-content">
                <span className="cta-kicker">OBJECTIVE SURGICAL CLARITY</span>
                <h3 className="cta-title">Facing an oncology diagnosis or impending surgery?</h3>
                <p className="cta-subtitle">
                  Have your histopathology, imaging boundaries, and surgical options reviewed methodically by Dr. Jem Kalathil within 24–48 hours.
                </p>
              </div>
              <button
                type="button"
                className="articles-cta-button"
                onClick={onRequestSecondOpinion}
              >
                Request a Second Opinion
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

