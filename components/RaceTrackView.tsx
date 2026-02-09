
import React, { useState, useEffect } from 'react';
import { AppRoute } from '../types';
import { ChevronLeft, Play, QrCode } from 'lucide-react';

interface RaceTrackViewProps {
  navigateTo: (route: AppRoute) => void;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
}

const RaceTrackView: React.FC<RaceTrackViewProps> = ({ navigateTo, coins, setCoins }) => {
  const [racing, setRacing] = useState(false);
  const [positions, setPositions] = useState([0, 0, 0, 0, 0]);
  const [bet, setBet] = useState(400);

  useEffect(() => {
    let interval: any = null;
    if (racing) {
      interval = setInterval(() => {
        setPositions(prev => {
          const next = prev.map(pos => pos >= 100 ? pos : pos + Math.random() * 5);
          if (next.some(pos => pos >= 100)) {
            setRacing(false);
            const winner = next.indexOf(Math.max(...next));
            alert(`Horse ${winner + 1} won!`);
            // Simulated win logic
            if (winner === 0) setCoins(c => c + bet * 2);
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [racing, bet, setCoins]);

  const startRace = () => {
    if (coins < bet) return alert("Not enough coins");
    setCoins(c => c - bet);
    setPositions([0, 0, 0, 0, 0]);
    setRacing(true);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => navigateTo(AppRoute.HOME)} className="bg-gray-100 p-3 rounded-2xl">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">賽馬場</h1>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border">
          <span className="text-yellow-600">💰</span>
          <span className="font-bold">{coins}</span>
        </div>
      </header>

      <div className={`rounded-[3rem] p-8 transition-colors duration-500 mb-8 ${racing ? 'bg-green-300' : 'bg-gray-100'}`}>
        <div className="space-y-8">
          {[1, 2, 3, 4, 5].map((h, i) => (
            <div key={h} className="relative h-2 bg-gray-300 rounded-full">
              {racing && <div className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full" style={{ width: `${positions[i]}%` }} />}
              <div 
                className="absolute -top-6 text-4xl transition-all duration-100 ease-linear"
                style={{ left: `calc(${positions[i]}% - 20px)` }}
              >
                🏇
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-3xl flex justify-between items-center">
          <span className="font-bold text-gray-600">下注金額 : 💰 {bet}</span>
          <div className="flex flex-col">
              <button onClick={() => setBet(b => b + 100)} className="text-blue-500">▲</button>
              <button onClick={() => setBet(b => Math.max(0, b - 100))} className="text-blue-500">▼</button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-3xl flex justify-between items-center">
          <span className="font-bold text-gray-600">加入我的賽馬場 : <span className="text-blue-500">2462</span></span>
          <button className="bg-white p-2 rounded-xl shadow-sm"><QrCode size={20} /></button>
        </div>

        <input 
          type="text" 
          placeholder="輸入遊戲代碼..." 
          className="w-full bg-gray-50 p-4 rounded-3xl border-none focus:ring-2 focus:ring-blue-400"
        />

        <button 
          onClick={startRace}
          disabled={racing}
          className="w-full py-4 bg-blue-500 text-white rounded-full text-2xl font-bold shadow-xl flex items-center justify-center gap-3 disabled:bg-gray-300"
        >
          <Play fill="white" size={24} /> Play
        </button>
      </div>

      <div className="flex justify-center p-4 bg-white mt-4 pb-24">
          <div className="bg-gray-100 p-1 rounded-full flex">
              <button onClick={() => navigateTo(AppRoute.GAME_PETS)} className="px-6 py-2 text-gray-500 text-xs font-bold">寵物專區</button>
              <button onClick={() => navigateTo(AppRoute.LEADERBOARD)} className="px-6 py-2 text-gray-500 text-xs font-bold">積分</button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-xs font-bold shadow-md">賽馬場</button>
          </div>
      </div>
    </div>
  );
};

export default RaceTrackView;
