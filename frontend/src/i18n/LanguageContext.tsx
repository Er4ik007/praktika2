import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, Lang } from './translations';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  tv: (key: string, fallback: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'ru',
  setLang: () => {},
  t: (key: string) => key,
  tv: (key: string, fallback: string) => fallback,
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('appLang') as Lang) || 'ru';
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('appLang', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry['ru'] || key;
  }, [lang]);

  const tv = useCallback((key: string, fallback: string): string => {
    const entry = translations[key];
    if (!entry) return fallback;
    const translated = entry[lang] || entry['ru'];
    if (!translated || translated === key) return fallback;
    return translated;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, tv }}>
      {children}
    </LangContext.Provider>
  );
};
