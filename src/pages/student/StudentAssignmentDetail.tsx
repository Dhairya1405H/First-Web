import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  ArrowLeft, 
  Calendar, 
  User, 
  CheckCircle2, 
  Upload, 
  Sparkles, 
  Award, 
  AlertCircle, 
  Paperclip,
  Check,
  Send,
  MessageSquareQuote
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const StudentAssignmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { assignments, assignmentSubmissions, submitAssignment } = useEco();

  const assignment = assignments.find(a => a.id === id) || assignments[0];
  const submission = assignmentSubmissions.find(s => s.assignment_id === assignment.id);

  const [textResponse, setTextResponse] = useState(submission?.text_response || '');
  const [selectedFileName, setSelectedFileName] = useState(submission?.file_name || 'Aarav_Sharma_Climate_Essay.pdf');
  const [justSubmitted, setJustSubmitted] = useState(false);

  const isGraded = submission?.status === 'graded';
  const isSubmitted = submission?.status === 'submitted' || justSubmitted;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textResponse.trim()) {
      alert('Please write or paste your assignment essay response before submitting.');
      return;
    }

    submitAssignment(assignment.id, textResponse, selectedFileName);
    setJustSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Back button */}
      <div>
        <Link
          to="/student/assignments"
          className="inline-flex items-center gap-2 text-xs font-bold text-eco-muted hover:text-eco-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Assignments</span>
        </Link>
      </div>

      {/* Success banner if just submitted */}
      {justSubmitted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-between text-emerald-900 animate-in zoom-in-95">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Assignment Submitted Successfully</h4>
              <p className="text-xs text-emerald-700">
                Your submission has been queued for Teacher Priya Mehta to review. +20 XP awarded!
              </p>
            </div>
          </div>
          <span className="text-xs font-black bg-emerald-200/80 px-2.5 py-1 rounded-lg">
            +20 XP
          </span>
        </div>
      )}

      {/* Main Assignment Header Card */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-6 sm:p-8 space-y-6">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-eco-subtle text-eco-dark border border-eco-border">
            {assignment.subject}
          </span>

          <div className="flex items-center gap-2">
            {isGraded ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                🟢 Graded
              </span>
            ) : isSubmitted ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                🔵 Submitted
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                🟡 Pending
              </span>
            )}
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-eco-lime/20 text-eco-dark border border-eco-lime/40">
              {assignment.max_points} Points
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-eco-dark">
          {assignment.title}
        </h1>

        {/* Meta Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-eco-subtle border border-eco-border text-xs text-eco-dark font-medium">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-eco-primary" />
            <span>Teacher: <strong>{assignment.teacher_name}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-eco-primary" />
            <span>Due Date: <strong>{assignment.due_date}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-eco-primary" />
            <span>Class: <strong>Class {assignment.class_id}</strong></span>
          </div>
        </div>

        {/* Description requested by prompt */}
        <div className="space-y-2">
          <h3 className="font-display font-bold text-base text-eco-dark">
            Assignment Prompt & Instructions
          </h3>
          <p className="text-sm text-eco-muted leading-relaxed p-4 rounded-2xl bg-eco-bg border border-eco-border/80">
            "{assignment.description}"
          </p>
        </div>

        {/* Requirements requested by prompt */}
        <div className="space-y-2">
          <h3 className="font-display font-bold text-base text-eco-dark">
            Submission Requirements
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-eco-text font-medium">
            {assignment.requirements.map((req, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-eco-primary shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Graded View if already graded (Requested by prompt) */}
      {isGraded && submission && (
        <div className="bg-emerald-50/70 rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-700" />
              <h3 className="font-display font-black text-xl text-emerald-950">
                Evaluation & Teacher Feedback
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-800 font-bold block">Assigned Score</span>
              <span className="text-2xl font-display font-black text-emerald-900">
                {submission.score} / {assignment.max_points}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Feedback from {assignment.teacher_name}:</span>
            </div>
            <p className="text-sm text-eco-dark leading-relaxed italic">
              "{submission.feedback || 'Great essay Aarav! Good analysis of transport emissions and community waste loops.'}"
            </p>
            <span className="text-[11px] text-eco-muted block font-medium">
              Graded on {submission.graded_at || 'Oct 2026'}
            </span>
          </div>
        </div>
      )}

      {/* Submission Form Section */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-eco-border pb-4">
          <h3 className="font-display font-bold text-lg text-eco-dark">
            Student Submission Portal
          </h3>
          <span className="text-xs text-eco-muted">
            Logged in as <strong>Aarav Sharma</strong>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* File Upload Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted">
              Attach Assignment File (PDF or DOCX)
            </label>
            <div className="border-2 border-dashed border-eco-border hover:border-eco-primary/60 rounded-2xl p-6 text-center space-y-3 bg-eco-bg/50 transition-colors">
              <Upload className="w-8 h-8 text-eco-primary mx-auto" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-eco-dark">
                  Drag and drop your essay file or click to choose
                </p>
                <p className="text-xs text-eco-muted mt-0.5">
                  Accepted formats: PDF, DOCX (Max 25MB)
                </p>
              </div>

              {/* Sample Attached File Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-eco-border text-xs font-semibold text-eco-dark shadow-2xs">
                <Paperclip className="w-3.5 h-3.5 text-eco-primary" />
                <span>{selectedFileName}</span>
                <span className="text-[10px] text-eco-primary font-bold">(Ready)</span>
              </div>
            </div>
          </div>

          {/* Text Response Area */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted">
              Essay Body / Text Response (500 Words)
            </label>
            <textarea
              rows={8}
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
              placeholder="Write or paste your 500-word essay here explaining three tangible ways students can help reduce climate change..."
              className="w-full p-4 rounded-2xl border border-eco-border bg-white text-sm text-eco-dark placeholder:text-eco-muted/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/40 leading-relaxed font-sans"
            />
            <div className="flex justify-between text-xs text-eco-muted font-medium">
              <span>Word count: ~{textResponse.trim() ? textResponse.trim().split(/\s+/).length : 0} words</span>
              <span>Target: 500 words minimum</span>
            </div>
          </div>

          {/* Submit Button requested by prompt */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-eco-muted">
              Submission triggers automatic timestamp and teacher notification.
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm shadow-md hover:shadow-eco transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitted ? 'Resubmit Assignment' : 'Submit Assignment'}</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
