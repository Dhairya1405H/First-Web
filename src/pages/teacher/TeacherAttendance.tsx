import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Calendar as CalendarIcon, 
  Users, 
  Check, 
  X, 
  Clock, 
  ShieldAlert, 
  Save, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';
import { useEco } from '../../context/EcoContext';
import { AttendanceStatus } from '../../types';

export const TeacherAttendance: React.FC = () => {
  const { 
    leaderboard, 
    attendanceRecords, 
    updateStudentAttendance, 
    markAllClassPresent, 
    saveAttendanceForDate 
  } = useEco();

  const [selectedClass, setSelectedClass] = useState('9-B');
  const [selectedDate, setSelectedDate] = useState('2026-10-08');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Available students in class
  const classStudents = leaderboard;

  // Find attendance status for a student on current date
  const getStudentStatus = (studentId: string): AttendanceStatus => {
    const record = attendanceRecords.find(r => r.student_id === studentId && r.date === selectedDate);
    if (record) return record.status;
    // Default fallback
    if (studentId === 'u-6') return 'absent';
    if (studentId === 'u-8') return 'late';
    return 'present';
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    updateStudentAttendance(studentId, selectedClass, selectedDate, status);
  };

  const handleMarkAllPresent = () => {
    markAllClassPresent(selectedClass, selectedDate);
  };

  const handleSaveAttendance = () => {
    saveAttendanceForDate(selectedClass, selectedDate);
    setSaveSuccessMsg(true);
    setTimeout(() => {
      setSaveSuccessMsg(false);
    }, 3500);
  };

  // Weekly analytics data for chart
  const weeklyTrendData = [
    { day: 'Mon', percentage: 95.2 },
    { day: 'Tue', percentage: 96.8 },
    { day: 'Wed', percentage: 93.4 },
    { day: 'Thu (Today)', percentage: 94.2 },
    { day: 'Fri (Proj)', percentage: 95.0 },
  ];

  // Students with low attendance (<75%)
  const lowAttendanceStudents = [
    { name: 'Kavita Rao', id: 'low-1', rate: 71.4, absences: 8, notes: 'Medical leave letter pending' },
    { name: 'Sameer Khan', id: 'low-2', rate: 74.0, absences: 7, notes: 'Sports tournament travel' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
            <CalendarCheck className="w-4 h-4" />
            <span>Classroom Register</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            Teacher Attendance Management
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            Mark daily student presence, manage excused absences, and monitor classroom engagement trends.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllPresent}
            className="px-4 py-2.5 rounded-xl border border-eco-border bg-white hover:bg-eco-subtle text-eco-dark font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSaveAttendance}
            className="px-5 py-2.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-eco transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 flex items-center gap-3 animate-in zoom-in-95">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs sm:text-sm font-bold">
            Attendance saved successfully. Records synchronized with the school administrative register.
          </div>
        </div>
      )}

      {/* Selection Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-eco-border shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        
        {/* Class Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1.5">
            Select Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-eco-border bg-white text-sm font-bold text-eco-dark focus:outline-none focus:ring-2 focus:ring-eco-primary/40"
          >
            <option value="9-B">Class 9-B (33 Students) • Homeroom</option>
            <option value="9-A">Class 9-A (34 Students)</option>
            <option value="8-B">Class 8-B (30 Students)</option>
            <option value="8-A">Class 8-A (32 Students)</option>
            <option value="8-C">Class 8-C (31 Students)</option>
          </select>
        </div>

        {/* Date Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1.5">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-eco-border bg-white text-sm font-bold text-eco-dark focus:outline-none focus:ring-2 focus:ring-eco-primary/40"
          >
          </input>
        </div>

        {/* Summary Pill */}
        <div className="p-3 bg-eco-subtle rounded-2xl border border-eco-border text-center space-y-0.5">
          <span className="text-xs text-eco-muted font-bold block">Today's Class Average</span>
          <span className="text-xl font-display font-black text-eco-dark">94.2% Attendance</span>
        </div>

      </div>

      {/* 2. Student Attendance Table */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-eco-border flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-eco-dark">
              Roll Call Roster ({classStudents.length} Students Listed)
            </h3>
            <p className="text-xs text-eco-muted mt-0.5">
              Click status buttons directly to mark Present, Absent, Late, or Excused.
            </p>
          </div>
          <span className="text-xs font-bold text-eco-primary bg-eco-lime/20 px-3 py-1 rounded-full border border-eco-lime/40">
            Real-time Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-eco-subtle/80 text-eco-muted uppercase text-[11px] font-extrabold border-b border-eco-border">
              <tr>
                <th className="py-3.5 px-6">Roll & Student</th>
                <th className="py-3.5 px-4 text-center">Present</th>
                <th className="py-3.5 px-4 text-center">Absent</th>
                <th className="py-3.5 px-4 text-center">Late</th>
                <th className="py-3.5 px-4 text-center">Excused</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-eco-border/70">
              {classStudents.map((st, idx) => {
                const currentStatus = getStudentStatus(st.id);

                return (
                  <tr key={st.id} className="hover:bg-eco-subtle/40 transition-colors">
                    
                    {/* Student Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-eco-muted font-bold w-6">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-2xs"
                        />
                        <div>
                          <span className="font-bold text-eco-dark block">{st.name}</span>
                          <span className="text-[11px] text-eco-muted">{st.className}</span>
                        </div>
                      </div>
                    </td>

                    {/* Present Button */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleStatusChange(st.id, 'present')}
                        className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
                          currentStatus === 'present'
                            ? 'bg-emerald-500 text-white shadow-xs scale-105'
                            : 'bg-eco-subtle text-eco-muted hover:bg-emerald-100 hover:text-emerald-800'
                        }`}
                        title="Mark Present"
                      >
                        ✓
                      </button>
                    </td>

                    {/* Absent Button */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleStatusChange(st.id, 'absent')}
                        className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
                          currentStatus === 'absent'
                            ? 'bg-rose-500 text-white shadow-xs scale-105'
                            : 'bg-eco-subtle text-eco-muted hover:bg-rose-100 hover:text-rose-800'
                        }`}
                        title="Mark Absent"
                      >
                        ✕
                      </button>
                    </td>

                    {/* Late Button */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleStatusChange(st.id, 'late')}
                        className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
                          currentStatus === 'late'
                            ? 'bg-amber-500 text-white shadow-xs scale-105'
                            : 'bg-eco-subtle text-eco-muted hover:bg-amber-100 hover:text-amber-800'
                        }`}
                        title="Mark Late"
                      >
                        ⏱
                      </button>
                    </td>

                    {/* Excused Button */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleStatusChange(st.id, 'excused')}
                        className={`w-9 h-9 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                          currentStatus === 'excused'
                            ? 'bg-blue-500 text-white shadow-xs scale-105'
                            : 'bg-eco-subtle text-eco-muted hover:bg-blue-100 hover:text-blue-800'
                        }`}
                        title="Mark Excused"
                      >
                        MED
                      </button>
                    </td>

                    {/* Current Pill */}
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        currentStatus === 'present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : currentStatus === 'absent'
                          ? 'bg-rose-100 text-rose-800'
                          : currentStatus === 'late'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {currentStatus}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. ATTENDANCE ANALYTICS SECTION REQUESTED BY PROMPT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Attendance Trend Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-eco-dark">
                Attendance Trends: Class {selectedClass}
              </h3>
              <p className="text-xs text-eco-muted mt-0.5">
                Average Attendance Rate: <strong>94.2%</strong> over the past week
              </p>
            </div>
            <div className="text-xs font-bold text-eco-primary bg-eco-subtle px-3 py-1.5 rounded-xl border border-eco-border">
              Weekly Benchmark: ≥92%
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3ECE4" />
                <XAxis dataKey="day" tick={{ fill: '#647067', fontSize: 12, fontWeight: 600 }} />
                <YAxis domain={[80, 100]} unit="%" tick={{ fill: '#647067', fontSize: 11 }} />
                <Tooltip 
                  formatter={(val: number) => [`${val}%`, 'Daily Attendance Rate']}
                  contentStyle={{ backgroundColor: '#17231A', color: '#fff', borderRadius: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#16A34A" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#16A34A' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Highlight Students Below 75% Attendance (1 col) */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display font-bold text-base text-eco-dark">
                Low Attendance Alerts (&lt;75%)
              </h3>
            </div>
            <p className="text-xs text-eco-muted mb-4">
              Students falling below the 75% requirement trigger automated homeroom counselor follow-ups:
            </p>

            <div className="space-y-3">
              {lowAttendanceStudents.map((st) => (
                <div key={st.id} className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-rose-950">{st.name}</span>
                    <span className="font-black text-xs text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                      {st.rate}%
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-800/80">
                    {st.absences} cumulative absences • {st.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-eco-border">
            <button
              onClick={() => alert('Attendance alert notice sent to homeroom counselor and parents.')}
              className="w-full py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs transition-colors cursor-pointer"
            >
              Send Parent Attendance Alert
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
