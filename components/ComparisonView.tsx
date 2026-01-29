
import React from 'react';
import { ToolModule } from '../types';

interface ComparisonViewProps {
  tools: ToolModule[];
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ tools }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Compare Tools</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Not sure which tool to choose? Compare features, pros, and cons to find the best fit for your team's workflow.
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 sticky left-0 bg-slate-50 dark:bg-slate-950 z-10 w-48">
                    Aspect
                  </th>
                  {tools.map((tool) => (
                    <th key={tool.id} scope="col" className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center text-xl shadow-sm`}>
                          {tool.icon}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{tool.title}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {/* Pros Row */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600 dark:text-emerald-400 sticky left-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
                    Top Advantages
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4 align-top">
                      <ul className="space-y-1">
                        {tool.comparison?.pros.map((pro, i) => (
                          <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1">
                            <span className="text-emerald-500">•</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Cons Row */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-rose-600 dark:text-rose-400 sticky left-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
                    Trade-offs
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4 align-top">
                      <ul className="space-y-1">
                        {tool.comparison?.cons.map((con, i) => (
                          <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1">
                            <span className="text-rose-500">•</span> {con}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Best For Row */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600 dark:text-primary-400 sticky left-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
                    Ideal Use Case
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4 align-top">
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-200 italic">
                        {tool.comparison?.bestFor}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Pricing Row */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-500 sticky left-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
                    Pricing Range
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="px-6 py-4 align-top">
                      <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        {tool.comparison?.pricing}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold">Still Undecided?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every team is different. Most modern organizations actually use a combination of tools—like Jira for dev, Slack for chat, and Notion for documentation. The "right" choice often depends on your team's size and project complexity.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-primary-50 transition-all transform hover:scale-105 shadow-lg uppercase tracking-widest text-xs">
              Take the Quiz
            </button>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
      </div>
    </div>
  );
};
