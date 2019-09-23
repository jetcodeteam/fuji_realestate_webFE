import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './configs/locales/en/translation.json';
import translationJP from './configs/locales/jp/translation.json';

i18n
  .use(reactI18nextModule)
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: translationEN,
      },
      jp: {
        translations: translationJP,
      },
    },
    fallbackLng: 'jp',
    debug: false,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  });

export default i18n;
