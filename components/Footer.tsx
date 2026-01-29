
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          (C) Noam Gold AI 2026
        </div>
        
        <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Ad Choices</a>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Send Feedback:</span>
          <a 
            href="mailto:goldnoamai@gmail.com" 
            className="text-primary-600 dark:text-primary-400 font-bold hover:underline transition-all"
          >
            goldnoamai@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};
