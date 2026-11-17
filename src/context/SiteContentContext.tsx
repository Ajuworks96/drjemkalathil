import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchSiteSettings,
  fetchHomePageData,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOMEPAGE_DATA,
  type SiteSettingsData,
  type HomePageData,
} from '../services/wordpress';

interface SiteContentContextType {
  siteSettings: SiteSettingsData;
  homeContent: HomePageData;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType>({
  siteSettings: DEFAULT_SITE_SETTINGS,
  homeContent: DEFAULT_HOMEPAGE_DATA,
  isLoading: false,
  refetch: async () => {},
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(DEFAULT_SITE_SETTINGS);
  const [homeContent, setHomeContent] = useState<HomePageData>(DEFAULT_HOMEPAGE_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const [settings, home] = await Promise.all([
        fetchSiteSettings(),
        fetchHomePageData(),
      ]);
      setSiteSettings(settings);
      setHomeContent(home);
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
        isLoading,
        refetch: loadData,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);

