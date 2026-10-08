import React, { useState } from 'react';
import { 
  CalendarCheck, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar as CalendarIcon, 
  Award, 
  Flame, 
  Info,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const StudentAttendance: React.FC = () => {
  const { user } = useEco();

  // Current calendar month state (0 = Sep 2026, 1 = Oct 2026, 2 = Nov 2026)
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(1);

  const months = [
    { name: 'September 2026', totalDays: 30, startDayOfWeek: 2, present: 20, absent: 2, late: 1, attendanceRate: 90 },
    { name: 'October 2026', totalDays: 31, startDayOfWeek: 4, present: 21, absent: 1, late: 0, attendanceRate: 95 },
    { name: 'November 2026', totalDays: 30, startDayOfWeek: 0, present: 5, absent: 0, late: 0, attendanceRate: 100 }
  ];

  const currentMonth = months[selectedMonthIdx];

  // Specific day status generator for October 2026
  const getDayStatus = (day: number) => {
    if (selectedMonthIdx === 1) { // October 2026
      // Sundays (4, 11, 18, 25) & Saturdays (3, 10, 17, 24, 31) -> Weekend/Holiday
      const dayOfWeek = (day + currentMonth.startDayOfWeek - 1) % 7;
      if (dayOfWeek === 0 || dayOfWeek === 6) return 'holiday';

      // Oct 2: National Holiday (Gandhi Jayanti)
      if (day === 2) return 'holiday';

      // Oct 1: Absent
      if (day === 1) return 'absent';

      // Current date is Oct 8
      if (day > 8) return 'future';

      // Days 5, 6, 7, 8 are Present
      return 'present';
    } else if (selectedMonthIdx === 0) { // September 2026
      const dayOfWeek = (day + currentMonth.startDayOfWeek - 1) % 7;
      if (dayOfWeek === 0 || dayOfWeek === 6) return 'holiday';
      if (day === 8) return 'late';
      if (day === 18 || day === 22) return 'absent';
      return 'present';
    } else {
      const dayOfWeek = (day + currentMonth.startDayOfWeek - 1) % 7;
      if (dayOfWeek === 0 || dayOfWeek === 6) return 'holiday';
      return 'future';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-1 ring-emerald-400/30';
      case 'absent':
        return 'bg-rose-50 text-rose-700 border-rose-300 ring-1 ring-rose-400/30 font-bold';
      case 'late':
        return 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/30';
      case 'holiday':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-white text-eco-muted border-eco-border/60';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'present':
        return <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Present" />;
      case 'absent':
        return <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" title="Absent" />;
      case 'late':
        return <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" title="Late" />;
      case 'holiday':
        return <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" title="Holiday / Weekend" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
            <CalendarCheck className="w-4 h-4" />
            <span>Academic Habit Tracking</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            Attendance Record & Calendar
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            Consistent attendance fuels everyday habit building and unlocks academic achievement badges.
          </p>
        </div>

        {/* 7-day perfect streak callout */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-2xs">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span>7-Day Perfect School Attendance Streak!</span>
        </div>
      </div>

      {/* 1. Attendance Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Overall Percentage */}
        <div className="bg-white p-5 rounded-3xl border border-eco-border shadow-2xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-eco-muted block">
            Overall Attendance
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-display font-black text-eco-primary">
              92%
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Good
            </span>
          </div>
          <p className="text-[11px] text-eco-muted font-medium">
            50 total active school days recorded
          </p>
        </div>

        {/* Present Days */}
        <div className="bg-white p-5 rounded-3xl border border-eco-border shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">Present Days</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-display font-black text-eco-dark">
            46 <span className="text-sm font-bold text-eco-muted">days</span>
          </div>
          <p className="text-[11px] text-eco-muted font-medium">
            92% on-time classroom presence
          </p>
        </div>

        {/* Absent Days */}
        <div className="bg-white p-5 rounded-3xl border border-eco-border shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">Absent Days</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-display font-black text-eco-dark">
            3 <span className="text-sm font-bold text-eco-muted">days</span>
          </div>
          <p className="text-[11px] text-eco-muted font-medium">
            All medical notes approved
          </p>
        </div>

        {/* Late Days */}
        <div className="bg-white p-5 rounded-3xl border border-eco-border shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">Late Days</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-display font-black text-eco-dark">
            1 <span className="text-sm font-bold text-eco-muted">day</span>
          </div>
          <p className="text-[11px] text-eco-muted font-medium">
            Morning transit delay recorded
          </p>
        </div>

      </div>

      {/* 2. Attendance Calendar Section */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-6 sm:p-8 space-y-6">
        
        {/* Month Selector & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-eco-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-eco-subtle border border-eco-border text-eco-dark">
              <CalendarIcon className="w-5 h-5 text-eco-primary" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-eco-dark">
                {currentMonth.name}
              </h3>
              <p className="text-xs text-eco-muted font-medium">
                {user.grade} • Class 9-B Roll No. 04
              </p>
            </div>
          </div>

          {/* Month Switcher Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setSelectedMonthIdx(prev => Math.max(0, prev - 1))}
              disabled={selectedMonthIdx === 0}
              className="p-2 rounded-xl border border-eco-border text-eco-muted hover:text-eco-dark hover:bg-eco-subtle disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-eco-dark px-2">
              {currentMonth.name.split(' ')[0]}
            </span>
            <button
              onClick={() => setSelectedMonthIdx(prev => Math.min(months.length - 1, prev + 1))}
              disabled={selectedMonthIdx === months.length - 1}
              className="p-2 rounded-xl border border-eco-border text-eco-muted hover:text-eco-dark hover:bg-eco-subtle disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-eco-muted">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>🟢 Present</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span>🔴 Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span>🟡 Late</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300" />
            <span>⚪ Holiday / Weekend</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-eco-muted py-2 border-b border-eco-border/60">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Month Days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty slots for start offset */}
            {Array.from({ length: currentMonth.startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-2xl bg-eco-bg/40 opacity-40 border border-dashed border-eco-border/40" />
            ))}

            {/* Day slots */}
            {Array.from({ length: currentMonth.totalDays }).map((_, i) => {
              const day = i + 1;
              const status = getDayStatus(day);
              const isToday = selectedMonthIdx === 1 && day === 8;

              return (
                <div
                  key={`day-${day}`}
                  className={`h-16 sm:h-20 p-2 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${getStatusColor(status)} ${
                    isToday ? 'ring-2 ring-eco-primary font-black shadow-xs' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-extrabold">{day}</span>
                    {isToday && (
                      <span className="text-[9px] uppercase tracking-wider font-extrabold bg-eco-primary text-white px-1.5 py-0.2 rounded-full">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-semibold">
                    <span className="capitalize hidden sm:inline">{status}</span>
                    <span className="sm:hidden">{getStatusDot(status)}</span>
                    <span className="hidden sm:inline">{getStatusDot(status)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Month Summary Bar requested by prompt */}
        <div className="p-5 rounded-2xl bg-eco-subtle border border-eco-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-base text-eco-dark">
              {currentMonth.name} Summary
            </h4>
            <p className="text-xs text-eco-muted mt-0.5">
              Verified by Class Teacher Priya Mehta
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold">
            <span className="text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-xl">
              Present: <strong>{currentMonth.present}</strong>
            </span>
            <span className="text-rose-800 bg-rose-100/80 px-3 py-1.5 rounded-xl">
              Absent: <strong>{currentMonth.absent}</strong>
            </span>
            <span className="text-amber-800 bg-amber-100/80 px-3 py-1.5 rounded-xl">
              Late: <strong>{currentMonth.late}</strong>
            </span>
            <span className="text-eco-dark bg-eco-lime/30 px-3 py-1.5 rounded-xl">
              Attendance: <strong>{currentMonth.attendanceRate}%</strong>
            </span>
          </div>
        </div>

      </div>

      {/* Gamification Connection: Academic Achievement Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-eco-lime/20 border border-eco-primary/30 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white border border-eco-border shadow-xs flex items-center justify-center shrink-0">
            <Award className="w-7 h-7 text-eco-primary" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-eco-primary">
              EcoQuest Academic Incentive
            </span>
            <h4 className="font-display font-bold text-base sm:text-lg text-eco-dark">
              Consistent Learner & Perfect Week Badges
            </h4>
            <p className="text-xs text-eco-muted mt-0.5">
              Students receive +25 XP rewards for 7 consecutive on-time school days.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-white border border-eco-border text-xs font-bold text-eco-dark shadow-2xs">
            ✨ +25 XP Earned
          </span>
        </div>
      </div>

    </div>
  );
};
