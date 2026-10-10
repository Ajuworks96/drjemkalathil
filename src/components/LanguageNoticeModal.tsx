import React from 'react';
import type { SupportedLanguage } from '../types';
import { WHATSAPP_COORDINATOR_NUMBER } from '../constants/content';

export interface LanguageNoticeModalProps {
  language: SupportedLanguage | null;
  onClose: () => void;
}

export const LanguageNoticeModal: React.FC<LanguageNoticeModalProps> = ({ language, onClose }) => {
  if (!language || language === 'en') return null;

  const isArabic = language === 'ar';
  const cleanPhone = WHATSAPP_COORDINATOR_NUMBER.replace(/[^\d+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
    isArabic
      ? 'مرحباً، أود الاستفسار عن استشارة الرأي الثاني في قسم جراحة الأورام لدى الدكتور جيم كالاثيل.'
      : 'നമസ്കാരം, ഡോ. ജെം കാളത്തിലിന്റെ ഓങ്കോളജി സെക്കൻഡ് ഒപ്പീനിയനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
  )}`;

  return (
    <div
      className="lang-modal-overlay"
      role="dialog"
      aria-modal="true"
      dir={isArabic ? 'rtl' : 'ltr'}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lang-modal-dialog">
        <div className="lang-modal-header">
          <span className="lang-modal-badge">
            {isArabic ? 'النسخة العربية' : 'മലയാളം പതിപ്പ്'}
          </span>
          <button
            type="button"
            className="lang-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="lang-modal-body">
          <h3 className="lang-modal-title">
            {isArabic
              ? 'النسخة العربية ستتوفر قريباً'
              : 'മലയാളം പതിപ്പ് ഉടൻ ലഭ്യമാകും'}
          </h3>

          <p className="lang-modal-desc">
            {isArabic ? (
              <>
                نعمل حالياً على إعداد النسخة العربية الكاملة لمنصة «Hope & Clarity». 
                يمكنكم متابعة استخدام الموقع باللغة الإنجليزية، أو التواصل مباشرة مع منسق المرضى الدوليين عبر واتساب للحصول على المساعدة باللغة العربية.
              </>
            ) : (
              <>
                ഡോ. ജെം കാളത്തിലിന്റെ «Hope & Clarity» വെബ്‌സൈറ്റിന്റെ മലയാളം പതിപ്പ് ഉടൻ പൂർണ്ണമായി ലഭ്യമാകും. 
                ഇപ്പോൾ നിങ്ങളുടെ കേസ് സമർപ്പിക്കാനും രേഖകൾ അയക്കാനും ഇംഗ്ലീഷിൽ തുടരുക അല്ലെങ്കിൽ ഡിപ്പാർട്ട്മെന്റ് കോർഡിനേറ്ററുമായി വാട്സ്ആപ്പിൽ നേരിട്ട് സംസാരിക്കുക.
              </>
            )}
          </p>

          <div className="lang-modal-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lang-btn-whatsapp"
            >
              <span>{isArabic ? 'محادثة عبر واتساب' : 'വാട്സ്ആപ്പിൽ ബന്ധപ്പെടുക'}</span>
            </a>

            <button
              type="button"
              className="lang-btn-continue"
              onClick={onClose}
            >
              <span>{isArabic ? 'المتابعة بالإنجليزية' : 'ഇംഗ്ലീഷിൽ തുടരുക'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
