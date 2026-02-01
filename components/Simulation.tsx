import React, { useState, useEffect } from 'react';
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
  const [showControls, setShowControls] = useState(false);
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

  const renderContent = () => {
    if (isPaused) {
      return (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <span className="text-4xl mb-4 animate-pulse">⏸️</span>
          <p className="font-bold text-slate-500 uppercase tracking-widest text-sm">Simulation Paused</p>
          <button 
            onClick={() => setIsPaused(false)} 
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-full text-xs font-bold hover:bg-primary-700 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            RESUME
          </button>
        </div>
      );
    }

    switch (exercise.type) {
      case SimulationType.JIRA_BOARD:
      case SimulationType.TRELLO_LIST:
        return (
          <div className="grid grid-cols-3 gap-4 min-h-[200px]">
            {['To Do', 'In Progress', 'Done'].map(status => (
              <div key={status} className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-2 border border-slate-200 dark:border-slate-700 flex flex-col">
                <h5 className="text-[9px] font-black uppercase text-slate-400 mb-2 px-1 tracking-tighter">{status}</h5>
                <div className="flex-1 space-y-2">
                  {tasks.filter(t => t.status === status).map(task => (
                    <button 
                      key={task.id}
                      onClick={() => moveTask(task.id)}
                      className="w-full text-left p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-[11px] font-medium hover:border-primary-500 hover:ring-2 hover:ring-primary-500/20 transition-all group"
                    >
                      {task.title}
                      <span className="block mt-1 text-[8px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Click to advance →</span>
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
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-300 h-24 overflow-y-auto border border-slate-800 shadow-inner">
              <div className="mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-purple-400 font-bold">#general</span>
              </div>
              {completed && (
                <div className="animate-in slide-in-from-left duration-300">
                  <span className="font-bold text-blue-400">You:</span> {message}
                </div>
              )}
              {!completed && <div className="text-slate-600 italic animate-pulse">Waiting for your message...</div>}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              />
              <button onClick={handleSlackSend} className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95">Send</button>
            </div>
          </div>
        );

      case SimulationType.LARK_CONFIG:
        return (
          <div className="space-y-4">
            <div className="relative group">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-40 bg-slate-900 text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                spellCheck={false}
              />
              <div className="absolute top-3 right-3 text-[10px] bg-slate-800 px-2 py-1 rounded-md text-slate-500 font-mono border border-slate-700 group-hover:text-primary-400 transition-colors">config.json</div>
            </div>
            <button onClick={checkConfig} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl text-sm font-bold transition-all border border-slate-700 shadow-lg active:scale-95">Verify & Deploy</button>
          </div>
        );

      default:
        return <div className="p-8 text-center text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">Coming soon...</div>;
    }
  };

  return (
    <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
      {/* Game Style WASD Overlay */}
      {showControls && !isPaused && (
        <div className="absolute bottom-6 right-6 z-30 flex flex-col items-center gap-1 opacity-60 pointer-events-none scale-90">
          <div className="w-10 h-10 border-2 border-primary-500/50 rounded-xl flex items-center justify-center font-black text-primary-500/50 bg-primary-500/5">W</div>
          <div className="flex gap-1">
            <div className="w-10 h-10 border-2 border-primary-500/50 rounded-xl flex items-center justify-center font-black text-primary-500/50 bg-primary-500/5">A</div>
            <div className="w-10 h-10 border-2 border-primary-500/50 rounded-xl flex items-center justify-center font-black text-primary-500/50 bg-primary-500/5">S</div>
            <div className="w-10 h-10 border-2 border-primary-500/50 rounded-xl flex items-center justify-center font-black text-primary-500/50 bg-primary-500/5">D</div>
          </div>
          <span className="text-[10px] font-black text-primary-500/40 mt-1 uppercase tracking-widest">Mobile Controls</span>
        </div>
      )}

      {/* Header Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-sm">Active Simulation</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{exercise.instructions}</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2 rounded-xl transition-all ${isPaused ? 'bg-primary-500 text-white shadow-lg' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-700'}`}
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            )}
          </button>

          <button 
            onClick={() => setShowControls(!showControls)}
            className={`p-2 rounded-xl transition-all ${showControls ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-700'}`}
            title="Toggle Mobile WASD"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>

          <button 
            onClick={resetSimulation}
            className="p-2 rounded-xl text-slate-500 hover:bg-white dark:hover:bg-slate-700 transition-all"
            title="Reset"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {renderContent()}

      {feedback && !isPaused && (
        <div className={`mt-6 p-4 rounded-xl text-xs font-bold animate-in zoom-in duration-300 border-2 ${completed ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400'}`}>
          <div className="flex items-center gap-2">
            <span>{completed ? '🎉' : '⚠️'}</span>
            {feedback}
          </div>
        </div>
      )}

      {completed && !isPaused && (
        <div className="absolute top-0 right-0 p-4">
           <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-bounce uppercase">Complete!</div>
        </div>
      )}
    </div>
  );
};