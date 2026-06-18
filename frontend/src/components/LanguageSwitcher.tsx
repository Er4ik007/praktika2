import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { Lang } from '../i18n/translations';

const LANGUAGES: { code: Lang; label: string; flag: string; displayCode: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺', displayCode: 'RU' },
  { code: 'be', label: 'Беларуская', flag: '🇧🇾', displayCode: 'BY' },
  { code: 'en', label: 'English', flag: '🇺🇸', displayCode: 'US' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱', displayCode: 'PL' },
  { code: 'zh', label: '中文', flag: '🇨🇳', displayCode: 'CH' },
];

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (code: Lang) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="position-relative" style={{ zIndex: 1050 }}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-sm btn-outline-secondary rounded-pill d-flex align-items-center gap-2 px-2 py-1 fw-bold"
        style={{
          border: '1.5px solid var(--bs-secondary-bg)',
          background: isOpen ? 'var(--bs-secondary-bg)' : 'transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Globe size={14} className="text-body-secondary" />
        <span className="text-body fw-bold small" style={{ fontFamily: 'monospace', minWidth: '22px', textAlign: 'left' }}>
          {currentLang.displayCode}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="position-absolute top-100 end-0 mt-2 bg-body border rounded-4 shadow-lg overflow-hidden"
            style={{ minWidth: '180px' }}
          >
            {LANGUAGES.map((item, i) => (
              <motion.button
                key={item.code}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => handleSelect(item.code)}
                className="btn w-100 text-start px-3 py-2 d-flex align-items-center gap-3 border-0 rounded-0"
                style={{
                  background: lang === item.code ? 'var(--bs-danger-bg-subtle)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (lang !== item.code) e.currentTarget.style.background = 'var(--bs-tertiary-bg)';
                }}
                onMouseLeave={(e) => {
                  if (lang !== item.code) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.flag}</span>
                <span className={`small ${lang === item.code ? 'fw-bold text-danger' : 'fw-medium text-body'}`}>
                  {item.label}
                </span>
                {lang === item.code && (
                  <motion.span
                    layoutId="langCheck"
                    className="ms-auto text-danger fw-bold"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
