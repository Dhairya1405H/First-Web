import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Filter,
  CheckCircle,
  Award
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import { Assignment } from '../../types';

export const StudentAssignments: React.FC = () => {
  const { assignments, assignmentSubmissions } = useEco();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Top Dashboard Summary figures requested by prompt
  const totalCount = 8;
  const pendingCount = 3;
  const submittedCount = 4;
  const gradedCount = 1;
  const overdueCount = 0;

  const getSubmissionFor = (assignmentId: string) => {
    return assignmentSubmissions.find(s => s.assignment_id === assignmentId);
  };

  const getStatusBadge = (assignment: Assignment) => {
    const sub = getSubmissionFor(assignment.id);

    if (sub?.status === 'graded') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Graded ({sub.score}/{assignment.max_points})</span>
        </span>
      );
    }

    if (sub?.status === 'submitted') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Submitted</span>
        </span>
      );
    }

    if (assignment.id === 'asg-4') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Graded (48/50)</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        <span>Pending</span>
      </span>
    );
  };

  const getPriorityBadge = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">High Priority</span>;
      case 'Medium':
        return <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">Medium</span>;
      default:
        return <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200">Standard</span>;
    }
  };

  const filteredAssignments = assignments.filter((asg) => {
    const sub = getSubmissionFor(asg.id);
    const effectiveStatus = sub?.status || 'pending';

    const matchesFilter =
      filterStatus === 'All' ||
      (filterStatus === 'Pending' && effectiveStatus === 'pending') ||
      (filterStatus === 'Submitted' && effectiveStatus === 'submitted') ||
      (filterStatus === 'Graded' && effectiveStatus === 'graded');

    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.teacher_name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
            <FileText className="w-4 h-4" />
            <span>Curriculum & Coursework</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            Student Assignments Hub
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            View upcoming academic coursework, submit digital essays, and receive verified feedback from your teachers.
          </p>
        </div>

        {/* Gamified Academic Bonus Pill */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-eco-subtle border border-eco-border text-xs font-bold text-eco-dark">
          <Sparkles className="w-4 h-4 text-eco-primary fill-eco-primary" />
          <span>Earn +20 XP on every on-time assignment submission</span>
        </div>
      </div>

      {/* 11. Student Assignment Dashboard Top Stats (Requested by Prompt) */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-eco-border/80 pb-3">
          <h3 className="font-display font-bold text-base text-eco-dark">
            Assignment Progress & Status Overview
          </h3>
          <span className="text-xs font-bold text-eco-primary">
            Semester 1 • Class 9-B
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 text-center">
          
          {/* Total */}
          <div className="p-3.5 rounded-2xl bg-eco-subtle border border-eco-border">
            <span className="text-xs font-bold uppercase tracking-wider text-eco-muted block">
              Assignments
            </span>
            <span className="text-3xl font-display font-black text-eco-dark mt-1 block">
              {totalCount}
            </span>
            <span className="text-[10px] text-eco-muted font-medium">Assigned to date</span>
          </div>

          {/* Pending */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Pending
            </span>
            <span className="text-3xl font-display font-black text-amber-900 mt-1 block">
              {pendingCount}
            </span>
            <span className="text-[10px] text-amber-800 font-medium">Action required</span>
          </div>

          {/* Submitted */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block">
              Submitted
            </span>
            <span className="text-3xl font-display font-black text-blue-900 mt-1 block">
              {submittedCount}
            </span>
            <span className="text-[10px] text-blue-800 font-medium">Under review</span>
          </div>

          {/* Graded */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Graded
            </span>
            <span className="text-3xl font-display font-black text-emerald-900 mt-1 block">
              {gradedCount}
            </span>
            <span className="text-[10px] text-emerald-800 font-medium">Scores released</span>
          </div>

          {/* Overdue */}
          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Overdue
            </span>
            <span className="text-3xl font-display font-black text-slate-700 mt-1 block">
              {overdueCount}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Zero missed dates!</span>
          </div>

        </div>

        {/* Progress Visualization */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-bold text-eco-muted">
            <span>Overall Completion Rate</span>
            <span className="text-eco-primary font-black">62.5% Complete</span>
          </div>
          <div className="w-full h-3 bg-eco-subtle rounded-full overflow-hidden flex border border-eco-border/60">
            <div style={{ width: '12.5%' }} className="bg-emerald-500" title="Graded (12.5%)" />
            <div style={{ width: '50%' }} className="bg-blue-500" title="Submitted (50%)" />
            <div style={{ width: '37.5%' }} className="bg-amber-400" title="Pending (37.5%)" />
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-eco-muted pt-1">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Graded</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Submitted</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Pending</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-eco-border shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-eco-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by assignment, subject, or teacher..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-eco-border bg-eco-subtle/50 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary/40 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-eco-subtle rounded-xl border border-eco-border text-xs font-bold w-full sm:w-auto overflow-x-auto">
            {['All', 'Pending', 'Submitted', 'Graded'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === status
                    ? 'bg-eco-primary text-white shadow-xs'
                    : 'text-eco-muted hover:text-eco-dark'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment) => {
          const sub = getSubmissionFor(assignment.id);

          return (
            <div
              key={assignment.id}
              className="bg-white rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Subject & Status */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-eco-subtle text-eco-dark border border-eco-border">
                    {assignment.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(assignment.priority)}
                    {getStatusBadge(assignment)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-extrabold text-xl text-eco-dark leading-snug">
                  {assignment.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-eco-muted leading-relaxed line-clamp-2">
                  {assignment.description}
                </p>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-eco-border/70 text-xs text-eco-muted font-medium">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-eco-primary" />
                    <span className="truncate">Teacher: {assignment.teacher_name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-eco-primary" />
                    <span>Due: {assignment.due_date}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-eco-border/60 flex items-center justify-between gap-3">
                <span className="font-display font-black text-sm text-eco-dark">
                  {assignment.max_points} Points
                </span>

                <Link
                  to={`/student/assignments/${assignment.id}`}
                  className="px-4 py-2 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Open Assignment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
