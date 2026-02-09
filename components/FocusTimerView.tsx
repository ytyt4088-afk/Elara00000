
import React, { useState, useEffect, useCallback } from 'react';
import { AppRoute } from '../types';
import { ChevronLeft, Search, Mic, Play, Pause, RotateCcw } from 'lucide-react';

interface FocusTimerViewProps {
  navigateTo: (route: AppRoute) => void;
  onFinish: () => void;
}

const FocusTimerView: React.FC<FocusTimerViewProps> = ({ navigateTo, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(2400); // 40 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [tab, setTab] = useState<'timer' | 'tasks'>('timer');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onFinish();
      alert("Great job! Focus session completed.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onFinish]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / 2400) * 360;

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigateTo(AppRoute.HOME)} className="bg-gray-100 p-3 rounded-2xl">
          <ChevronLeft size={24} />
        </button>
        <div className="bg-gray-100 rounded-full flex p-1 flex-1 mx-4">
          <button 
            onClick={() => setTab('timer')}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${tab === 'timer' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
          >
            計時器
          </button>
          <button 
            onClick={() => navigateTo(AppRoute.TASKS)}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${tab === 'tasks' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
          >
            Today's Task
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">What should we<br/>focus on?</h2>
        
        <div className="w-full max-w-xs relative mb-12">
          <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Type" 
            className="w-full bg-gray-100 rounded-full py-3 px-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
            <Mic size={20} />
          </div>
        </div>

        {/* Timer Dial */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-12">
          {/* Simple SVG for the dial based on Figma design */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="110"
              cy="110"
              r="100"
              fill="transparent"
              stroke="#e2e8f0"
              strokeWidth="12"
              strokeDasharray="10 5"
            />
            <circle
              cx="110"
              cy="110"
              r="100"
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="12"
              strokeDasharray="691"
              strokeDashoffset={691 - (progress / 360) * 691}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-600">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="flex gap-4 w-full px-8">
           <button 
            onClick={() => { setIsActive(!isActive); }}
            className={`flex-1 py-4 rounded-3xl text-xl font-bold text-white shadow-lg transition-all ${isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={() => { setTimeLeft(2400); setIsActive(false); }}
            className="bg-gray-100 p-4 rounded-3xl text-gray-500"
          >
            <RotateCcw size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimerView;
