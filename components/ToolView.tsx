
import React, { useState, useEffect } from 'react';
import { ToolModule, Lesson, ToolID } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Simulation } from './Simulation';
import { Bookmark } from '../App';

interface ToolViewProps {
  module: ToolModule;
  bookmarks: Bookmark[];
  onToggleBookmark: (toolId: ToolID, lessonId: string) => void;
  forcedLessonId?: string | null;
}

const mockChartData = [
  { name: 'Sprint 1', tasks: 12 },
  { name: 'Sprint 2', tasks: 19 },
  { name: 'Sprint 3', tasks: 15 },
  { name: 'Sprint 4', tasks: 22 },
];

export const ToolView: React.FC<ToolViewProps> = ({ module, bookmarks, onToggleBookmark, forcedLessonId }) => {
  // selectedLesson null means we are showing the Tool Overview
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (forcedLessonId) {
      const lesson = module.lessons.find(l => l.id === forcedLessonId);
      if (lesson) setSelectedLesson(lesson);
    } else {
      // Default to overview (null) when switching modules
      setSelectedLesson(null);
    }
  }, [forcedLessonId, module]);

  const isBookmarked = selectedLesson ? bookmarks.some(b => b.toolId === module.id && b.lessonId === selectedLesson.id) : false;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center text-4xl shadow-lg`}>
          {module.icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold">{module.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{module.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Curriculum Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400">Curriculum</h3>
          
          {/* Overview Selector */}
          <button
            onClick={() => setSelectedLesson(null)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedLesson === null
                ? 'bg-white dark:bg-slate-900 border-primary-500 shadow-md ring-1 ring-primary-500'
                : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <h4 className="font-medium text-sm md:text-base">Tool Overview</h4>
            <p className="text-xs text-slate-500 line-clamp-1 mt-1">Introduction and Key Features.</p>
          </button>

          {/* Lesson List */}
          {module.lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedLesson?.id === lesson.id
                  ? 'bg-white dark:bg-slate-900 border-primary-500 shadow-md ring-1 ring-primary-500'
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-medium text-sm md:text-base">{lesson.title}</h4>
                {bookmarks.some(b => b.toolId === module.id && b.lessonId === lesson.id) && (
                  <span className="text-amber-500 text-xs">★</span>
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 mt-1">Practical applications & theory.</p>
            </button>
          ))}
        </div>

        {/* Content View */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
            {selectedLesson ? (
              // Lesson Content View
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-2xl font-bold">{selectedLesson.title}</h3>
                  <button 
                    onClick={() => onToggleBookmark(module.id, selectedLesson.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                      isBookmarked 
                        ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>{isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}</span>
                  </button>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedLesson.content}
                  </p>
                </div>

                {selectedLesson.exercise && (
                   <Simulation exercise={selectedLesson.exercise} />
                )}

                <div className="h-64 w-full bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-4">Sample Data Insight</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" fontSize={10} stroke="#94a3b8" />
                      <YAxis fontSize={10} stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }}
                      />
                      <Bar dataKey="tasks" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {selectedLesson.quiz && (
                  <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span>💡</span> Knowledge Check
                    </h4>
                    <p className="text-slate-700 dark:text-slate-200 mb-4">{selectedLesson.quiz.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedLesson.quiz.options.map((opt, idx) => (
                        <button 
                          key={idx}
                          className="p-3 text-left rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-500 transition-colors text-sm"
                          onClick={() => alert(idx === selectedLesson.quiz?.correctIndex ? 'Correct!' : 'Try again!')}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Tool Overview Page
              <div className="space-y-8 py-4">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Quick Overview</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {module.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {module.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium">
                          <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-[10px]">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4">Primary Benefits</h4>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="text-2xl">⚡</div>
                        <div>
                          <h5 className="font-bold text-sm">Productivity</h5>
                          <p className="text-xs text-slate-500">Accelerate project delivery through optimized workflows.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-2xl">🤝</div>
                        <div>
                          <h5 className="font-bold text-sm">Collaboration</h5>
                          <p className="text-xs text-slate-500">Unite your team in a single, transparent source of truth.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => setSelectedLesson(module.lessons[0])}
                    className="w-full py-4 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Start Your First Lesson 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
