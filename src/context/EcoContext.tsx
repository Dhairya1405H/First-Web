import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Challenge, 
  Badge, 
  LeaderboardEntry, 
  UserProfile, 
  Submission, 
  ActivityDataPoint,
  AttendanceRecord,
  AttendanceStatus,
  ClassAttendanceSummary,
  Assignment,
  AssignmentSubmission
} from '../types';
import api from '../services/api';

interface EcoContextType {
  // Authentication state & methods
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; error?: string; user?: any }>;
  logout: () => Promise<void>;

  // Existing state
  user: UserProfile;
  challenges: Challenge[];
  badges: Badge[];
  leaderboard: LeaderboardEntry[];
  submissions: Submission[];
  weeklyActivity: ActivityDataPoint[];
  activeChallenge: Challenge;
  submitChallengeProof: (challengeId: string, proofType: 'photo' | 'log', notes: string, photoUrl?: string) => Promise<{ success: boolean; message: string; points: number }>;
  continueCurrentChallenge: () => void;
  celebrationBadge: Badge | null;
  setCelebrationBadge: (badge: Badge | null) => void;
  activeRole: 'student' | 'teacher' | 'admin';
  setActiveRole: (role: 'student' | 'teacher' | 'admin') => void;
  verifySubmission: (submissionId: string, decision: 'verified' | 'rejected') => void;

  // Attendance state & methods
  attendanceRecords: AttendanceRecord[];
  classSummaries: ClassAttendanceSummary[];
  updateStudentAttendance: (studentId: string, classId: string, date: string, status: AttendanceStatus) => void;
  markAllClassPresent: (classId: string, date: string) => void;
  saveAttendanceForDate: (classId: string, date: string) => boolean;

  // Assignment state & methods
  assignments: Assignment[];
  assignmentSubmissions: AssignmentSubmission[];
  createAssignment: (newAssignment: Omit<Assignment, 'id' | 'created_at'>) => void;
  submitAssignment: (assignmentId: string, textResponse: string, fileName?: string) => void;
  gradeAssignmentSubmission: (submissionId: string, score: number, feedback: string) => void;
}

const initialUser: UserProfile = {
  name: 'Aarav Sharma',
  school: 'Greenfield International School',
  grade: 'Class 9-B',
  level: 'Green Guardian',
  levelNumber: 7,
  xpCurrent: 2450,
  xpNextLevel: 3000,
  points: 2450,
  streak: 12,
  challengesCompleted: 37,
  rank: 4,
  co2AvoidedKg: 18.4,
  waterSavedL: 620,
  wasteDivertedKg: 14,
  plasticAvoided: 42,
  greenCommutes: 28,
};

