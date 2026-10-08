import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Award, 
  Edit3, 
  X, 
  Send, 
  Paperclip, 
  Check, 
  MessageSquareQuote,
  TrendingUp
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import { Assignment } from '../../types';

export const TeacherAssignments: React.FC = () => {
  const { 
    assignments, 
    assignmentSubmissions, 
    createAssignment, 
    gradeAssignmentSubmission 
  } = useEco();

  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Environmental Science');
  const [newClass, setNewClass] = useState('9-B');
  const [newDueDate, setNewDueDate] = useState('October 24, 2026');
  const [newMaxPoints, setNewMaxPoints] = useState(50);
  const [newDescription, setNewDescription] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  // Grading Modal State
  const [gradingSubmissionId, setGradingSubmissionId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(42);
  const [gradeFeedback, setGradeFeedback] = useState<string>('Great essay Aarav! Good analysis of transport emissions.');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Please provide an assignment title.');
      return;
    }

    createAssignment({
      title: newTitle,
      subject: newSubject,
      description: newDescription || 'Complete the assignment guidelines according to class rubric.',
      teacher_id: 't-1',
      teacher_name: 'Priya Mehta',
      class_id: newClass,
      due_date: newDueDate,
      max_points: newMaxPoints,
      priority: 'Medium',
      requirements: ['Format in PDF or DOCX', 'Include original observations and data'],
      instructions: newInstructions
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gradingSubmissionId) {
      gradeAssignmentSubmission(gradingSubmissionId, gradeScore, gradeFeedback);
      setGradingSubmissionId(null);
    }
  };

  const activeGradingSub = assignmentSubmissions.find(s => s.id === gradingSubmissionId);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
            <FileText className="w-4 h-4" />
            <span>Coursework Management</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            Teacher Assignments & Grading
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            Create academic tasks, review student submissions, and release grades and rubric feedback.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-2xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm shadow-md hover:shadow-eco transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Assignment</span>
        </button>
      </div>

      {/* 9. Active Assignments Table Requested by Prompt */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-eco-border flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-eco-dark">
              Active Assignments Overview
            </h3>
            <p className="text-xs text-eco-muted mt-0.5">
              Live submission pipeline for active homeroom and science coursework
            </p>
          </div>
          <span className="text-xs font-bold text-eco-muted">
            {assignments.length} Coursework Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-eco-subtle/80 text-eco-muted uppercase text-[11px] font-extrabold border-b border-eco-border">
              <tr>
                <th className="py-3.5 px-6">Assignment</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Submitted</th>
                <th className="py-3.5 px-4">Pending</th>
                <th className="py-3.5 px-4">Average Score</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-eco-border/70">
              {assignments.map((asg) => {
                const isEssay = asg.title.includes('Essay');
                const submitted = isEssay ? 24 : 18;
                const pending = isEssay ? 4 : 10;
                const avgScore = isEssay ? '87%' : '91%';

                return (
                  <tr key={asg.id} className="hover:bg-eco-subtle/40 transition-colors">
                    
                    {/* Title & Subject */}
                    <td className="py-4 px-6 font-bold text-eco-dark">
                      <div>
                        <span>{asg.title}</span>
                        <span className="text-[11px] font-normal text-eco-muted block mt-0.5">
                          {asg.subject} • {asg.max_points} pts
                        </span>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="py-4 px-4 font-semibold text-eco-dark">
                      Class {asg.class_id}
                    </td>

                    {/* Due Date */}
                    <td className="py-4 px-4 text-eco-muted font-medium">
                      {asg.due_date}
                    </td>

                    {/* Submitted */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        {submitted} submitted
                      </span>
                    </td>

                    {/* Pending */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        {pending} pending
                      </span>
                    </td>

                    {/* Average Score */}
                    <td className="py-4 px-4 font-display font-black text-eco-dark">
                      {avgScore}
                    </td>

                    {/* Grade Action Button */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => {
                          // Find Aarav's submission for this assignment or mock it
                          const sub = assignmentSubmissions.find(s => s.assignment_id === asg.id) || assignmentSubmissions[0];
                          setGradingSubmissionId(sub?.id || 'sub-asg-4');
                          setGradeScore(42);
                          setGradeFeedback('Great essay Aarav! Good analysis of transport emissions.');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                      >
                        Grade Submissions
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 10. GRADING INTERFACE MODAL REQUESTED BY PROMPT */}
      {gradingSubmissionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-eco-border shadow-2xl space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-eco-border pb-4">
              <div>
                <span className="text-xs font-bold text-eco-primary uppercase tracking-wider">
                  Teacher Evaluation Interface
                </span>
                <h3 className="font-display font-extrabold text-xl text-eco-dark mt-0.5">
                  Grade Student Submission
                </h3>
              </div>
              <button
                onClick={() => setGradingSubmissionId(null)}
                className="p-1 rounded-lg text-eco-muted hover:text-eco-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Submission Details */}
            <div className="p-4 rounded-2xl bg-eco-subtle border border-eco-border space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-eco-muted font-bold">Student:</span>
                <span className="font-extrabold text-eco-dark text-sm">Aarav Sharma (Class 9-B)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-eco-muted font-bold">Assignment:</span>
                <span className="font-bold text-eco-dark">Climate Change Essay</span>
              </div>
              <div className="flex justify-between">
                <span className="text-eco-muted font-bold">Submission File:</span>
                <span className="font-bold text-blue-600 flex items-center gap-1">
                  <Paperclip className="w-3.5 h-3.5" /> Aarav_Sharma_Climate_Essay.pdf
                </span>
              </div>
            </div>

            {/* Submitted Response Preview */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-eco-muted">
                Student Text Response Preview:
              </label>
              <div className="p-3.5 rounded-2xl bg-white border border-eco-border text-xs text-eco-muted italic leading-relaxed max-h-32 overflow-y-auto">
                "{activeGradingSub?.text_response || 'In this essay, I demonstrate three primary mechanisms through which students actively reduce emissions: first, eliminating single-use packaging during lunch; second, transitioning to zero-emission cycling commutes; and third, conducting daily vampire power audits in homerooms.'}"
              </div>
            </div>

            {/* Grading Form */}
            <form onSubmit={handleGradeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1">
                  Score (Out of 50 Max Points)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={gradeScore}
                    onChange={(e) => setGradeScore(Number(e.target.value))}
                    className="w-24 px-3.5 py-2 rounded-xl border border-eco-border text-lg font-display font-black text-eco-dark focus:outline-none focus:ring-2 focus:ring-eco-primary/40"
                  />
                  <span className="text-sm font-bold text-eco-muted">/ 50 Points</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1">
                  Teacher Feedback & Notes
                </label>
                <textarea
                  rows={3}
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  placeholder="Provide constructive feedback for Aarav..."
                  className="w-full p-3 rounded-xl border border-eco-border text-xs text-eco-dark focus:outline-none focus:ring-2 focus:ring-eco-primary/40"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setGradingSubmissionId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-eco-muted hover:text-eco-dark"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Grade</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. CREATE ASSIGNMENT MODAL REQUESTED BY PROMPT */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-eco-border shadow-2xl space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="font-display font-bold text-xl text-eco-dark">
                Create New Academic Assignment
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-eco-muted hover:text-eco-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Urban Heat Island Analysis"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-eco-border text-sm font-semibold text-eco-dark focus:outline-none focus:ring-2 focus:ring-eco-primary/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1">
                    Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-eco-border text-xs font-bold text-eco-dark"
                  >
                    <option value="Environmental Science">Environmental Science</option>
                    <option value="Biology & Ecology">Biology & Ecology</option>
                    <option value="Physics">Physics</option>
                    <option value="Civics & Sustainability">Civics & Sustainability</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1">
                    Class
                  </label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-eco-border text-xs font-bold text-eco-dark"
                  >
                    <option value="9-B">Class 9-B</option>
                    <option value="9-A">Class 9-A</option>
                    <option value="8-B">Class 8-B</option>
                    <option value="8-A">Class 8-A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1">
                    Due Date
                  </label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-eco-border text-xs font-semibold text-eco-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1">
                    Maximum Points
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={newMaxPoints}
                    onChange={(e) => setNewMaxPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-eco-border text-xs font-bold text-eco-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1">
                  Description & Task Prompt
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Outline the assignment prompt for students..."
                  className="w-full p-3 rounded-xl border border-eco-border text-xs text-eco-dark"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-eco-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-eco-primary text-white font-bold text-xs shadow"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
