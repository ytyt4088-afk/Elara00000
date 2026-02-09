
import React from 'react';
import { AppRoute } from '../types';
import { Home, Gamepad2, Trophy, Settings, BrainCircuit } from 'lucide-react';

interface NavigationProps {
  currentRoute: AppRoute;
  navigateTo: (route: AppRoute) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentRoute, navigateTo }) => {
  const isFocus = [AppRoute.HOME, AppRoute.FOCUS_TIMER, AppRoute.TASKS, AppRoute.SETTINGS].includes(currentRoute);
  const isGame = [AppRoute.GAME_PETS, AppRoute.GAME_RACE, AppRoute.LEADERBOARD].includes(currentRoute);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-gray-100/90 backdrop-blur-md rounded-full py-2 px-4 shadow-lg flex justify-around items-center border border-white/50 z-50">
      <button 
        onClick={() => navigateTo(AppRoute.HOME)}
        className={`flex flex-col items-center p-2 rounded-full transition-all ${isFocus ? 'bg-blue-500 text-white scale-110' : 'text-gray-500'}`}
      >
        <Home size={20} />
        <span className="text-[10px] mt-1">Focus</span>
      </button>

      <button 
        onClick={() => navigateTo(AppRoute.LEADERBOARD)}
        className={`flex flex-col items-center p-2 rounded-full transition-all ${currentRoute === AppRoute.LEADERBOARD ? 'bg-blue-500 text-white scale-110' : 'text-gray-500'}`}
      >
        <Trophy size={20} />
        <span className="text-[10px] mt-1">Ranking</span>
      </button>

      <button 
        onClick={() => navigateTo(AppRoute.GAME_PETS)}
        className={`flex flex-col items-center p-2 rounded-full transition-all ${isGame && currentRoute !== AppRoute.LEADERBOARD ? 'bg-blue-500 text-white scale-110' : 'text-gray-500'}`}
      >
        <Gamepad2 size={20} />
        <span className="text-[10px] mt-1">Game</span>
      </button>
      
      <button 
        onClick={() => navigateTo(AppRoute.AI_CHAT)}
        className={`flex flex-col items-center p-2 rounded-full transition-all ${currentRoute === AppRoute.AI_CHAT ? 'bg-indigo-500 text-white animate-pulse' : 'bg-gray-200 text-indigo-500'}`}
      >
        <BrainCircuit size={20} />
        <span className="text-[10px] mt-1 font-bold">AI</span>
      </button>
    </div>
  );
};

export default Navigation;
