
import React from 'react';
import { AppRoute, Task } from '../types';
import { ChevronLeft, Plus, CheckCircle2, Circle } from 'lucide-react';

interface TasksViewProps {
  navigateTo: (route: AppRoute) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksView: React.FC<TasksViewProps> = ({ navigateTo, tasks, setTasks }) => {
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    const title = prompt("Enter task title:");
    if (title) {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        dueDate: new Date().toLocaleDateString(),
        completed: false
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigateTo(AppRoute.HOME)} className="bg-gray-100 p-3 rounded-2xl">
          <ChevronLeft size={24} />
        </button>
        <div className="bg-gray-100 rounded-full flex p-1 flex-1 mx-4">
          <button 
            onClick={() => navigateTo(AppRoute.FOCUS_TIMER)}
            className="flex-1 py-2 text-sm font-bold text-gray-400"
          >
            計時器
          </button>
          <button className="flex-1 py-2 text-sm font-bold bg-white shadow-sm rounded-full">
            Today's Task
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-blue-500 mb-8">Reminders</h1>

      <div className="space-y-6">
        {tasks.map(task => (
          <div key={task.id} className="flex items-start gap-4 group cursor-pointer" onClick={() => toggleTask(task.id)}>
            <div className="mt-1">
              {task.completed ? (
                <CheckCircle2 size={24} className="text-blue-500" />
              ) : (
                <Circle size={24} className="text-gray-300 group-hover:text-blue-400" />
              )}
            </div>
            <div>
              <p className={`text-lg font-bold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.title}
              </p>
              <p className="text-xs text-gray-400 font-medium">{task.dueDate}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addTask}
        className="fixed bottom-32 right-8 w-14 h-14 bg-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20"
      >
        <Plus size={32} />
      </button>
    </div>
  );
};

export default TasksView;
