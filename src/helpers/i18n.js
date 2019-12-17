import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-xhr-backend';
import languageDetector from 'i18next-browser-languagedetector';

import { getLang } from './localStorage';

i18n
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    lng: getLang(),
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
