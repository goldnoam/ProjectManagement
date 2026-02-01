import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ToolID, ToolModule, Lesson, AppTheme, AppLanguage, AppFontSize } from './types';
import { TOOLS_DATA, TRANSLATIONS } from './constants';
import { Sidebar } from './components/Sidebar';
import { ToolView } from './components/ToolView';
import { ComparisonView } from './components/ComparisonView';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export interface Bookmark {
  toolId: ToolID;
  lessonId: string;
}

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolID>(ToolID.PM);
  const [viewMode, setViewMode] = useState<'learn' | 'compare'>('learn');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [theme, setTheme] = useState<AppTheme>(() => (localStorage.getItem('pm_theme') as AppTheme) || 'dark');
  const [language, setLanguage] = useState<AppLanguage>(() => (localStorage.getItem('pm_lang') as AppLanguage) || 'en');
  const [fontSize, setFontSize] = useState<AppFontSize>(() => (localStorage.getItem('pm_font_size') as AppFontSize) || 'medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('pm_mastery_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const t = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS.en, [language]);
  const isRTL = language === 'he';

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('pm_mastery_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('pm_theme', theme);
    document.documentElement.classList.remove('dark', 'bright', 'colorful', 'light');
    
    if (theme === 'bright') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      if (theme === 'colorful') document.documentElement.classList.add('colorful');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pm_lang', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  useEffect(() => {
    localStorage.setItem('pm_font_size', fontSize);
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    document.documentElement.classList.add(`text-${fontSize}`);
  }, [fontSize]);

  const toggleBookmark = (toolId: ToolID, lessonId: string) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.toolId === toolId && b.lessonId === lessonId);
      if (exists) {
        return prev.filter(b => !(b.toolId === toolId && b.lessonId === lessonId));
      }
      return [...prev, { toolId, lessonId }];
    });
  };

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'he' ? 'he-IL' : language;
    window.speechSynthesis.speak(utterance);
  }, [language]);

  const handleSelectBookmark = (bookmark: Bookmark) => {
    setViewMode('learn');
    setActiveTool(bookmark.toolId);
    setSelectedLessonId(bookmark.lessonId);
  };

  const filteredTools = useMemo(() => {
    if (!searchQuery) return TOOLS_DATA;
    const lower = searchQuery.toLowerCase();
    return TOOLS_DATA.filter(tool => 
      tool.title.toLowerCase().includes(lower) || 
      tool.description.toLowerCase().includes(lower) ||
      tool.lessons.some(l => l.title.toLowerCase().includes(lower))
    );
  }, [searchQuery]);

  const activeModule = TOOLS_DATA.find(t => t.id === activeTool) || TOOLS_DATA[0];

  const handleExportSearch = () => {
    const data = JSON.stringify(filteredTools, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pm-search-export.json';
    a.click();
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if (data) setSearchQuery(data);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ${isRTL ? 'rtl-support' : ''}`}>
      <Header 
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
        translations={t}
        speak={speak}
        isOnline={isOnline}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          activeTool={activeTool} 
          viewMode={viewMode}
          onSelectView={(mode) => {
            setViewMode(mode);
            setSelectedLessonId(null);
          }}
          onSelect={(id) => {
            setViewMode('learn');
            setActiveTool(id);
            setSelectedLessonId(null);
          }} 
          tools={TOOLS_DATA}
          bookmarks={bookmarks}
          onSelectBookmark={handleSelectBookmark}
          translations={t}
          speak={speak}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="relative group">
              <input 
                type="text"
                placeholder={t.search}
                className="w-full p-4 pr-32 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                aria-label="Search Bar"
              />
              <div className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-2 flex items-center gap-1`}>
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(''); speak(t.clear); }}
                    className="p-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {t.clear}
                  </button>
                )}
                <button 
                  onClick={() => { handleExportSearch(); speak(t.export); }}
                  className="p-2 text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
                >
                  {t.export}
                </button>
              </div>
            </div>

            <div className="w-full h-24 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center border border-dashed border-slate-400 dark:border-slate-700 text-slate-400 text-xs">
              ADVERTISEMENT (AdSense ca-pub-0274741291001288)
            </div>

            {viewMode === 'learn' ? (
              <ToolView 
                module={activeModule} 
                bookmarks={bookmarks}
                onToggleBookmark={toggleBookmark}
                forcedLessonId={selectedLessonId}
                translations={t}
                speak={speak}
              />
            ) : (
              <ComparisonView tools={TOOLS_DATA.filter(t => t.comparison)} />
            )}
          </div>
        </main>
      </div>

      <Footer translations={t} speak={speak} />
    </div>
  );
};

export default App;