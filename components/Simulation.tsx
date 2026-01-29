import React, { useState } from 'react';
import { SimulationType, Exercise } from '../types';

interface SimulationProps {
  exercise: Exercise;
}

const INITIAL_TASKS = [
  { id: 1, title: 'Requirement Doc', status: 'To Do' },
  { id: 2, title: 'UI Mockups', status: 'In Progress' },
  { id: 3, title: 'Database Setup', status: 'To Do' },
];

export const Simulation: React.FC<SimulationProps> = ({ exercise }) => {
  const [completed, setCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showWASD, setShowWASD] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Simulation States
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [message, setMessage] = useState('');
  const [dbStatus, setDbStatus] = useState('Planning');
  const [priority, setPriority] = useState('Low');
  const [code, setCode] = useState(JSON.stringify({
    webhook_url: "https://lark.com/api/v1/...",
    trigger: "new_document",
    action: "notify_channel"
  }, null, 2));

  const resetSimulation = () => {
    setCompleted(false);
    setFeedback('');
    setTasks(INITIAL_TASKS);
    setMessage('');
    setDbStatus('Planning');
    setPriority('Low');
    setIsPaused(false);
    setCode(JSON.stringify({
      webhook_url: "https://lark.com/api/v1/...",
      trigger: "new_document",
      action: "notify_channel"
    }, null, 2));
  };

  const moveTask = (id: number) => {
    if (isPaused) return;
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'To Do' ? 'In Progress' : 'Done';
        if (nextStatus === 'Done') setCompleted(true);
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleSlackSend = () => {
    if (isPaused) return;
    if (message.trim().length > 10) {
      setCompleted(true);
      setFeedback('Great job! Your message is clear and professional.');
    } else {
      setFeedback('Try adding more context (at least 10 chars).');
    }
  };

  const checkConfig = () => {
    if (isPaused) return;
    try {
      const parsed = JSON.parse(code);
      if (parsed.trigger && (parsed.action === 'notify_team')) {
        setCompleted(true);
        setFeedback('Perfect! Automation configured correctly.');
      } else {
        setFeedback('Almost! Update the "action" to "notify_team".');
      }
    } catch (e) {
      setFeedback('Invalid JSON format.');
    }
  };

  const updateNotion = (val: string) => {
    if (isPaused) return;
    setDbStatus(val);
    if (val === 'Launch') {
      setCompleted(true);
      setFeedback('Database updated! Notion view will now sync across devices.');
    }
  };

  const updateAsana = (val: string) => {
    if (isPaused) return;
    setPriority(val);
    if (val === 'High') {
      setCompleted(true);
      setFeedback('Priority escalated! The team will see this in their "Inbox".');
    }
  };

  const renderContent = () => {
    if (isPaused) {
      return (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
          <span className="text-4xl mb-4">⏸️</span>
          <p className="font-bold text-slate-500 uppercase tracking-widest text-sm">Simulation Paused</p>
          <button onClick={() => setIsPaused(false)} className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg text-xs font-bold hover:bg-primary-700 transition-all">Resume Learning</button>
        </div>
      );
    }

    switch (exercise.type) {
      case SimulationType.JIRA_BOARD:
      case SimulationType.TRELLO_LIST:
        return (
          <div className="grid grid-cols-3 gap-4 min-h-[180px]">
            {['To Do', 'In Progress', 'Done'].map(status => (
              <div key={status} className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700 flex flex-col">
                <h5 className="text-[10px] font-bold uppercase text-slate-400 mb-2 px-1">{status}</h5>
                <div className="flex-1 space-y-2">
                  {tasks.filter(t => t.status === status).map(task => (
                    <button 
                      key={task.id}
                      onClick={() => moveTask(task.id)}
                      className="w-full text-left p-2 bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-[11px] hover:border-primary-500 transition-colors group"
                    >
                      {task.title}
                      <span className="block mt-1 text-[8px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Click to move →</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case SimulationType.SLACK_CHAT:
        return (
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 h-24 overflow-y-auto border border-slate-800">
              <div className="mb-2"><span className="text-purple-400 font-bold">#project-delta</span></div>
              {completed && <div className="text-white"><span className="font-bold text-blue-400">You:</span> {message}</div>}
              {!completed && <div className="text-slate-600 italic">Waiting for input...</div>}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your update..."
                className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button onClick={handleSlackSend} className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors">Send</button>
            </div>
          </div>
        );

      case SimulationType.LARK_CONFIG:
        return (
          <div className="space-y-4">
            <div className="relative">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-40 bg-slate-900 text-primary-400 font-mono text-xs p-4 rounded-lg border border-slate-700 outline-none focus:ring-1 focus:ring-primary-500"
                spellCheck={false}
              />
              <div className="absolute top-2 right-2 text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500 font-mono">automation.json</div>
            </div>
            <button onClick={checkConfig} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl text-sm font-bold transition-all">Save & Deploy</button>
          </div>
        );

      case SimulationType.NOTION_DB:
        return (
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase">
                <tr>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-medium">Q4 Roadmap</td>
                  <td className="p-3">
                    <select 
                      value={dbStatus} 
                      onChange={(e) => updateNotion(e.target.value)}
                      className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded px-2 py-1 outline-none border border-transparent focus:border-primary-500"
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Launch">Launch</option>
                    </select>
                  </td>
                  <td className="p-3 text-slate-400">@me</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case SimulationType.ASANA_TASK:
        return (
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-bold text-sm">Review App Security</h5>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] text-slate-400">Priority:</span>
                 <select 
                  value={priority}
                  onChange={(e) => updateAsana(e.target.value)}
                  className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1"
                 >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                 </select>
              </div>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${priority === 'High' ? 'w-full bg-rose-500' : priority === 'Medium' ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-blue-500'}`}
              ></div>
            </div>
          </div>
        );

      default:
        return <div className="p-4 text-center text-slate-500 italic">Simulation pending...</div>;
    }
  };

  return (
    <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-primary-100 dark:border-primary-900/30 shadow-inner overflow-hidden">
      {showWASD && !isPaused && (
        <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-1 opacity-50 pointer-events-none scale-75">
          <div className="w-8 h-8 border-2 border-slate-400 rounded flex items-center justify-center font-bold text-slate-400">W</div>
          <div className="flex gap-1">
            <div className="w-8 h-8 border-2 border-slate-400 rounded flex items-center justify-center font-bold text-slate-400">A</div>
            <div className="w-8 h-8 border-2 border-slate-400 rounded flex items-center justify-center font-bold text-slate-400">S</div>
            <div className="w-8 h-8 border-2 border-slate-400 rounded flex items-center justify-center font-bold text-slate-400">D</div>
          </div>
          <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">Mobile Controls Active</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Interactive Lab
          </h4>
          <p className="text-xs text-slate-500 mt-1">{exercise.instructions}</p>
        </div>
        <div className="flex items-center gap-2">
          {completed && (
            <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-in zoom-in duration-300">
              Completed
            </div>
          )}
          
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${isPaused ? 'text-primary-500' : 'text-slate-500 dark:text-slate-400'}`}
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>

          <button 
            onClick={() => setShowWASD(!showWASD)}
            className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${showWASD ? 'text-primary-500' : 'text-slate-500 dark:text-slate-400'}`}
            title="Mobile Controls (WASD)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>

          <button 
            onClick={resetSimulation}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
            title="Reset Simulation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {renderContent()}

      {feedback && !isPaused && (
        <div className={`mt-4 p-3 rounded-lg text-xs font-medium animate-in slide-in-from-left-2 duration-300 ${completed ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
};
