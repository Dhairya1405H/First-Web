export type ChallengeCategory = 'Plastic' | 'Water' | 'Energy' | 'Transport' | 'Waste' | 'Biodiversity';

export type ChallengeDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Challenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  duration: string;
  points: number;
  progress: number;
  total: number;
  description: string;
  instructions: string[];
  status: 'active' | 'completed' | 'available';
  co2AvoidedKg: number;
  waterSavedL: number;
  wasteDivertedKg: number;
  plasticItemsAvoided: number;
  greenCommutesCount?: number;
  requiresProof: 'photo' | 'log' | 'both';
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Emerald';
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  category: string;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  challengesCompleted: number;
  co2SavedKg: number;
  className: string;
  isCurrentUser?: boolean;
}

export interface ActivityDataPoint {
  day: string;
  points: number;
  co2: number;
  challenges: number;
}

export interface Submission {
  id: string;
  studentName: string;
  challengeId: string;
  challengeTitle: string;
  submittedAt: string;
  proofType: 'photo' | 'log';
  notes: string;
  photoUrl?: string;
  status: 'verified' | 'pending' | 'rejected';
  points: number;
  aiVerification?: {
    result: 'pass' | 'review' | 'fail';
    confidence: number;
    detectedObjects: string[];
  };
}

export interface UserProfile {
  name: string;
  school: string;
  grade: string;
  level: string;
  levelNumber: number;
  xpCurrent: number;
  xpNextLevel: number;
  points: number;
  streak: number;
  challengesCompleted: number;
  rank: number;
  co2AvoidedKg: number;
  waterSavedL: number;
  wasteDivertedKg: number;
  plasticAvoided: number;
  greenCommutes: number;
}

// =================== ATTENDANCE MODELS ===================
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name: string;
  class_id: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  marked_by: string;
  created_at: string;
}

export interface DayAttendance {
  dayNumber: number;
  dateString: string;
  status: AttendanceStatus | 'holiday' | 'weekend' | 'future';
}

export interface ClassAttendanceSummary {
  class_id: string;
  className: string;
  totalStudents: number;
  presentToday: number;
  averagePercentage: number;
  weeklyTrend: { day: string; percentage: number }[];
}

// =================== ASSIGNMENT MODELS ===================
export type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'overdue';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  teacher_id: string;
  teacher_name: string;
  class_id: string;
  due_date: string;
  max_points: number;
  priority: 'High' | 'Medium' | 'Low';
  requirements: string[];
  attachments?: string[];
  instructions?: string;
  created_at: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  student_name: string;
  text_response: string;
  file_url?: string;
  file_name?: string;
  status: AssignmentStatus;
  submitted_at: string;
  score?: number;
  feedback?: string;
  graded_at?: string;
}
