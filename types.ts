
export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  image: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'background' | 'asset';
}

export enum AppRoute {
  HOME = 'home',
  FOCUS_TIMER = 'focus-timer',
  TASKS = 'tasks',
  GAME_PETS = 'game-pets',
  GAME_RACE = 'game-race',
  LEADERBOARD = 'leaderboard',
  SETTINGS = 'settings',
  AI_CHAT = 'ai-chat',
  CALENDAR_DETAIL = 'calendar-detail'
}
