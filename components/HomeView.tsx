
import React from 'react';
import { AppRoute, Task } from '../types';
import { Calendar as CalendarIcon, MoreHorizontal, Plus, ChevronRight, MessageCircle, Clock } from 'lucide-react';

interface HomeViewProps {
  navigateTo: (route: AppRoute) => void;
  tasks: Task[];
}

const HomeView: React.FC<HomeViewProps> = ({ navigateTo, tasks }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">F.O.C.U.S</h1>
        <button className="bg-gray-100 p-2 rounded-full shadow-sm">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Focus</h2>
          <button onClick={() => navigateTo(AppRoute.TASKS)} className="text-blue-500">
            <Plus size={20} />
          </button>
        </div>

        {/* Today's Task Card */}
        <div 
          onClick={() => navigateTo(AppRoute.TASKS)}
          className="bg-gradient-to-br from-blue-300 to-indigo-400 rounded-3xl p-6 text-white shadow-xl mb-4 cursor-pointer transform hover:scale-[1.02] transition-transform"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Today's Task</h3>
            <MoreHorizontal size={20} className="opacity-70" />
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 2).map(task => (
              <div key={task.id} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white/50" />
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-[10px] opacity-70">{task.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Cards Row */}
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => navigateTo(AppRoute.FOCUS_TIMER)}
            className="bg-gradient-to-br from-pink-300 to-purple-400 rounded-3xl p-6 text-white shadow-lg cursor-pointer transform hover:scale-[1.02] transition-transform"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🍅</span>
              <MoreHorizontal size={18} className="opacity-70" />
            </div>
            <h3 className="text-lg font-bold mt-4">番茄鐘</h3>
          </div>

          <div 
            onClick={() => navigateTo(AppRoute.AI_CHAT)}
            className="bg-gradient-to-br from-indigo-300 to-blue-400 rounded-3xl p-6 text-white shadow-lg cursor-pointer transform hover:scale-[1.02] transition-transform"
          >
            <div className="flex justify-between items-start mb-4">
              <MessageCircle size={24} />
              <MoreHorizontal size={18} className="opacity-70" />
            </div>
            <h3 className="text-lg font-bold mt-4">提醒訊息</h3>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Calendar</h2>
          <button className="text-blue-500">
            <Plus size={20} />
          </button>
        </div>
        
        <div 
          onClick={() => navigateTo(AppRoute.CALENDAR_DETAIL)}
          className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm cursor-pointer"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-red-500">January 2026 <ChevronRight className="inline" size={16} /></h3>
            <div className="flex gap-4 text-gray-400">
              <ChevronRight className="rotate-180" size={20} />
              <ChevronRight size={20} />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-400 mb-2">
            <span>SUN</span><span>MON</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
          </div>
          <div className="grid grid-cols-7 gap-y-3 text-center text-sm font-medium">
            <div className="col-span-3"></div>
            <span>1</span><span>2</span><span className="text-red-500">3</span><span>4</span>
            <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
            <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
            <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
            <span>26</span><span>27</span><span className="bg-red-500 text-white rounded-full flex items-center justify-center w-8 h-8 mx-auto">28</span><span>29</span><span>30</span><span>31</span>
          </div>
        </div>
      </div>

      {/* Mini Game Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Game Areas</h2>
        <div className="space-y-4">
          <div 
            onClick={() => navigateTo(AppRoute.GAME_PETS)}
            className="bg-gradient-to-r from-teal-300 to-cyan-400 rounded-3xl p-6 h-40 relative overflow-hidden shadow-lg cursor-pointer transition-all hover:brightness-105"
          >
            <h3 className="text-2xl font-bold text-white relative z-10">寵物專區</h3>
            <div className="absolute inset-0 flex items-center justify-around opacity-40 select-none">
              <span className="text-4xl mt-12">🦦</span>
              <span className="text-2xl mb-8">🎮</span>
              <span className="text-3xl mt-4">🧸</span>
            </div>
          </div>

          <div 
            onClick={() => navigateTo(AppRoute.GAME_RACE)}
            className="bg-gradient-to-r from-emerald-300 to-green-400 rounded-3xl p-6 shadow-lg cursor-pointer flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🏇</span>
              <h3 className="text-xl font-bold text-white">賽馬場</h3>
            </div>
            <MoreHorizontal className="text-white opacity-70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
