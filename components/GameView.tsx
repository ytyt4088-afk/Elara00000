
import React, { useState } from 'react';
import { AppRoute, Item } from '../types';
import { ChevronLeft, Plus, DollarSign } from 'lucide-react';

interface GameViewProps {
  navigateTo: (route: AppRoute) => void;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
}

const ITEMS: Item[] = [
  { id: '1', name: 'Baseball', price: 250, image: '⚾', type: 'asset' },
  { id: '2', name: 'Basketball', price: 250, image: '🏀', type: 'asset' },
  { id: '3', name: 'Skateboard', price: 350, image: '🛹', type: 'asset' },
  { id: '4', name: 'Slide', price: 550, image: '🛝', type: 'asset' },
  { id: '5', name: 'Saxophone', price: 750, image: '🎷', type: 'asset' },
  { id: '6', name: 'Guitar', price: 750, image: '🎸', type: 'asset' },
];

const BACKGROUNDS: Item[] = [
  { id: 'b1', name: 'Meadow', price: 500, image: 'https://picsum.photos/id/10/200', type: 'background' },
  { id: 'b2', name: 'Wooden', price: 250, image: 'https://picsum.photos/id/20/200', type: 'background' },
  { id: 'b3', name: 'Marble', price: 750, image: 'https://picsum.photos/id/30/200', type: 'background' },
];

const GameView: React.FC<GameViewProps> = ({ navigateTo, coins, setCoins }) => {
  const [activeTab, setActiveTab] = useState<'items' | 'backgrounds'>('items');
  const [placedItems, setPlacedItems] = useState<{id: string, x: number, y: number, char: string}[]>([
    { id: 'start1', x: 50, y: 50, char: '🦦' },
    { id: 'start2', x: 20, y: 30, char: '📺' },
    { id: 'start3', x: 70, y: 20, char: '🧸' },
  ]);

  const buyItem = (item: Item) => {
    if (coins >= item.price) {
      setCoins(prev => prev - item.price);
      if (item.type === 'asset') {
        setPlacedItems(prev => [...prev, {
          id: Date.now().toString(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          char: item.image
        }]);
      }
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="p-6 flex items-center justify-between">
        <button onClick={() => navigateTo(AppRoute.HOME)} className="bg-white p-3 rounded-2xl shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">寵物專區</h1>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-gray-100">
          <span className="text-yellow-600 font-bold">💰</span>
          <span className="font-bold">{coins}</span>
        </div>
      </header>

      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My Pets</h2>
          <button className="text-gray-400"><Plus size={24} /></button>
        </div>

        {/* Pet Display Window */}
        <div className="relative w-full aspect-square bg-gradient-to-b from-cyan-300 to-blue-400 rounded-[3rem] shadow-inner overflow-hidden border-[8px] border-white">
          {placedItems.map(item => (
            <div 
              key={item.id}
              className="absolute text-4xl cursor-move transition-all"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.char}
            </div>
          ))}
          {/* Static Environment Elements */}
          <div className="absolute bottom-12 left-12 text-3xl">🚽</div>
          <div className="absolute bottom-12 left-28 text-3xl">🛁</div>
          <div className="absolute bottom-16 right-16 text-3xl">🚪</div>
          <div className="absolute top-16 right-16 text-4xl">🖼️</div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-t-[3rem] p-6 shadow-2xl">
        <div className="bg-gray-100 rounded-full flex p-1 mb-6">
          <button 
            onClick={() => setActiveTab('items')}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${activeTab === 'items' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
          >
            Items
          </button>
          <button 
            onClick={() => setActiveTab('backgrounds')}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${activeTab === 'backgrounds' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
          >
            Backgrounds
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {(activeTab === 'items' ? ITEMS : BACKGROUNDS).map(item => (
            <button 
              key={item.id}
              onClick={() => buyItem(item)}
              className="bg-gray-50 p-4 rounded-3xl flex flex-col items-center border border-gray-100 hover:bg-white hover:shadow-md transition-all active:scale-95"
            >
              <p className="text-sm font-bold mb-2 text-gray-700">{item.name}</p>
              <div className="h-16 flex items-center justify-center mb-2 overflow-hidden rounded-xl">
                {item.type === 'background' ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">{item.image}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-yellow-700">
                <span>💰</span>
                <span>{item.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Sub-tabs for game sections */}
      <div className="flex justify-center p-4 bg-white pb-28">
          <div className="bg-gray-100 p-1 rounded-full flex">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-xs font-bold shadow-md">寵物專區</button>
              <button onClick={() => navigateTo(AppRoute.LEADERBOARD)} className="px-6 py-2 text-gray-500 text-xs font-bold">積分</button>
              <button onClick={() => navigateTo(AppRoute.GAME_RACE)} className="px-6 py-2 text-gray-500 text-xs font-bold">賽馬場</button>
          </div>
      </div>
    </div>
  );
};

export default GameView;
