import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { useEco } from './context/EcoContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';

// Layouts
import { StudentLayout } from './components/layout/StudentLayout';
import { TeacherLayout } from './components/layout/TeacherLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { PublicChallengesPage } from './pages/public/PublicChallengesPage';
import { ForSchoolsPage } from './pages/public/ForSchoolsPage';
import { AboutPage } from './pages/public/AboutPage';

// Student pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentAssignments } from './pages/student/StudentAssignments';
import { StudentAssignmentDetail } from './pages/student/StudentAssignmentDetail';
import { StudentChallenges } from './pages/student/StudentChallenges';
import { StudentLeaderboard } from './pages/student/StudentLeaderboard';
import { StudentAchievements } from './pages/student/StudentAchievements';
import { StudentImpact } from './pages/student/StudentImpact';
import { StudentLearning } from './pages/student/StudentLearning';
import { StudentProfile } from './pages/student/StudentProfile';

// Teacher pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherAttendance } from './pages/teacher/TeacherAttendance';
import { TeacherAssignments } from './pages/teacher/TeacherAssignments';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAttendance } from './pages/admin/AdminAttendance';
import { AdminAssignments } from './pages/admin/AdminAssignments';

// Layout wrapper for public pages (includes Navbar and Footer)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-eco-bg text-eco-text">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  const { isAuthenticated, activeRole } = useEco();

  return (
    <Routes>
      {/* Root Route: Shows Login first when unauthenticated; redirects to dashboard when authenticated */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={`/${activeRole}/dashboard`} replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Dedicated Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Public Pages */}
      <Route
        path="/landing"
        element={
          <PublicLayout>
            <LandingPage />
          </PublicLayout>
        }
      />
      <Route
        path="/how-it-works"
        element={
          <PublicLayout>
            <HowItWorksPage />
          </PublicLayout>
        }
      />
      <Route
        path="/challenges"
        element={
          <PublicLayout>
            <PublicChallengesPage />
          </PublicLayout>
        }
      />
      <Route
        path="/for-schools"
        element={
          <PublicLayout>
            <ForSchoolsPage />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <AboutPage />
          </PublicLayout>
        }
      />

      {/* Student App Routes (Protected) */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="assignments/:id" element={<StudentAssignmentDetail />} />
        <Route path="challenges" element={<StudentChallenges />} />
        <Route path="leaderboard" element={<StudentLeaderboard />} />
        <Route path="achievements" element={<StudentAchievements />} />
        <Route path="impact" element={<StudentImpact />} />
        <Route path="learning" element={<StudentLearning />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Teacher Portal Routes (Protected) */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="verifications" element={<TeacherDashboard />} />
      </Route>

      {/* Admin Portal Routes (Protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="assignments" element={<AdminAssignments />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
