
import React, { useState, useEffect } from 'react';
import { ToolID, ToolModule, Lesson } from './types';
import { TOOLS_DATA } from './constants';
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('pm_mastery_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pm_mastery_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleBookmark = (toolId: ToolID, lessonId: string) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.toolId === toolId && b.lessonId === lessonId);
      if (exists) {
        return prev.filter(b => !(b.toolId === toolId && b.lessonId === lessonId));
      }
      return [...prev, { toolId, lessonId }];
    });
  };

  const handleSelectBookmark = (bookmark: Bookmark) => {
    setViewMode('learn');
    setActiveTool(bookmark.toolId);
    setSelectedLessonId(bookmark.lessonId);
  };

  const activeModule = TOOLS_DATA.find(t => t.id === activeTool) || TOOLS_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
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
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search tools, terms, or concepts..."
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full h-24 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center border border-dashed border-slate-400 dark:border-slate-700 text-slate-400 text-xs">
              ADVERTISEMENT
            </div>

            {viewMode === 'learn' ? (
              <ToolView 
                module={activeModule} 
                bookmarks={bookmarks}
                onToggleBookmark={toggleBookmark}
                forcedLessonId={selectedLessonId}
              />
            ) : (
              <ComparisonView tools={TOOLS_DATA.filter(t => t.comparison)} />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