const initialChallenges: Challenge[] = [
  {
    id: 'plastic-free-week',
    title: 'Plastic-Free Week',
    category: 'Plastic',
    difficulty: 'Medium',
    duration: '7 days',
    points: 100,
    progress: 5,
    total: 7,
    description: 'Avoid all single-use plastic bottles, snack wrappers, and bags for 7 consecutive days. Carry a reusable bottle and canvas tote.',
    instructions: [
      'Refill your personal steel/glass water bottle at school taps',
      'Say no to plastic straws and disposable drink lids',
      'Pack lunch in reusable steel tiffin boxes',
      'Take a quick photo or write a log of your plastic-free swap each day'
    ],
    status: 'active',
    co2AvoidedKg: 3.2,
    waterSavedL: 45,
    wasteDivertedKg: 2.1,
    plasticItemsAvoided: 14,
    requiresProof: 'both',
    icon: 'PackageX',
  },
  {
    id: 'green-commute',
    title: 'Green Commute',
    category: 'Transport',
    difficulty: 'Medium',
    duration: '5 days',
    points: 120,
    progress: 3,
    total: 5,
    description: 'Travel to school using zero-emission or low-emission transport: walk, cycle, carpool, or take the school bus.',
    instructions: [
      'Log each one-way trip walked, cycled, or taken on public transit',
      'Snap a photo of your bicycle, walking shoes, or bus ticket',
      'Calculate estimated emissions avoided compared to a solo car drop-off'
    ],
    status: 'active',
    co2AvoidedKg: 6.8,
    waterSavedL: 0,
    wasteDivertedKg: 0,
    plasticItemsAvoided: 0,
    greenCommutesCount: 5,
    requiresProof: 'log',
    icon: 'Bike',
  },
  {
    id: 'water-saver',
    title: 'Water Saver',
    category: 'Water',
    difficulty: 'Easy',
    duration: '3 days',
    points: 80,
    progress: 3,
    total: 3,
    description: 'Keep showers under 4 minutes, turn taps off while brushing, and catch greywater for household plants.',
    instructions: [
      'Use a 4-minute shower timer playlist',
      'Check school and home taps for hidden drips and report them',
      'Reuse leftover drinking water to hydrate potted plants'
    ],
    status: 'completed',
    co2AvoidedKg: 1.1,
    waterSavedL: 180,
    wasteDivertedKg: 0,
    plasticItemsAvoided: 0,
    requiresProof: 'log',
    icon: 'Droplets',
  },
  {
    id: 'lights-out',
    title: 'Lights Out',
    category: 'Energy',
    difficulty: 'Easy',
    duration: '7 days',
    points: 75,
    progress: 4,
    total: 7,
    description: 'Turn off unnecessary classroom and bedroom lights, unplug vampire electronics when not in use, and rely on daylight.',
    instructions: [
      'Appoint yourself daily classroom Light Monitor during recess',
      'Switch off power strips before going to sleep',
      'Open curtains for natural study lighting during afternoon hours'
    ],
    status: 'active',
    co2AvoidedKg: 2.4,
    waterSavedL: 12,
    wasteDivertedKg: 0,
    plasticItemsAvoided: 0,
    requiresProof: 'both',
    icon: 'Zap',
  },
  {
    id: 'recycling-champion',
    title: 'Recycling Champion',
    category: 'Waste',
    difficulty: 'Medium',
    duration: '5 days',
    points: 100,
    progress: 2,
    total: 5,
    description: 'Properly segregate wet organic waste, dry paper/cardboard, and metals at school and home for responsible recycling.',
    instructions: [
      'Audit your classroom bin to ensure no recyclable paper gets contaminated',
      'Clean and dry cartons before dropping them in the dry-waste bin',
      'Help compost kitchen vegetable scraps'
    ],
    status: 'active',
    co2AvoidedKg: 4.9,
    waterSavedL: 65,
    wasteDivertedKg: 7.5,
    plasticItemsAvoided: 8,
    requiresProof: 'photo',
    icon: 'Recycle',
  },
  {
    id: 'tree-guardian',
    title: 'Tree Guardian & Sapling Nurture',
    category: 'Biodiversity',
    difficulty: 'Hard',
    duration: '14 days',
    points: 150,
    progress: 0,
    total: 14,
    description: 'Plant a native tree sapling or adopt a school garden plant, water it daily, and record its growth milestones.',
    instructions: [
      'Choose a climate-resilient native plant or school garden bed',
      'Water with collected rainwater every morning',
      'Submit a weekly photo measuring leaf growth'
    ],
    status: 'available',
    co2AvoidedKg: 12.0,
    waterSavedL: 20,
    wasteDivertedKg: 3.0,
    plasticItemsAvoided: 0,
    requiresProof: 'photo',
    icon: 'TreePine',
  }
];

