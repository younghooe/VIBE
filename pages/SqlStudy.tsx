import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Trophy, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const SqlStudy: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDates, setCompletedDates] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sql-study-logs');
    if (saved) {
      setCompletedDates(new Set(JSON.parse(saved)));
    }
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('sql-study-logs', JSON.stringify(Array.from(completedDates)));
    }
  }, [completedDates, isLoaded]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });

  // Generate calendar grid
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const toggleDate = (day: number) => {
    const dateKey = `${year}-${month}-${day}`;
    const newCompleted = new Set(completedDates);
    if (newCompleted.has(dateKey)) {
      newCompleted.delete(dateKey);
    } else {
      newCompleted.add(dateKey);
    }
    setCompletedDates(newCompleted);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calculate stats for current month
  let checkedCount = 0;
  for (let i = 1; i <= daysInMonth; i++) {
    if (completedDates.has(`${year}-${month}-${i}`)) {
      checkedCount++;
    }
  }
  const progress = Math.round((checkedCount / daysInMonth) * 100);
  const isCompleted = progress === 100;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> 메인으로 돌아가기
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center">
                        <CalendarDays className="mr-3 text-blue-500" /> SQL Daily Tracker
                    </h1>
                    <p className="text-slate-500 mt-1">매일 SQL 문제를 풀고 체크하여 습관을 만들어보세요.</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-blue-600">{progress}%</div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Monthly Goal</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mb-2">
                <div 
                    className={`h-full transition-all duration-1000 ease-out rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            
            {/* Completion Message */}
            {isCompleted && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-center text-green-700 animate-bounce-short">
                    <Trophy className="w-6 h-6 mr-2 text-green-600" />
                    <span className="font-bold">축하합니다! 이번 달 학습이 완료되었습니다.</span>
                </div>
            )}
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Month Navigation */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <button onClick={prevMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold text-slate-800">
                    {monthName} {year}
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-7 border-b border-slate-100">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 bg-slate-50">
                {days.map((day, index) => {
                    if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square bg-slate-50 border-b border-r border-slate-100/50"></div>;
                    }

                    const dateKey = `${year}-${month}-${day}`;
                    const isChecked = completedDates.has(dateKey);
                    const isToday = 
                        new Date().getDate() === day && 
                        new Date().getMonth() === month && 
                        new Date().getFullYear() === year;

                    return (
                        <div 
                            key={dateKey} 
                            onClick={() => toggleDate(day)}
                            className="aspect-square border-b border-r border-slate-100 bg-white relative group cursor-pointer hover:bg-blue-50 transition-colors"
                        >
                            <div className={`absolute top-2 left-2 text-sm font-medium ${isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md' : 'text-slate-500'}`}>
                                {day}
                            </div>
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform
                                    ${isChecked ? 'bg-blue-500 scale-100 shadow-md' : 'scale-0 opacity-0'}
                                `}>
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SqlStudy;