
import React from 'react';
import { AppRoute } from '../types';
import { ChevronLeft, List, Search, Plus } from 'lucide-react';

const CalendarDetailView: React.FC<{navigateTo: (route: AppRoute) => void}> = ({ navigateTo }) => {
  const hours = Array.from({length: 25}, (_, i) => i.toString().padStart(2, '0') + ':00');

  return (
    <div className="bg-white min-h-screen">
      <header className="p-6">
        <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigateTo(AppRoute.HOME)} className="bg-gray-100 p-3 rounded-2xl">
              <ChevronLeft size={24} />
            </button>
            <div className="bg-gray-100 rounded-full flex gap-1 p-1">
                <button className="p-2 text-gray-600"><List size={18}/></button>
                <button className="p-2 text-gray-600"><Search size={18}/></button>
                <button className="p-2 text-gray-600"><Plus size={18}/></button>
            </div>
        </div>
        
        <div className="flex justify-between items-center mb-4 overflow-x-auto gap-4 pb-2 scrollbar-hide">
          {[25, 26, 27, 28, 29, 30, 31].map(d => (
            <div key={d} className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${d === 28 ? 'bg-red-500 text-white' : 'text-gray-400'}`}>
              {d}
            </div>
          ))}
        </div>
        
        <h2 className="text-center font-bold text-gray-800 border-t border-b py-3 border-gray-100 mb-4">Wednesday - Jan 28, 2026</h2>
      </header>

      <div className="relative">
          {hours.map(h => (
              <div key={h} className="flex items-center gap-4 px-6 h-16 group">
                  <span className="text-xs font-bold text-gray-400 w-10">{h}</span>
                  <div className="flex-1 border-t border-gray-100 h-0 group-last:border-none"></div>
              </div>
          ))}
          {/* Current Time Indicator */}
          <div className="absolute top-[410px] left-0 right-0 flex items-center">
              <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full ml-4 z-10 font-bold">6:30</span>
              <div className="flex-1 h-[2px] bg-red-500"></div>
          </div>
      </div>
    </div>
  );
};

export default CalendarDetailView;
