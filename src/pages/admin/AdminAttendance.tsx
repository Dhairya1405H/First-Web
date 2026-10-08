import React from 'react';
import { 
  CalendarCheck, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Building,
  School,
  FileDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line 
} from 'recharts';
import { useEco } from '../../context/EcoContext';

export const AdminAttendance: React.FC = () => {
  const { classSummaries } = useEco();

  // 4. Exact cards requested by prompt:
  // 8-A — 96%
  // 8-B — 94%
  // 8-C — 95%
  // 9-A — 93%
  // 9-B — 95%
  const classCards = [
    { className: '8-A', rate: '96%', students: 32, status: 'Top Performing' },
    { className: '8-B', rate: '94%', students: 30, status: 'On Target' },
    { className: '8-C', rate: '95%', students: 31, status: 'Above Average' },
    { className: '9-A', rate: '93%', students: 34, status: 'Monitoring' },
    { className: '9-B', rate: '95%', students: 33, status: 'Above Average' },
  ];

  const monthlySchoolTrends = [
    { month: 'June', rate: 93.8 },
    { month: 'July', rate: 94.2 },
    { month: 'August', rate: 95.1 },
    { month: 'September', rate: 94.4 },
    { month: 'October (Current)', rate: 94.6 },
  ];

  const lowAttendanceStudents = [
    { name: 'Kavita Rao', class: 'Class 8-B', rate: 71.4, absences: 8, counselorStatus: 'Meeting scheduled with parents' },
    { name: 'Sameer Khan', class: 'Class 8-C', rate: 74.0, absences: 7, counselorStatus: 'Medical certification submitted' },
    { name: 'Devendra Patel', class: 'Class 9-A', rate: 72.5, absences: 9, counselorStatus: 'Notice dispatched via portal' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-sky mb-1">
            <Building className="w-4 h-4" />
            <span>Campus Register Oversight</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            School Attendance Analytics
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            Institutional tracking across grade levels, identifying early chronic absenteeism and attendance trends.
          </p>
        </div>

        <button
          onClick={() => alert('Official Greenfield International School Attendance Audit exported as CSV.')}
          className="px-5 py-2.5 rounded-xl border border-eco-border bg-white hover:bg-eco-subtle text-eco-dark font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <FileDown className="w-4 h-4" />
          <span>Export School Attendance CSV</span>
        </button>
      </div>

      {/* 4. EXACT REQUESTED HERO METRIC: School Attendance 94.6% */}
      <div className="bg-gradient-to-r from-eco-dark via-slate-900 to-eco-dark text-white p-6 sm:p-8 rounded-3xl shadow-eco relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-eco-lime">
              Institutional Baseline Target: 92.0%
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white">
                School Attendance: <span className="text-eco-lime">94.6%</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              Currently exceeding state benchmark by +2.6% with 397 students present daily across all classes.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-4 py-2 rounded-2xl border border-white/20">
            <TrendingUp className="w-5 h-5 text-eco-lime" />
            <span className="text-xs font-bold">+0.4% from September</span>
          </div>
        </div>
      </div>

      {/* 4. EXACT REQUESTED CLASS CARDS:
          8-A — 96%
          8-B — 94%
          8-C — 95%
          9-A — 93%
          9-B — 95%
      */}
      <div className="space-y-3">
        <h3 className="font-display font-extrabold text-xl text-eco-dark">
          Class Attendance Breakdown
        </h3>
        <p className="text-xs text-eco-muted">
          Real-time daily presence rates compiled from homeroom teacher rosters:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-1">
          {classCards.map((c) => (
            <div
              key={c.className}
              className="bg-white p-5 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all text-center space-y-2"
            >
              <div className="text-xs font-black uppercase tracking-wider text-eco-muted">
                Class {c.className}
              </div>
              <div className="text-3xl font-display font-black text-eco-dark">
                {c.rate}
              </div>
              <div className="text-[11px] font-semibold text-eco-muted">
                {c.students} Students
              </div>
              <div className="pt-2 border-t border-eco-border/60">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  c.rate === '96%' ? 'bg-emerald-100 text-emerald-800' :
                  c.rate === '93%' ? 'bg-amber-100 text-amber-800' : 'bg-eco-subtle text-eco-dark'
                }`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Trends & Low Attendance Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Trends Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-eco-dark">
                Attendance Trends (Last 5 Months)
              </h3>
              <p className="text-xs text-eco-muted mt-0.5">
                Monthly aggregated presence rates across all homerooms
              </p>
            </div>
            <span className="text-xs font-bold text-eco-dark bg-eco-subtle px-3 py-1 rounded-full border border-eco-border">
              Annual Average: 94.4%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySchoolTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3ECE4" />
                <XAxis dataKey="month" tick={{ fill: '#647067', fontSize: 12, fontWeight: 600 }} />
                <YAxis domain={[90, 100]} unit="%" tick={{ fill: '#647067', fontSize: 11 }} />
                <Tooltip 
                  formatter={(val: number) => [`${val}%`, 'School-Wide Attendance']}
                  contentStyle={{ backgroundColor: '#17231A', color: '#fff', borderRadius: '12px' }}
                />
                <Bar dataKey="rate" fill="#0284C7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Attendance Intervention Panel (1 col) */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display font-bold text-base text-eco-dark">
                Students With Low Attendance (&lt;75%)
              </h3>
            </div>
            <p className="text-xs text-eco-muted mb-4">
              Flagged cases receiving administrative academic counseling and intervention:
            </p>

            <div className="space-y-3">
              {lowAttendanceStudents.map((st, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-rose-950">{st.name}</span>
                    <span className="font-black text-xs text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                      {st.rate}%
                    </span>
                  </div>
                  <div className="text-[11px] text-eco-muted">
                    {st.class} • {st.absences} absences
                  </div>
                  <p className="text-[10px] text-rose-800 font-medium pt-0.5">
                    {st.counselorStatus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-eco-border">
            <button
              onClick={() => alert('Batch counselor notices generated for flagged students.')}
              className="w-full py-2.5 rounded-xl bg-eco-subtle hover:bg-eco-border/60 text-eco-dark font-bold text-xs transition-colors border border-eco-border cursor-pointer"
            >
              Notify Homeroom Counselors
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
