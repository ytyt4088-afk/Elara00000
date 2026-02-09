
import React, { useState, useEffect } from 'react';
import { AppRoute, Task } from './types';
import HomeView from './components/HomeView';
import FocusTimerView from './components/FocusTimerView';
import TasksView from './components/TasksView';
import GameView from './components/GameView';
import RaceTrackView from './components/RaceTrackView';
import LeaderboardView from './components/LeaderboardView';
import SettingsView from './components/SettingsView';
import AIChatView from './components/AIChatView';
import CalendarDetailView from './components/CalendarDetailView';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [coins, setCoins] = useState(96927);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: '閱讀天龍八部第二章', dueDate: '2026/06/25', completed: false },
    { id: '2', title: '畢業展作品繳交', dueDate: '2026/08/07', completed: false },
  ]);

  const navigateTo = (route: AppRoute) => setCurrentRoute(route);

  const renderView = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <HomeView navigateTo={navigateTo} tasks={tasks} />;
      case AppRoute.FOCUS_TIMER:
        return <FocusTimerView navigateTo={navigateTo} onFinish={() => setCoins(c => c + 100)} />;
      case AppRoute.TASKS:
        return <TasksView navigateTo={navigateTo} tasks={tasks} setTasks={setTasks} />;
      case AppRoute.GAME_PETS:
        return <GameView navigateTo={navigateTo} coins={coins} setCoins={setCoins} />;
      case AppRoute.GAME_RACE:
        return <RaceTrackView navigateTo={navigateTo} coins={coins} setCoins={setCoins} />;
      case AppRoute.LEADERBOARD:
        return <LeaderboardView navigateTo={navigateTo} />;
      case AppRoute.SETTINGS:
        return <SettingsView navigateTo={navigateTo} />;
      case AppRoute.AI_CHAT:
        return <AIChatView navigateTo={navigateTo} />;
      case AppRoute.CALENDAR_DETAIL:
        return <CalendarDetailView navigateTo={navigateTo} />;
      default:
        return <HomeView navigateTo={navigateTo} tasks={tasks} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden flex flex-col font-sans">
      <main className="flex-1 overflow-y-auto pb-24">
        {renderView()}
      </main>
      <Navigation currentRoute={currentRoute} navigateTo={navigateTo} />
    </div>
  );
};

export default App;
