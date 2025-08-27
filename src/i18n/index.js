import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traduções
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  pt: { translation: pt },
  en: { translation: en },
  es: { translation: es }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Inglês como fallback
    debug: false,
    
    detection: {
      order: ['navigator', 'localStorage', 'sessionStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true
    },

    interpolation: {
      escapeValue: false
    },

    // Configuração de idiomas suportados
    supportedLngs: ['pt', 'en', 'es'],
    
    // Mapeamento de códigos de idioma
    load: 'languageOnly', // pt-BR -> pt, en-US -> en, es-ES -> es
    
    // Configuração personalizada para detecção
    whitelist: ['pt', 'en', 'es']
  });

export default i18n;