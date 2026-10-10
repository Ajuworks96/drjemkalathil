import React, { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EditorialIntroSection } from './components/EditorialIntroSection';
import { ClinicalChaptersSection } from './components/ClinicalChaptersSection';
import { EditorialBreathingTransition } from './components/EditorialBreathingTransition';
import { SecondOpinionMonumentSection } from './components/SecondOpinionMonumentSection';
import { PatientPathwayJourney } from './components/PatientPathwayJourney';
import { DocumentTeaserSection } from './components/DocumentTeaserSection';
import { SurgeonEditorialProfile } from './components/SurgeonEditorialProfile';
import { GulfRouteMinimal } from './components/GulfRouteMinimal';
import { ClinicalClarificationsAccordion } from './components/ClinicalClarificationsAccordion';
import { PhysiciansDarkEditorial } from './components/PhysiciansDarkEditorial';
import { FinalManifestoCTA } from './components/FinalManifestoCTA';
import { Footer } from './components/Footer';
import { SecondOpinionModal } from './components/SecondOpinionModal';

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | undefined>(undefined);

  const handleOpenModal = (domainId?: string) => {
    setSelectedDomain(domainId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="site-wrapper">
      {/* 00. LOCKED APPROVED EXECUTIVE HEADER WITH DIRECT DESK CALL & LANGUAGE SWITCHER */}
      <Navbar onRequestSecondOpinion={() => handleOpenModal()} />

      <main className="main-content">
        {/* 00. LOCKED APPROVED HERO SECTION (DO NOT TOUCH) */}
        <HeroSection onRequestSecondOpinion={() => handleOpenModal()} />

        {/* 01. EDITORIAL OPENING: WHEN THE DIAGNOSIS IS COMPLEX, CLARITY MATTERS */}
        <EditorialIntroSection />

        {/* 02. THREE LARGE INTERACTIVE CLINICAL CHAPTERS */}
        <ClinicalChaptersSection onRequestSecondOpinion={(domainId) => handleOpenModal(domainId)} />

        {/* 03. QUIET EDITORIAL BREATHING TRANSITION */}
        <EditorialBreathingTransition />

        {/* 04. PRIMARY CONVERSION: FULL-WIDTH #3B0A07 SECOND OPINION MONUMENT */}
        <SecondOpinionMonumentSection onRequestSecondOpinion={() => handleOpenModal()} />

        {/* 05. CLINICAL PATHWAY: HOW IT WORKS (HORIZONTAL PROGRESSIVE LINE) */}
        <PatientPathwayJourney />

        {/* 06. MEDICAL DOCUMENT EXPERIENCE: CLEAN TEASER */}
        <DocumentTeaserSection onRequestSecondOpinion={() => handleOpenModal()} />

        {/* 07. DR. JEM KALATHIL: EXPERTISE MATTERS. UNDERSTANDING MATTERS TOO. */}
        <SurgeonEditorialProfile onRequestSecondOpinion={() => handleOpenModal()} />

        {/* 08. GULF & REGIONAL PATIENTS: HORIZONTAL GEOGRAPHIC ROUTE */}
        <GulfRouteMinimal onRequestSecondOpinion={() => handleOpenModal()} />

        {/* 09. CLINICAL CLARIFICATIONS: MINIMAL EDITORIAL ACCORDION */}
        <ClinicalClarificationsAccordion />

        {/* 10. FOR REFERRING PHYSICIANS: DARK SOPHISTICATED EDITORIAL */}
        <PhysiciansDarkEditorial onRequestSecondOpinion={() => handleOpenModal()} />

        {/* 11. FINAL MANIFESTO CTA: FROM FEAR TO HOPE. FROM CONFUSION TO CLARITY. */}
        <FinalManifestoCTA onRequestSecondOpinion={() => handleOpenModal()} />
      </main>

      {/* 12. SIMPLIFIED PUBLICATION EDITORIAL FOOTER */}
      <Footer onRequestSecondOpinion={() => handleOpenModal()} />

      {/* STREAMLINED COMPREHENSIVE SECOND OPINION MODAL & DOCUMENT UPLOAD */}
      <SecondOpinionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialDomainId={selectedDomain}
      />
    </div>
  );
};

export default App;