const initialBadges: Badge[] = [
  {
    id: 'seed-starter',
    name: 'Seed Starter',
    description: 'Completed your very first eco-challenge and took the sustainability pledge.',
    icon: 'Sprout',
    tier: 'Bronze',
    unlocked: true,
    unlockedAt: 'Sep 14, 2026',
    category: 'Milestones',
  },
  {
    id: 'water-saver',
    name: 'Water Saver',
    description: 'Conserved over 500 liters of water through timed showers and mindful tap usage.',
    icon: 'Droplets',
    tier: 'Silver',
    unlocked: true,
    unlockedAt: 'Sep 22, 2026',
    category: 'Water',
  },
  {
    id: 'recycling-master',
    name: 'Recycling Master',
    description: 'Diverted 10+ kg of recyclable paper and organics away from city landfills.',
    icon: 'Recycle',
    tier: 'Silver',
    unlocked: true,
    unlockedAt: 'Sep 29, 2026',
    category: 'Waste',
  },
  {
    id: 'energy-hero',
    name: 'Energy Hero',
    description: 'Conducted 7 consecutive days of vampire-power shutdowns and classroom light monitoring.',
    icon: 'Zap',
    tier: 'Gold',
    unlocked: true,
    unlockedAt: 'Oct 02, 2026',
    category: 'Energy',
  },
  {
    id: 'tree-guardian',
    name: 'Tree Guardian',
    description: 'Planted or nurtured native flora in school or home garden for 2 continuous weeks.',
    icon: 'TreePine',
    tier: 'Gold',
    unlocked: true,
    unlockedAt: 'Oct 05, 2026',
    category: 'Biodiversity',
  },
  {
    id: 'plastic-warrior',
    name: 'Plastic Warrior',
    description: 'Avoided 50 single-use plastic items through reusable habit replacements.',
    icon: 'ShieldAlert',
    tier: 'Emerald',
    unlocked: false,
    progress: 42,
    maxProgress: 50,
    category: 'Plastic',
  },
  {
    id: 'green-commuter',
    name: 'Green Commuter',
    description: 'Completed 30 zero/low-emission school commutes via bicycle, walking, or bus.',
    icon: 'Bike',
    tier: 'Gold',
    unlocked: false,
    progress: 28,
    maxProgress: 30,
    category: 'Transport',
  },
  {
    id: '30-day-streak',
    name: '30-Day Streak',
    description: 'Maintained an unbroken daily environmental habit streak for an entire month.',
    icon: 'Flame',
    tier: 'Emerald',
    unlocked: false,
    progress: 12,
    maxProgress: 30,
    category: 'Habits',
  },
  // New school achievements integrated with EcoQuest
  {
    id: 'perfect-week',
    name: 'Perfect Week',
    description: 'Attended every school day on time for a full week.',
    icon: 'CalendarCheck',
    tier: 'Silver',
    unlocked: true,
    unlockedAt: 'Oct 04, 2026',
    category: 'Academic',
  },
  {
    id: 'assignment-ace',
    name: 'Assignment Ace',
    description: 'Submit 5 school assignments on or before the due date.',
    icon: 'FileCheck',
    tier: 'Gold',
    unlocked: false,
    progress: 4,
    maxProgress: 5,
    category: 'Academic',
  },
  {
    id: 'consistent-learner',
    name: 'Consistent Learner',
    description: 'Maintained above 90% attendance for 30 consecutive school days.',
    icon: 'GraduationCap',
    tier: 'Emerald',
    unlocked: false,
    progress: 24,
    maxProgress: 30,
    category: 'Academic',
  }
];

const initialLeaderboard: LeaderboardEntry[] = [
  {
    id: 'u-1',
    rank: 1,
    name: 'Meera Iyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    points: 2640,
    streak: 19,
    challengesCompleted: 41,
    co2SavedKg: 21.2,
    className: 'Class 9-B',
  },
  {
    id: 'u-2',
    rank: 2,
    name: 'Arjun Nair',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    points: 2520,
    streak: 15,
    challengesCompleted: 39,
    co2SavedKg: 19.8,
    className: 'Class 9-B',
  },
  {
    id: 'u-3',
    rank: 3,
    name: 'Tanya Sen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    points: 2490,
    streak: 14,
    challengesCompleted: 38,
    co2SavedKg: 19.1,
    className: 'Class 9-B',
  },
  {
    id: 'u-4',
    rank: 4,
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    points: 2450,
    streak: 12,
    challengesCompleted: 37,
    co2SavedKg: 18.4,
    className: 'Class 9-B',
    isCurrentUser: true,
  },
  {
    id: 'u-5',
    rank: 5,
    name: 'Diya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    points: 2310,
    streak: 11,
    challengesCompleted: 35,
    co2SavedKg: 17.5,
    className: 'Class 9-B',
  },
  {
    id: 'u-6',
    rank: 6,
    name: 'Kabir Shah',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    points: 2175,
    streak: 9,
    challengesCompleted: 32,
    co2SavedKg: 16.2,
    className: 'Class 9-B',
  },
  {
    id: 'u-7',
    rank: 7,
    name: 'Anaya Mehta',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    points: 2020,
    streak: 8,
    challengesCompleted: 30,
    co2SavedKg: 15.0,
    className: 'Class 9-B',
  },
  {
    id: 'u-8',
    rank: 8,
    name: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    points: 1980,
    streak: 7,
    challengesCompleted: 28,
    co2SavedKg: 14.1,
    className: 'Class 9-B',
  },
];

