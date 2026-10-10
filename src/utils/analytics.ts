/**
 * Google Analytics 4 (GA4) Tracking Utility
 * 
 * Safely dispatches custom events:
 * - second_opinion_cta_click
 * - second_opinion_form_start
 * - second_opinion_document_upload
 * - second_opinion_submit (only fires after successful submission)
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    // In development or when GA is not loaded, log clean audit trail
    console.info(`[GA4 Event] ${eventName}`, params || {});
  }
};

export const trackCtaClick = (location: string, label?: string) => {
  trackEvent('second_opinion_cta_click', {
    cta_location: location,
    cta_label: label || 'Request a Second Opinion',
    timestamp: new Date().toISOString(),
  });
};

export const trackFormStart = (source?: string) => {
  trackEvent('second_opinion_form_start', {
    source: source || 'direct_cta',
    timestamp: new Date().toISOString(),
  });
};

export const trackDocumentUpload = (fileCount: number, fileTypes: string[]) => {
  trackEvent('second_opinion_document_upload', {
    file_count: fileCount,
    file_types: fileTypes.join(','),
    timestamp: new Date().toISOString(),
  });
};

export const trackSecondOpinionSubmit = (referenceId: string, consultationMode: string) => {
  trackEvent('second_opinion_submit', {
    reference_id: referenceId,
    consultation_mode: consultationMode,
    is_conversion: true,
    timestamp: new Date().toISOString(),
  });
};
