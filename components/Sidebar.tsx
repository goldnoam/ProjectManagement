
import React from 'react';
import { ToolID, ToolModule } from '../types';
import { Bookmark } from '../App';

interface SidebarProps {
  activeTool: ToolID;
  viewMode: 'learn' | 'compare';
  onSelectView: (mode: 'learn' | 'compare') => void;
  onSelect: (id: ToolID) => void;
  tools: ToolModule[];
  bookmarks: Bookmark[];
  onSelectBookmark: (bookmark: Bookmark) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTool, 
  viewMode, 
  onSelectView, 
  onSelect, 
  tools, 
  bookmarks, 
  onSelectBookmark 
}) => {
  return (
    <aside className="w-16 md:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto">
      <nav className="flex-1 p-4 space-y-2">
        
        {/* Comparison Feature Link */}
        <button
          onClick={() => onSelectView('compare')}
          className={`w-full flex items-center gap-3 p-3 mb-4 rounded-xl transition-all border-2 ${
            viewMode === 'compare' 
              ? 'bg-primary-500 text-white border-primary-500 shadow-lg' 
              : 'border-dashed border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary-400 hover:text-primary-500'
          }`}
        >
          <span className="text-xl shrink-0">⚖️</span>
          <span className="hidden md:block font-bold truncate">Tool Comparison</span>
        </button>

        <h3 className="hidden md:block px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Lessons</h3>
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelect(tool.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              viewMode === 'learn' && activeTool === tool.id 
                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400'
            }`}
          >
            <span className="text-xl shrink-0">{tool.icon}</span>
            <span className="hidden md:block font-medium truncate">{tool.title}</span>
          </button>
        ))}

        {bookmarks.length > 0 && (
          <div className="pt-6 space-y-2">
            <h3 className="hidden md:block px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Bookmarks</h3>
            {bookmarks.map((bookmark) => {
              const tool = tools.find(t => t.id === bookmark.toolId);
              const lesson = tool?.lessons.find(l => l.id === bookmark.lessonId);
              return (
                <button
                  key={`${bookmark.toolId}-${bookmark.lessonId}`}
                  onClick={() => onSelectBookmark(bookmark)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-xs group"
                >
                  <span className="shrink-0 text-amber-500">★</span>
                  <span className="hidden md:block truncate group-hover:text-primary-500">{lesson?.title || 'Lesson'}</span>
                </button>
              );
            })}
          </div>
        )}
      </nav>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 hidden md:block">
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-500">
          Unlock more tools and advanced certification tracks.
        </div>
      </div>
    </aside>
  );
};