const initialActivity: ActivityDataPoint[] = [
  { day: 'Mon', points: 60, co2: 0.6, challenges: 1 },
  { day: 'Tue', points: 110, co2: 1.2, challenges: 2 },
  { day: 'Wed', points: 90, co2: 0.9, challenges: 1 },
  { day: 'Thu', points: 140, co2: 1.5, challenges: 2 },
  { day: 'Fri', points: 120, co2: 1.3, challenges: 2 },
  { day: 'Sat', points: 180, co2: 2.1, challenges: 3 },
  { day: 'Sun', points: 100, co2: 1.0, challenges: 1 },
];

const initialSubmissions: Submission[] = [
  {
    id: 'sub-1',
    studentName: 'Aarav Sharma',
    challengeId: 'plastic-free-week',
    challengeTitle: 'Plastic-Free Week (Day 5)',
    submittedAt: 'Today, 08:30 AM',
    proofType: 'photo',
    notes: 'Used my stainless steel lunchbox and glass flask instead of plastic wrappers at lunch break.',
    photoUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80',
    status: 'verified',
    points: 25,
    aiVerification: {
      result: 'pass',
      confidence: 0.96,
      detectedObjects: ['reusable bottle', 'steel container', 'zero plastic packaging']
    }
  },
  {
    id: 'sub-2',
    studentName: 'Aarav Sharma',
    challengeId: 'green-commute',
    challengeTitle: 'Green Commute (Day 3)',
    submittedAt: 'Yesterday, 04:15 PM',
    proofType: 'log',
    notes: 'Cycled 3.2 km to and from school with helmet and reflective gear.',
    status: 'verified',
    points: 30,
    aiVerification: {
      result: 'pass',
      confidence: 0.92,
      detectedObjects: ['bicycle', 'gps distance log']
    }
  },
  {
    id: 'sub-3',
    studentName: 'Diya Patel',
    challengeId: 'recycling-champion',
    challengeTitle: 'Recycling Champion',
    submittedAt: 'Today, 09:10 AM',
    proofType: 'photo',
    notes: 'Sorted 4 kg of old notebooks and clean juice cartons for community collection drive.',
    photoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&auto=format&fit=crop&q=80',
    status: 'pending',
    points: 50,
    aiVerification: {
      result: 'pass',
      confidence: 0.94,
      detectedObjects: ['cardboard paper', 'segregation bin']
    }
  }
];

