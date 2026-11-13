# Dr. Jem Kalathil — Sanity CMS & Reviews Setup Guide

This website is equipped with **Sanity.io Headless CMS integration**, allowing the clinic staff and marketing team to edit content, add patient reviews, write cancer awareness articles, and configure SEO metadata with **zero code changes**.

---

## 1. Quick Setup (1-time, takes 2 minutes)

1. Go to [https://www.sanity.io](https://www.sanity.io) and sign up for a **Free Account** (supports unlimited editors, 1M requests/mo, 100% free).
2. Create a new project:
   - Project Name: `drjemkalathil`
   - Dataset: `production`
3. Copy your **Project ID** from the Sanity dashboard.

---

## 2. Connect to the Live Website

Add your Project ID to Vercel Environment Variables:
- `VITE_SANITY_PROJECT_ID` = `your_project_id_here`
- `VITE_SANITY_DATASET` = `production`

*(Note: If no Project ID is configured, the website automatically falls back to curated verified default reviews and content without any disruption!)*

---

## 3. What you can manage in Sanity Studio

- **⭐️ Patient Reviews (രോഗികളുടെ അഭിപ്രായങ്ങൾ):**
  - Add new patient testimonials with 1 click.
  - Fields: Patient Name, Rating (1-5 stars), Specialty tag (e.g. *Oncoplastic Breast Surgery*, *HIPEC*, *Robotic Surgery*), Location (*Kochi, UAE, Oman*), Date, and Approval toggle.

- **🔍 Page SEO & Google Meta:**
  - Customize Meta Titles, Meta Descriptions, Focus Keywords, and Social Share (OpenGraph) Images for each page.

- **🏥 Clinic & OPD Settings:**
  - Update direct desk phone, WhatsApp coordinator numbers, OPD consultation hours.

- **📝 Cancer Articles & Patient Guides:**
  - Write educational cancer care articles to attract organic Google search traffic.

---

## 4. Launching the Studio

You can run the Studio locally:
```bash
cd sanity
npx sanity dev
```

Or deploy it to a free hosted URL (e.g. `drjemkalathil.sanity.studio`):
```bash
cd sanity
npx sanity deploy
```

