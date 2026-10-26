import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SecondOpinionModal } from './components/SecondOpinionModal';
import { HomePage } from './pages/HomePage';
import { ClinicalAreasPage } from './pages/ClinicalAreasPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { DocumentUploadPage } from './pages/DocumentUploadPage';
import { ContactPage } from './pages/ContactPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppContent: React.FC = () => {
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
      <ScrollToTop />
      {/* 00. LOCKED APPROVED EXECUTIVE HEADER WITH DIRECT DESK CALL & LANGUAGE SWITCHER */}
      <Navbar onRequestSecondOpinion={() => handleOpenModal()} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage onRequestSecondOpinion={handleOpenModal} />} />
          <Route path="/clinical-areas" element={<ClinicalAreasPage onRequestSecondOpinion={handleOpenModal} />} />
          <Route path="/patient-journey" element={<HowItWorksPage onRequestSecondOpinion={() => handleOpenModal()} />} />
          <Route path="/how-it-works" element={<HowItWorksPage onRequestSecondOpinion={() => handleOpenModal()} />} />
          <Route path="/upload-records" element={<DocumentUploadPage />} />
          <Route path="/document-upload" element={<DocumentUploadPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage onRequestSecondOpinion={handleOpenModal} />} />
        </Routes>
      </main>

      {/* PUBLICATION EDITORIAL FOOTER */}
      <Footer onRequestSecondOpinion={() => handleOpenModal()} />

      {/* STREAMLINED COMPREHENSIVE SECOND OPINION MODAL */}
      <SecondOpinionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialDomainId={selectedDomain}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
