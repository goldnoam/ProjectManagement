import React from 'react';
import { AppTheme, AppLanguage, AppFontSize } from '../types';

interface HeaderProps {
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  language: AppLanguage;
  setLanguage: (l: AppLanguage) => void;
  fontSize: AppFontSize;
  setFontSize: (s: AppFontSize) => void;
  translations: any;
  speak: (t: string) => void;
  isOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  theme, setTheme, language, setLanguage, fontSize, setFontSize, translations, speak, isOnline 
}) => {
  const languages: { code: AppLanguage, label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'he', label: 'עברית' },
    { code: 'zh', label: '中文' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ];

  const themes: AppTheme[] = ['dark', 'bright', 'colorful'];
  const sizes: AppFontSize[] = ['small', 'medium', 'large'];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">PM</div>
          <h1 className="text-xl font-bold tracking-tight">{translations.title}</h1>
        </div>
        
        {!isOnline && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 rounded-full animate-pulse shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Offline Mode</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Language Switcher */}
        <select 
          value={language}
          onChange={(e) => { setLanguage(e.target.value as AppLanguage); speak("Language changed"); }}
          className="bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-xs font-bold p-2 outline-none cursor-pointer"
        >
          {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.label}</option>)}
        </select>

        {/* Theme Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
          {themes.map(t => (
            <button
              key={t}
              onClick={() => { setTheme(t); speak(`Theme ${t}`); }}
              className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${theme === t ? 'bg-white dark:bg-slate-800 text-primary-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {translations[`theme_${t}`]}
            </button>
          ))}
        </div>

        {/* Font Size Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
          {sizes.map(s => (
            <button
              key={s}
              onClick={() => { setFontSize(s); speak(`Font size ${s}`); }}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-[10px] font-black transition-all ${fontSize === s ? 'bg-white dark:bg-slate-800 text-primary-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {translations[`size_${s}`]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};