export type UserRole = 'student' | 'teacher' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolId: string;
  schoolName: string;
  className?: string;
  avatarUrl?: string;
  points: number;
  xp: number;
  streak: number;
  levelName: string;
  levelNumber: number;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
  role?: UserRole;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  schoolName?: string;
  className?: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  category: 'Plastic' | 'Transport' | 'Water' | 'Energy' | 'Waste' | 'Biodiversity';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  points: number;
  totalDays: number;
  progressDays?: number;
  description: string;
  instructions: string[];
  co2AvoidedKg: number;
  waterSavedL: number;
  wasteDivertedKg: number;
  plasticAvoidedItems: number;
  requiresProof: 'photo' | 'log' | 'both';
  icon: string;
  status?: 'active' | 'completed' | 'available';
}

export interface ChallengeCompletionPayload {
  challengeId: string;
  dayNumber?: number;
  proofType: 'photo' | 'log';
  notes: string;
  photoUrl?: string;
}

export interface ChallengeCompletionResult {
  completionId: string;
  challengeId: string;
  pointsAwarded: number;
  newTotalPoints: number;
  newStreak: number;
  isVerified: boolean;
  unlockedBadge?: {
    id: string;
    name: string;
    tier: string;
  };
  impactGenerated: {
    co2AvoidedKg: number;
    waterSavedL: number;
    wasteDivertedKg: number;
    plasticAvoidedItems: number;
    isEstimated: boolean;
  };
}

export interface EnvironmentalImpactSummary {
  userId: string;
  studentName: string;
  schoolName: string;
  isEstimated: boolean;
  standardsNote: string;
  co2AvoidedKg: number;
  waterSavedL: number;
  wasteDivertedKg: number;
  plasticAvoidedItems: number;
  greenCommutesCount: number;
  treesPlantedEquivalent: number;
  carKmEquivalent: number;
  breakdownByCategory: {
    category: string;
    percentage: number;
    co2Kg: number;
  }[];
  historyTrend: {
    period: string;
    co2Kg: number;
    waterL: number;
    wasteKg: number;
  }[];
}

export interface SchoolAnalyticsOverview {
  schoolId: string;
  schoolName: string;
  totalParticipatingStudents: number;
  totalCompletedChallenges: number;
  totalPointsAccumulated: number;
  attendanceRate: number;
  assignmentSubmissionRate: number;
  aggregateEnvironmentalImpact: {
    totalCo2AvoidedKg: number;
    totalWaterSavedL: number;
    totalWasteDivertedKg: number;
    totalPlasticsAvoided: number;
    isEstimated: boolean;
  };
  leaderboardTopStudents: {
    rank: number;
    id: string;
    name: string;
    className: string;
    points: number;
    co2SavedKg: number;
  }[];
  classComparison: {
    className: string;
    studentsCount: number;
    points: number;
    attendanceRate: number;
    challengesCompleted: number;
  }[];
  weeklyActivityTrends: {
    day: string;
    points: number;
    challengesCompleted: number;
    co2Avoided: number;
  }[];
}
