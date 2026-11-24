import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { trackCtaClick } from '../utils/analytics';
import { useSiteContent } from '../context/SiteContentContext';
import { WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';

export interface GalleryPageProps {
  onRequestSecondOpinion: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'consultations' | 'surgical' | 'campus' | 'leadership';
  categoryLabel: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'consultation-suite',
    title: 'Compassionate Consultation Suite',
    category: 'consultations',
    categoryLabel: 'Patient Care & Consultation',
    imageSrc: '/images/clinical_intake_dossier.jpg',
    imageAlt: 'Surgical oncology consultation suite with diagnostic records and imaging review workstation',
    description: 'Providing patients and families with unhurried clarity, high-resolution scan reviews, and compassionate clinical guidance when choices seem daunting.',
  },
  {
    id: 'dr-jem-portrait',
    title: 'Dr. Jem Kalathil · MS, FRCS (Edin)',
    category: 'leadership',
    categoryLabel: 'Surgical Leadership',
    imageSrc: '/images/dr_jem_kalathil.jpg',
    imageAlt: 'Dr. Jem Kalathil, Surgical Oncologist',
    description: 'Three decades of dedicated surgical oncology practice, pioneering oncoplastic breast conservation and cytoreductive HIPEC in Kerala and South Asia.',
  },
  {
    id: 'campus-environment',
    title: 'Clinical Campus Environment, Kochi',
    category: 'campus',
    categoryLabel: 'Surgical Campus',
    imageSrc: '/images/aster_medcity_campus.jpg',
    imageAlt: 'Quaternary waterfront hospital campus in Kochi, Kerala',
    description: 'A quaternary oncology centre on the serene Cheranallur backwaters, Kochi — offering a healing environment for complex surgical care.',
  },
  {
    id: 'mdt-case-review',
    title: 'Multidisciplinary Tumor Board (MDT) Review',
    category: 'consultations',
    categoryLabel: 'Clinical Review',
    imageSrc: '/images/clinical_case_review.jpg',
    imageAlt: 'Multidisciplinary oncology tumor board reviewing imaging and treatment protocols',
    description: 'Cross-verifying histological staging, resection boundaries, and multimodal sequencing among surgical, medical, and radiation oncology specialists.',
  },
  {
    id: 'robotic-oncology-suite',
    title: 'Advanced daVinci Robotic Oncology Suite',
    category: 'surgical',
    categoryLabel: 'Surgical Technology',
    imageSrc: '/images/surgical_precision_instruments.jpg',
    imageAlt: 'Advanced robotic surgical console instrumentation for minimally invasive oncological resections',
    description: 'Enabling sub-millimeter precision, 3D magnified visualization, and minimal tissue trauma for pelvic, gastrointestinal, and retroperitoneal cancers.',
  },
  {
    id: 'quaternary-theatre',
    title: 'Quaternary Cytoreductive Perfusion Theatre',
    category: 'surgical',
    categoryLabel: 'Surgical Technology',
    imageSrc: '/images/hipec_perfusion_suite.jpg',
    imageAlt: 'Specialized surgical theatre equipped for cytoreductive surgery and heated intraperitoneal chemotherapy',
    description: 'Engineered specifically for extended cytoreductive peritonectomy and continuous 42°C Hyperthermic Intraperitoneal Chemotherapy (HIPEC) perfusions.',
  },
  {
    id: 'frozen-section-suite',
    title: 'Intraoperative Histopathology & Frozen Section Suite',
    category: 'surgical',
    categoryLabel: 'Surgical Technology',
    imageSrc: '/images/neutral_hipec_or.jpg',
    imageAlt: 'Intraoperative frozen section analysis enabling immediate margin clearance',
    description: 'Real-time intraoperative frozen section analysis enabling immediate confirmation of microscopic margins while surgery is underway.',
  },
  {
    id: 'dedicated-patient-care',
    title: 'Second Opinion Clinical Evaluation',
    category: 'consultations',
    categoryLabel: 'Patient Care & Consultation',
    imageSrc: '/images/dr_jem_kalathil.jpg',
    imageAlt: 'Dr. Jem Kalathil dedicated second opinion clinic',
    description: 'Offering objective, calm second opinions to confirm diagnoses, verify resectability, and avoid unnecessary total mastectomies or premature palliative conclusions.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'consultations', label: 'Consultations & MDT' },
  { id: 'surgical', label: 'Surgical Suites & Technology' },
  { id: 'campus', label: 'Surgical Campus & Environment' },
  { id: 'leadership', label: 'Leadership & Practice' },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onRequestSecondOpinion }) => {
  const { siteSettings } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Clinical Gallery & Infrastructure | Dr. Jem Kalathil';
  }, []);

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleCta = () => {
    trackCtaClick('gallery_page_cta', 'Request Second Opinion from Gallery');
    onRequestSecondOpinion();
  };

  return (
    <div className="subpage-wrapper gallery-page-wrapper">
      {/* 1. Page Header */}
      <section className="subpage-editorial-hero" aria-label="Gallery Introduction">
        <div className="editorial-container">
          <div className="subpage-breadcrumb">
            <span className="crumb-item">HOME</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">GALLERY</span>
          </div>

          <div className="subpage-hero-meta">
            <div className="hero-crest-badge">
              <img src="/images/clinical_crystal_emblem.png" alt="Clinical Emblem" className="hero-crest-img" />
              <span>QUATERNARY SURGICAL ONCOLOGY · CLINICAL PRACTICE</span>
            </div>
            <h1 className="subpage-title">
              Clinical Practice &amp; <span className="hero-title-accent">Surgical Expertise</span>
            </h1>
            <p className="subpage-lead">
              Photographs from Dr. Jem Kalathil's clinical practice — surgical suites, multidisciplinary team reviews, and the quaternary oncology environment where complex cancer cases are evaluated and treated.
            </p>
          </div>

          <div className="subpage-stats-strip">
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Quaternary Waterfront</span>
              <span className="subpage-stat-label">Surgical Campus Environment</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">daVinci Xi</span>
              <span className="subpage-stat-label">Robotic Surgical Suite</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">HIPEC Perfusion</span>
              <span className="subpage-stat-label">Dedicated Cytoreduction Theatre</span>
            </div>
            <div className="subpage-stat-item">
              <span className="subpage-stat-val">Multidisciplinary Team</span>
              <span className="subpage-stat-label">Clinical Leadership &amp; Case Scrutiny</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gallery Filter & Grid Section */}
      <section className="gallery-main-section">
        <div className="editorial-container">
          {/* Category Filter Pills */}
          <div className="gallery-filter-bar" role="tablist" aria-label="Gallery category filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`gallery-filter-pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-cards-grid">
            {filteredItems.map((item, idx) => (
              <article
                key={item.id}
                className="gallery-card-item"
                onClick={() => openLightbox(idx)}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
              >
                <div className="gallery-card-image-wrap">
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className="gallery-card-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-overlay">
                    <span className="gallery-view-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                      <span>View Full Image</span>
                    </span>
                  </div>
                  <span className="gallery-tag-pill">{item.categoryLabel}</span>
                </div>

                <div className="gallery-card-caption">
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <p className="gallery-item-desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="gallery-lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <button
              type="button"
              className="lightbox-nav-btn lightbox-prev-btn"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="lightbox-media-frame">
              <img
                src={filteredItems[lightboxIndex].imageSrc}
                alt={filteredItems[lightboxIndex].imageAlt}
                className="lightbox-img"
              />
              <div className="lightbox-info-bar">
                <span className="lightbox-cat-badge">{filteredItems[lightboxIndex].categoryLabel}</span>
                <h3 className="lightbox-title">{filteredItems[lightboxIndex].title}</h3>
                <p className="lightbox-desc">{filteredItems[lightboxIndex].description}</p>
                <span className="lightbox-counter">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="lightbox-nav-btn lightbox-next-btn"
              onClick={nextImage}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 4. Bottom Second Opinion CTA */}
      <section className="gallery-bottom-cta">
        <div className="editorial-container">
          <div className="gallery-cta-card">
            <span className="simple-section-tag">CLINICAL ORIENTATION</span>
            <h2 className="gallery-cta-heading">Facing a Complex Cancer Surgical Decision?</h2>
            <p className="gallery-cta-lead">
              Have your diagnostic reports and scans reviewed directly by Dr. Jem Kalathil. Gain clarity and reassurance before committing to irreversible interventions.
            </p>
            <div className="gallery-cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCta}
              >
                <span>Request a Clinical Second Opinion</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <a
                href={`https://wa.me/${WHATSAPP_COORDINATOR_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Dr. Jem Kalathil's Clinical Desk, I would like to submit my case summary for second opinion review.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-opinion-whatsapp"
              >
                <span>💬 WhatsApp Your Case Summary</span>
              </a>
              <a
                href={`tel:${siteSettings.secretaryPhone.replace(/\s+/g, '')}`}
                className="gallery-desk-call-btn"
              >
                <span>Call Clinical Desk: <strong>{siteSettings.secretaryPhone}</strong></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
