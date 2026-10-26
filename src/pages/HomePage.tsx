import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { EditorialIntroSection } from '../components/EditorialIntroSection';
import { ClinicalChaptersSection } from '../components/ClinicalChaptersSection';
import { EditorialBreathingTransition } from '../components/EditorialBreathingTransition';
import { SecondOpinionMonumentSection } from '../components/SecondOpinionMonumentSection';
import { PatientPathwayJourney } from '../components/PatientPathwayJourney';
import { DocumentTeaserSection } from '../components/DocumentTeaserSection';
import { SurgeonEditorialProfile } from '../components/SurgeonEditorialProfile';
import { GulfRouteMinimal } from '../components/GulfRouteMinimal';
import { ClinicalClarificationsAccordion } from '../components/ClinicalClarificationsAccordion';
import { PhysiciansDarkEditorial } from '../components/PhysiciansDarkEditorial';
import { FinalManifestoCTA } from '../components/FinalManifestoCTA';

export interface HomePageProps {
  onRequestSecondOpinion: (domainId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onRequestSecondOpinion }) => {
  return (
    <>
      {/* 00. LOCKED APPROVED HERO SECTION WITH DARK PALETTE & GROUNDED BASELINE */}
      <HeroSection onRequestSecondOpinion={() => onRequestSecondOpinion()} />

      {/* 01. EDITORIAL OPENING: WHEN THE DIAGNOSIS IS COMPLEX, CLARITY MATTERS */}
      <EditorialIntroSection />

      {/* 02. THREE LARGE INTERACTIVE CLINICAL CHAPTERS */}
      <ClinicalChaptersSection onRequestSecondOpinion={onRequestSecondOpinion} />

      {/* 03. QUIET EDITORIAL BREATHING TRANSITION */}
      <EditorialBreathingTransition />

      {/* 04. PRIMARY CONVERSION: FULL-WIDTH #3B0A07 SECOND OPINION MONUMENT */}
      <SecondOpinionMonumentSection onRequestSecondOpinion={() => onRequestSecondOpinion()} />

      {/* 05. CLINICAL PATHWAY: HOW IT WORKS (HORIZONTAL PROGRESSIVE LINE) */}
      <PatientPathwayJourney />

      {/* 06. MEDICAL DOCUMENT EXPERIENCE: CLEAN TEASER */}
      <DocumentTeaserSection onRequestSecondOpinion={() => onRequestSecondOpinion()} />

      {/* 07. DR. JEM KALATHIL: EXPERTISE MATTERS. UNDERSTANDING MATTERS TOO. */}
      <SurgeonEditorialProfile onRequestSecondOpinion={() => onRequestSecondOpinion()} />

      {/* 08. GULF & REGIONAL PATIENTS: HORIZONTAL GEOGRAPHIC ROUTE */}
      <GulfRouteMinimal onRequestSecondOpinion={() => onRequestSecondOpinion()} />

      {/* 09. CLINICAL CLARIFICATIONS: MINIMAL EDITORIAL ACCORDION */}
      <ClinicalClarificationsAccordion />

      {/* 10. FOR REFERRING PHYSICIANS: DARK SOPHISTICATED EDITORIAL */}
      <PhysiciansDarkEditorial onRequestSecondOpinion={() => onRequestSecondOpinion()} />

      {/* 11. FINAL MANIFESTO CTA: FROM FEAR TO HOPE. FROM CONFUSION TO CLARITY. */}
      <FinalManifestoCTA onRequestSecondOpinion={() => onRequestSecondOpinion()} />
    </>
  );
};
