
import React, { useState } from 'react';
import { AppRoute } from '../types';
import { ChevronLeft, Trophy } from 'lucide-react';

const LeaderboardView: React.FC<{navigateTo: (route: AppRoute) => void}> = ({ navigateTo }) => {
  const [tab, setTab] = useState<'area' | 'friends'>('area');
  
  const players = Array.from({length: 15}, (_, i) => ({
    rank: i + 1,
    name: `username_${i + 1}`,
    score: 1000 - i * 50
  }));

  return (
    <div className="p-6 bg-white min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <button onClick={() => navigateTo(AppRoute.HOME)} className="bg-gray-100 p-3 rounded-2xl">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">積分排名</h1>
        <div className="w-10"></div>
      </header>

      <div className="bg-gray-100 rounded-full flex p-1 mb-8">
        <button 
          onClick={() => setTab('area')}
          className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${tab === 'area' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
        >
          All Area
        </button>
        <button 
          onClick={() => setTab('friends')}
          className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${tab === 'friends' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
        >
          Friends
        </button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <span className="text-4xl mb-2">🏆</span>
        <h2 className="text-2xl font-bold">Bronze League</h2>
      </div>

      <div className="bg-gray-50 rounded-[3rem] p-6 space-y-4">
        {players.map(p => (
          <div key={p.rank} className="flex items-center gap-4">
            <div className="w-8 text-sm font-bold text-gray-400">
              {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 text-sm font-bold text-gray-700">{p.name}</div>
            <div className="text-sm font-bold text-gray-400">{p.score}</div>
          </div>
        ))}
      </div>

       <div className="flex justify-center p-4 bg-white mt-4 pb-24">
          <div className="bg-gray-100 p-1 rounded-full flex">
              <button onClick={() => navigateTo(AppRoute.GAME_PETS)} className="px-6 py-2 text-gray-500 text-xs font-bold">寵物專區</button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-xs font-bold shadow-md">積分</button>
              <button onClick={() => navigateTo(AppRoute.GAME_RACE)} className="px-6 py-2 text-gray-500 text-xs font-bold">賽馬場</button>
          </div>
      </div>
    </div>
  );
};

export default LeaderboardView;
