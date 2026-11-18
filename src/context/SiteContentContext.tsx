import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchSiteSettings,
  fetchHomePageData,
  fetchClinicalAreasPageData,
  fetchPatientJourneyPageData,
  fetchUploadRecordsPageData,
  fetchContactPageData,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOMEPAGE_DATA,
  DEFAULT_CLINICAL_AREAS_PAGE,
  DEFAULT_PATIENT_JOURNEY_PAGE,
  DEFAULT_UPLOAD_RECORDS_PAGE,
  DEFAULT_CONTACT_PAGE,
  type SiteSettingsData,
  type HomePageData,
  type ClinicalAreasPageData,
  type PatientJourneyPageData,
  type UploadRecordsPageData,
  type ContactPageData,
} from '../services/wordpress';

interface SiteContentContextType {
  siteSettings: SiteSettingsData;
  homeContent: HomePageData;
  clinicalAreasPage: ClinicalAreasPageData;
  patientJourneyPage: PatientJourneyPageData;
  uploadRecordsPage: UploadRecordsPageData;
  contactPage: ContactPageData;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType>({
  siteSettings: DEFAULT_SITE_SETTINGS,
  homeContent: DEFAULT_HOMEPAGE_DATA,
  clinicalAreasPage: DEFAULT_CLINICAL_AREAS_PAGE,
  patientJourneyPage: DEFAULT_PATIENT_JOURNEY_PAGE,
  uploadRecordsPage: DEFAULT_UPLOAD_RECORDS_PAGE,
  contactPage: DEFAULT_CONTACT_PAGE,
  isLoading: false,
  refetch: async () => {},
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(DEFAULT_SITE_SETTINGS);
  const [homeContent, setHomeContent] = useState<HomePageData>(DEFAULT_HOMEPAGE_DATA);
  const [clinicalAreasPage, setClinicalAreasPage] = useState<ClinicalAreasPageData>(DEFAULT_CLINICAL_AREAS_PAGE);
  const [patientJourneyPage, setPatientJourneyPage] = useState<PatientJourneyPageData>(DEFAULT_PATIENT_JOURNEY_PAGE);
  const [uploadRecordsPage, setUploadRecordsPage] = useState<UploadRecordsPageData>(DEFAULT_UPLOAD_RECORDS_PAGE);
  const [contactPage, setContactPage] = useState<ContactPageData>(DEFAULT_CONTACT_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const [settings, home, clinicalAreas, patientJourney, uploadRecords, contact] =
        await Promise.all([
          fetchSiteSettings(),
          fetchHomePageData(),
          fetchClinicalAreasPageData(),
          fetchPatientJourneyPageData(),
          fetchUploadRecordsPageData(),
          fetchContactPageData(),
        ]);

      setSiteSettings(settings);
      setHomeContent(home);
      setClinicalAreasPage(clinicalAreas);
      setPatientJourneyPage(patientJourney);
      setUploadRecordsPage(uploadRecords);
      setContactPage(contact);
    } catch (err) {
      console.warn('Could not load dynamic content from WordPress, using fallbacks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        siteSettings,
        homeContent,
        clinicalAreasPage,
        patientJourneyPage,
        uploadRecordsPage,
        contactPage,
        isLoading,
        refetch: loadData,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