// Initial Attendance Records
const initialAttendanceRecords: AttendanceRecord[] = [
  { id: 'att-1', student_id: 'u-4', student_name: 'Aarav Sharma', class_id: '9-B', date: '2026-10-08', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-08T08:30:00Z' },
  { id: 'att-2', student_id: 'u-5', student_name: 'Diya Patel', class_id: '9-B', date: '2026-10-08', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-08T08:30:00Z' },
  { id: 'att-3', student_id: 'u-6', student_name: 'Kabir Shah', class_id: '9-B', date: '2026-10-08', status: 'absent', marked_by: 'Priya Mehta', created_at: '2026-10-08T08:30:00Z' },
  { id: 'att-4', student_id: 'u-7', student_name: 'Anaya Mehta', class_id: '9-B', date: '2026-10-08', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-08T08:30:00Z' },
  { id: 'att-5', student_id: 'u-8', student_name: 'Rohan Verma', class_id: '9-B', date: '2026-10-08', status: 'late', marked_by: 'Priya Mehta', created_at: '2026-10-08T08:30:00Z' },
  { id: 'att-6', student_id: 'u-1', student_name: 'Meera Iyer', class_id: '9-B', date: '2026-10-08', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-08T08:30:00Z' },
  { id: 'att-7', student_id: 'u-2', student_name: 'Arjun Nair', class_id: '9-B', date: '2026-10-08', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-08T08:30:00Z' },
  { id: 'att-8', student_id: 'u-3', student_name: 'Tanya Sen', class_id: '9-B', date: '2026-10-08', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-08T08:30:00Z' },
  // Historical records for Aarav
  { id: 'att-h1', student_id: 'u-4', student_name: 'Aarav Sharma', class_id: '9-B', date: '2026-10-07', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-07T08:30:00Z' },
  { id: 'att-h2', student_id: 'u-4', student_name: 'Aarav Sharma', class_id: '9-B', date: '2026-10-06', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-06T08:30:00Z' },
  { id: 'att-h3', student_id: 'u-4', student_name: 'Aarav Sharma', class_id: '9-B', date: '2026-10-05', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-05T08:30:00Z' },
  { id: 'att-h4', student_id: 'u-4', student_name: 'Aarav Sharma', class_id: '9-B', date: '2026-10-02', status: 'present', marked_by: 'Priya Mehta', created_at: '2026-10-02T08:30:00Z' },
  { id: 'att-h5', student_id: 'u-4', student_name: 'Aarav Sharma', class_id: '9-B', date: '2026-10-01', status: 'absent', marked_by: 'Priya Mehta', created_at: '2026-10-01T08:30:00Z' },
];

const initialClassSummaries: ClassAttendanceSummary[] = [
  {
    class_id: '8-A',
    className: 'Class 8-A',
    totalStudents: 32,
    presentToday: 31,
    averagePercentage: 96.0,
    weeklyTrend: [
      { day: 'Mon', percentage: 95 },
      { day: 'Tue', percentage: 97 },
      { day: 'Wed', percentage: 96 },
      { day: 'Thu', percentage: 98 },
      { day: 'Fri', percentage: 94 },
    ]
  },
  {
    class_id: '8-B',
    className: 'Class 8-B',
    totalStudents: 30,
    presentToday: 28,
    averagePercentage: 94.2,
    weeklyTrend: [
      { day: 'Mon', percentage: 93 },
      { day: 'Tue', percentage: 95 },
      { day: 'Wed', percentage: 94 },
      { day: 'Thu', percentage: 95 },
      { day: 'Fri', percentage: 94 },
    ]
  },
  {
    class_id: '8-C',
    className: 'Class 8-C',
    totalStudents: 31,
    presentToday: 29,
    averagePercentage: 95.0,
    weeklyTrend: [
      { day: 'Mon', percentage: 94 },
      { day: 'Tue', percentage: 96 },
      { day: 'Wed', percentage: 95 },
      { day: 'Thu', percentage: 95 },
      { day: 'Fri', percentage: 95 },
    ]
  },
  {
    class_id: '9-A',
    className: 'Class 9-A',
    totalStudents: 34,
    presentToday: 31,
    averagePercentage: 93.0,
    weeklyTrend: [
      { day: 'Mon', percentage: 92 },
      { day: 'Tue', percentage: 94 },
      { day: 'Wed', percentage: 93 },
      { day: 'Thu', percentage: 94 },
      { day: 'Fri', percentage: 92 },
    ]
  },
  {
    class_id: '9-B',
    className: 'Class 9-B',
    totalStudents: 33,
    presentToday: 31,
    averagePercentage: 95.0,
    weeklyTrend: [
      { day: 'Mon', percentage: 94 },
      { day: 'Tue', percentage: 96 },
      { day: 'Wed', percentage: 95 },
      { day: 'Thu', percentage: 96 },
      { day: 'Fri', percentage: 94 },
    ]
  }
];

// Initial Assignments
const initialAssignments: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Climate Change Essay',
    subject: 'Environmental Science',
    description: 'Write a 500-word essay explaining three ways students can help reduce climate change.',
    teacher_id: 't-1',
    teacher_name: 'Priya Mehta',
    class_id: '9-B',
    due_date: 'October 12, 2026',
    max_points: 50,
    priority: 'High',
    requirements: [
      '500 words minimum',
      'PDF or DOCX format',
      'Include at least 3 concrete real-world examples (e.g. food waste, green transit, renewable energy)'
    ],
    instructions: 'Reference peer-reviewed climate data and link observations to your personal EcoQuest challenges.',
    created_at: '2026-10-01T10:00:00Z'
  },
  {
    id: 'asg-2',
    title: 'Water Footprint Audit Worksheet',
    subject: 'Biology & Ecology',
    description: 'Calculate your household water consumption for one week using the WaterSense audit framework.',
    teacher_id: 't-1',
    teacher_name: 'Priya Mehta',
    class_id: '9-B',
    due_date: 'October 15, 2026',
    max_points: 40,
    priority: 'Medium',
    requirements: [
      'Complete the attached 7-day flow audit sheet',
      'Identify at least 2 water leaks or reduction opportunities'
    ],
    instructions: 'Submit your completed data table with accompanying photos or meter readings.',
    created_at: '2026-10-03T11:00:00Z'
  },
  {
    id: 'asg-3',
    title: 'Renewable Energy Lab Report',
    subject: 'Physics',
    description: 'Document the solar panel angle experiment conducted during school laboratory sessions.',
    teacher_id: 't-2',
    teacher_name: 'Vikram Joshi',
    class_id: '9-B',
    due_date: 'October 18, 2026',
    max_points: 60,
    priority: 'Medium',
    requirements: [
      'Graph voltage output vs incident angle',
      'Include conclusion on rooftop solar optimization'
    ],
    created_at: '2026-10-04T09:30:00Z'
  },
  {
    id: 'asg-4',
    title: 'Community Biodiversity Field Log',
    subject: 'Natural Sciences',
    description: 'Catalog 5 indigenous plant or pollinator species observed within campus grounds.',
    teacher_id: 't-1',
    teacher_name: 'Priya Mehta',
    class_id: '9-B',
    due_date: 'October 05, 2026',
    max_points: 50,
    priority: 'Low',
    requirements: [
      '5 species identified with scientific names',
      'Photographs included with date and habitat notes'
    ],
    created_at: '2026-09-28T08:00:00Z'
  }
];

// Initial Submissions
const initialAssignmentSubmissions: AssignmentSubmission[] = [
  {
    id: 'sub-asg-4',
    assignment_id: 'asg-4',
    student_id: 'u-4',
    student_name: 'Aarav Sharma',
    text_response: 'Identified 5 native flora including Neem, Peepal, and Marigold with visiting honeybee species around the school greenhouse.',
    file_name: 'Aarav_Sharma_Biodiversity_Log.pdf',
    file_url: '#',
    status: 'graded',
    submitted_at: 'Oct 04, 2026',
    score: 48,
    feedback: 'Exceptional field cataloging Aarav! Excellent identification of native pollinators and habitat descriptions.',
    graded_at: 'Oct 05, 2026'
  }
];

const EcoContext = createContext<EcoContextType | undefined>(undefined);

export const EcoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(api.getToken());
  });
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [weeklyActivity, setWeeklyActivity] = useState<ActivityDataPoint[]>(initialActivity);
  const [celebrationBadge, setCelebrationBadge] = useState<Badge | null>(null);
  const [activeRole, setActiveRole] = useState<'student' | 'teacher' | 'admin'>('student');

  // Restore session on mount if token exists
  useEffect(() => {
    const token = api.getToken();
    if (token) {
      setAuthLoading(true);
      api.auth.getMe()
        .then((authUser) => {
          if (authUser) {
            setIsAuthenticated(true);
            setActiveRole(authUser.role as 'student' | 'teacher' | 'admin');
            setUser(prev => ({
              ...prev,
              name: authUser.name,
              school: authUser.schoolName,
              grade: authUser.className || prev.grade,
              level: authUser.levelName || prev.level,
              levelNumber: authUser.levelNumber || prev.levelNumber,
              points: authUser.points || prev.points,
              streak: authUser.streak || prev.streak
            }));
          }
        })
        .catch(() => {
          api.removeToken();
          setIsAuthenticated(false);
        })
        .finally(() => {
          setAuthLoading(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    setAuthLoading(true);
    try {
      const res = await api.auth.login({ email: usernameOrEmail, password });
      if (res && res.user) {
        setIsAuthenticated(true);
        setActiveRole(res.user.role as 'student' | 'teacher' | 'admin');
        setUser(prev => ({
          ...prev,
          name: res.user.name,
          school: res.user.schoolName,
          grade: res.user.className || prev.grade,
          level: res.user.levelName || prev.level,
          levelNumber: res.user.levelNumber || prev.levelNumber,
          points: res.user.points || prev.points,
          streak: res.user.streak || prev.streak
        }));
        return { success: true, user: res.user };
      }
      return { success: false, error: 'Unexpected login response' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Invalid username or password' };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await api.auth.logout();
    } catch {
      // ignore
    } finally {
      api.removeToken();
      setIsAuthenticated(false);
      setAuthLoading(false);
    }
  };

  // Attendance states
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [classSummaries, setClassSummaries] = useState<ClassAttendanceSummary[]>(initialClassSummaries);

  // Assignment states
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState<AssignmentSubmission[]>(initialAssignmentSubmissions);

  const activeChallenge = challenges.find(c => c.id === 'plastic-free-week') || challenges[0];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#16A34A', '#84CC16', '#166534', '#F59E0B']
      });
    } catch {
      // fallback
    }
  };

  const continueCurrentChallenge = () => {
    setChallenges(prev => prev.map(c => {
      if (c.id === 'plastic-free-week') {
        const nextProgress = Math.min(c.total, c.progress + 1);
        const isDone = nextProgress >= c.total;
        return {
          ...c,
          progress: nextProgress,
          status: isDone ? 'completed' : 'active'
        };
      }
      return c;
    }));

    setUser(prev => {
      const addedPoints = 25;
      const newPoints = prev.points + addedPoints;
      const newCo2 = Number((prev.co2AvoidedKg + 0.45).toFixed(1));
      const newPlastic = prev.plasticAvoided + 2;
      return {
        ...prev,
        points: newPoints,
        xpCurrent: newPoints,
        co2AvoidedKg: newCo2,
        plasticAvoided: newPlastic
      };
    });

    setBadges(prev => prev.map(b => {
      if (b.id === 'plastic-warrior') {
        return { ...b, progress: 44 };
      }
      return b;
    }));

    triggerConfetti();
  };

  const submitChallengeProof = async (
    challengeId: string, 
    proofType: 'photo' | 'log', 
    notes: string, 
    photoUrl?: string
  ) => {
    const ch = challenges.find(c => c.id === challengeId);
    if (!ch) return { success: false, message: 'Challenge not found', points: 0 };

    const earnedPoints = Math.round(ch.points / (ch.total || 1));

    // Call Backend API
    try {
      await api.challenges.complete(challengeId, {
        challengeId,
        proofType,
        notes,
        photoUrl
      });
    } catch (apiErr: any) {
      if (apiErr.message && apiErr.message.includes('already checked in today')) {
        return {
          success: false,
          message: apiErr.message,
          points: 0
        };
      }
    }

    const newSubmission: Submission = {
      id: `sub-${Date.now()}`,
      studentName: user.name,
      challengeId,
      challengeTitle: `${ch.title} Check-in`,
      submittedAt: 'Just now',
      proofType,
      notes,
      photoUrl: photoUrl || (proofType === 'photo' ? 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80' : undefined),
      status: 'verified',
      points: earnedPoints,
      aiVerification: {
        result: 'pass',
        confidence: 0.97,
        detectedObjects: ['verified environmental habit action', 'school eco-activity']
      }
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        const nextProgress = Math.min(c.total, c.progress + 1);
        return {
          ...c,
          progress: nextProgress,
          status: nextProgress >= c.total ? 'completed' : 'active'
        };
      }
      return c;
    }));

    setUser(prev => {
      const newPts = prev.points + earnedPoints;
      const newCo2 = Number((prev.co2AvoidedKg + (ch.co2AvoidedKg / ch.total)).toFixed(1));
      const newWater = Math.round(prev.waterSavedL + (ch.waterSavedL / ch.total));
      const newWaste = Number((prev.wasteDivertedKg + (ch.wasteDivertedKg / ch.total)).toFixed(1));
      const newPlastic = Math.round(prev.plasticAvoided + (ch.plasticItemsAvoided / ch.total));

      return {
        ...prev,
        points: newPts,
        xpCurrent: newPts,
        co2AvoidedKg: newCo2,
        waterSavedL: newWater,
        wasteDivertedKg: newWaste,
        plasticAvoided: newPlastic,
      };
    });

    triggerConfetti();

    return {
      success: true,
      message: `Verified! Earned +${earnedPoints} Eco Points!`,
      points: earnedPoints
    };
  };

  const verifySubmission = (submissionId: string, decision: 'verified' | 'rejected') => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return { ...s, status: decision };
      }
      return s;
    }));
  };

  // ATTENDANCE METHODS
  const updateStudentAttendance = (studentId: string, classId: string, date: string, status: AttendanceStatus) => {
    setAttendanceRecords(prev => {
      const existingIdx = prev.findIndex(r => r.student_id === studentId && r.date === date);
      const studentName = leaderboard.find(l => l.id === studentId)?.name || (studentId === 'u-4' ? 'Aarav Sharma' : 'Student');
      
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          status,
          marked_by: 'Priya Mehta'
        };
        return updated;
      } else {
        const newRecord: AttendanceRecord = {
          id: `att-${Date.now()}-${studentId}`,
          student_id: studentId,
          student_name: studentName,
          class_id: classId,
          date,
          status,
          marked_by: 'Priya Mehta',
          created_at: new Date().toISOString()
        };
        return [...prev, newRecord];
      }
    });
  };

  const markAllClassPresent = (classId: string, date: string) => {
    const classStudents = leaderboard.filter(l => l.className === 'Class ' + classId || classId === '9-B');
    
    setAttendanceRecords(prev => {
      const recordsMap = new Map(prev.map(r => [`${r.student_id}-${r.date}`, r]));
      
      classStudents.forEach(st => {
        const key = `${st.id}-${date}`;
        recordsMap.set(key, {
          id: recordsMap.get(key)?.id || `att-${Date.now()}-${st.id}`,
          student_id: st.id,
          student_name: st.name,
          class_id: classId,
          date,
          status: 'present',
          marked_by: 'Priya Mehta',
          created_at: new Date().toISOString()
        });
      });

      return Array.from(recordsMap.values());
    });
  };

  const saveAttendanceForDate = (classId: string, date: string) => {
    // Recalculate summary percentage
    const records = attendanceRecords.filter(r => r.class_id === classId && r.date === date);
    const presentCount = records.filter(r => r.status === 'present').length;
    const totalCount = records.length || 33;
    const percentage = Math.round((presentCount / totalCount) * 100);

    setClassSummaries(prev => prev.map(s => {
      if (s.class_id === classId) {
        return {
          ...s,
          presentToday: presentCount,
          averagePercentage: Number(((s.averagePercentage * 4 + percentage) / 5).toFixed(1))
        };
      }
      return s;
    }));

    return true;
  };

  // ASSIGNMENT METHODS
  const createAssignment = (newAssignment: Omit<Assignment, 'id' | 'created_at'>) => {
    const assignment: Assignment = {
      ...newAssignment,
      id: `asg-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setAssignments(prev => [assignment, ...prev]);
  };

  const submitAssignment = (assignmentId: string, textResponse: string, fileName?: string) => {
    const existingSubmission = assignmentSubmissions.find(s => s.assignment_id === assignmentId && s.student_id === user.name);

    if (existingSubmission) {
      setAssignmentSubmissions(prev => prev.map(s => {
        if (s.id === existingSubmission.id) {
          return {
            ...s,
            text_response: textResponse,
            file_name: fileName || s.file_name,
            status: 'submitted',
            submitted_at: 'Just now'
          };
        }
        return s;
      }));
    } else {
      const newSub: AssignmentSubmission = {
        id: `sub-asg-${Date.now()}`,
        assignment_id: assignmentId,
        student_id: 'u-4',
        student_name: user.name,
        text_response: textResponse,
        file_name: fileName || 'Aarav_Submission.pdf',
        file_url: '#',
        status: 'submitted',
        submitted_at: 'Just now'
      };
      setAssignmentSubmissions(prev => [newSub, ...prev]);
    }

    // Award +20 XP on-time bonus!
    setUser(prev => ({
      ...prev,
      xpCurrent: prev.xpCurrent + 20,
      points: prev.points + 20
    }));

    triggerConfetti();
  };

  const gradeAssignmentSubmission = (submissionId: string, score: number, feedback: string) => {
    setAssignmentSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          score,
          feedback,
          status: 'graded',
          graded_at: 'Just now'
        };
      }
      return s;
    }));
  };

  return (
    <EcoContext.Provider
      value={{
        isAuthenticated,
        authLoading,
        login,
        logout,
        user,
        challenges,
        badges,
        leaderboard,
        submissions,
        weeklyActivity,
        activeChallenge,
        submitChallengeProof,
        continueCurrentChallenge,
        celebrationBadge,
        setCelebrationBadge,
        activeRole,
        setActiveRole,
        verifySubmission,
        // Attendance
        attendanceRecords,
        classSummaries,
        updateStudentAttendance,
        markAllClassPresent,
        saveAttendanceForDate,
        // Assignments
        assignments,
        assignmentSubmissions,
        createAssignment,
        submitAssignment,
        gradeAssignmentSubmission
      }}
    >
      {children}
    </EcoContext.Provider>
  );
};

export const useEco = () => {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error('useEco must be used within an EcoProvider');
  }
  return context;
};
