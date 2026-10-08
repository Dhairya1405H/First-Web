import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  BookOpen, 
  Award, 
  Download,
  Users
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { useEco } from '../../context/EcoContext';

export const AdminAssignments: React.FC = () => {
  const { assignments } = useEco();

  const subjectBreakdown = [
    { name: 'Environmental Science', count: 4, rate: 89, color: '#16A34A' },
    { name: 'Biology & Ecology', count: 3, rate: 87, color: '#0D9488' },
    { name: 'Physics & Energy', count: 2, rate: 84, color: '#0284C7' },
    { name: 'Civics & Society', count: 2, rate: 83, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-sky mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Academic Performance Audit</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            School Assignments & Coursework Audit
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            School-wide submission completion benchmarks, department turnaround times, and curriculum alignment.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting full semester coursework report as CSV.')}
          className="px-5 py-2.5 rounded-xl border border-eco-border bg-white hover:bg-eco-subtle text-eco-dark font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Coursework Audit</span>
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-eco-muted block">
            School Submission Rate
          </span>
          <div className="text-4xl font-display font-black text-eco-dark">
            86%
          </div>
          <p className="text-xs text-eco-muted font-medium">
            342 of 398 student assignment submissions turned in on time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-eco-muted block">
            Average Evaluation Turnaround
          </span>
          <div className="text-4xl font-display font-black text-eco-primary">
            1.8 <span className="text-sm font-bold text-eco-muted">days</span>
          </div>
          <p className="text-xs text-eco-muted font-medium">
            Teacher feedback delivered within 48 hours of assignment deadline.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-eco-muted block">
            Active Schoolwork Tasks
          </span>
          <div className="text-4xl font-display font-black text-eco-dark">
            {assignments.length} <span className="text-sm font-bold text-eco-muted">live tasks</span>
          </div>
          <p className="text-xs text-eco-muted font-medium">
            Integrated across middle and high school grade cohorts.
          </p>
        </div>

      </div>

      {/* Subject Breakdown & Coursework Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Subject Breakdown Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-5">
          <h3 className="font-display font-extrabold text-xl text-eco-dark">
            Submission Rate by Academic Pillar
          </h3>

          <div className="space-y-4">
            {subjectBreakdown.map((subj) => (
              <div key={subj.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-eco-dark">{subj.name}</span>
                  <span className="text-eco-primary font-black">{subj.rate}% completed</span>
                </div>
                <div className="w-full h-3 bg-eco-subtle rounded-full overflow-hidden border border-eco-border/40">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${subj.rate}%`, backgroundColor: subj.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coursework Quality & Alignment */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-4">
          <h3 className="font-display font-extrabold text-xl text-eco-dark">
            Curricular Integration & Standards
          </h3>
          <p className="text-xs text-eco-muted leading-relaxed">
            All active coursework is mapped to Next Generation Science Standards (NGSS) and state educational competencies:
          </p>

          <div className="space-y-2.5 pt-2">
            <div className="p-3.5 rounded-2xl bg-eco-subtle border border-eco-border text-xs flex items-center justify-between">
              <div>
                <strong className="text-eco-dark block">Climate Change Essay</strong>
                <span className="text-eco-muted">NGSS MS-ESS3-5 Earth & Human Activity</span>
              </div>
              <span className="text-eco-primary font-bold">Class 9-B</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-eco-subtle border border-eco-border text-xs flex items-center justify-between">
              <div>
                <strong className="text-eco-dark block">Water Footprint Audit</strong>
                <span className="text-eco-muted">NGSS MS-ESS3-3 Resource Management</span>
              </div>
              <span className="text-eco-primary font-bold">Class 9-B</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-eco-subtle border border-eco-border text-xs flex items-center justify-between">
              <div>
                <strong className="text-eco-dark block">Renewable Energy Lab Report</strong>
                <span className="text-eco-muted">NGSS MS-PS3-2 Potential Energy</span>
              </div>
              <span className="text-eco-primary font-bold">Class 9-B</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
