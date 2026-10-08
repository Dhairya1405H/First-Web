import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X, ArrowLeft, Building } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { useEco } from '../../context/EcoContext';

export const AdminLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { activeRole, setActiveRole } = useEco();

  return (
    <div className="min-h-screen bg-eco-bg flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-eco-text/50 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileSidebarOpen(false)} 
          />
          <div className="relative w-72 max-w-xs bg-white h-full z-10 shadow-2xl flex flex-col">
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-eco-muted hover:text-eco-dark hover:bg-eco-subtle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-eco-border px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl text-eco-muted hover:text-eco-dark hover:bg-eco-subtle md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-eco-muted">
                Executive Leadership
              </div>
              <div className="text-sm font-extrabold text-eco-dark flex items-center gap-1.5">
                <span>Greenfield International School • Administration</span>
                <span className="text-eco-sky">🏛️</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Demo switcher */}
            <div className="flex items-center bg-eco-subtle rounded-lg p-0.5 border border-eco-border text-[11px] font-semibold">
              <span className="px-2 text-eco-muted hidden sm:inline">Role:</span>
              <button
                onClick={() => setActiveRole('student')}
                className={`px-2 py-0.5 rounded ${activeRole === 'student' ? 'bg-eco-primary text-white font-bold' : 'text-eco-muted hover:text-eco-dark'}`}
              >
                Student
              </button>
              <button
                onClick={() => setActiveRole('teacher')}
                className={`px-2 py-0.5 rounded ${activeRole === 'teacher' ? 'bg-eco-dark text-white font-bold' : 'text-eco-muted hover:text-eco-dark'}`}
              >
                Teacher
              </button>
              <button
                onClick={() => setActiveRole('admin')}
                className={`px-2 py-0.5 rounded ${activeRole === 'admin' ? 'bg-eco-sky text-white font-bold' : 'text-eco-muted hover:text-eco-dark'}`}
              >
                Admin
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
