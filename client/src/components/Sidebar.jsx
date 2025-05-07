import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { LogOut, Search, Home, Users, Calendar, FileText, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCurrentUser, logout as authLogout } from '../utils/auth';

const Sidebar = () => {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get user from auth utility
    setUser(getCurrentUser());
  }, []);
  
  const handleLogout = () => {
    authLogout();
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.'
    });
    setLocation('/login');
  };

  const isActive = (path) => {
    return location === path;
  };

  return (
    <div className="hr-sidebar">
      <div className="p-4">
        <Link href="/dashboard" className="flex items-center">
          <div className="w-8 h-8 bg-hr-purple flex items-center justify-center text-white font-bold rounded">
            H
          </div>
          <span className="ml-2 text-xl font-bold text-hr-purple">HR Pro</span>
        </Link>
      </div>

      <div className="w-full px-4 mt-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search" 
            className="hr-input pl-10"
          />
          <Search 
            className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" 
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="hr-sidebar-section">Recruitment</div>
        <Link 
          href="/candidates" 
          className={`hr-sidebar-item ${isActive('/candidates') ? 'active' : ''}`}
        >
          <User className="w-5 h-5 mr-2" />
          <span>Candidates</span>
        </Link>

        <div className="hr-sidebar-section">Organization</div>
        <Link 
          href="/dashboard" 
          className={`hr-sidebar-item ${isActive('/dashboard') || isActive('/') ? 'active' : ''}`}
        >
          <Home className="w-5 h-5 mr-2" />
          <span>Dashboard</span>
        </Link>
        <Link 
          href="/employees" 
          className={`hr-sidebar-item ${isActive('/employees') ? 'active' : ''}`}
        >
          <Users className="w-5 h-5 mr-2" />
          <span>Employees</span>
        </Link>
        <Link 
          href="/attendance" 
          className={`hr-sidebar-item ${isActive('/attendance') ? 'active' : ''}`}
        >
          <Calendar className="w-5 h-5 mr-2" />
          <span>Attendance</span>
        </Link>
        <Link 
          href="/leaves" 
          className={`hr-sidebar-item ${isActive('/leaves') ? 'active' : ''}`}
        >
          <FileText className="w-5 h-5 mr-2" />
          <span>Leaves</span>
        </Link>

        <div className="hr-sidebar-section">Others</div>
        <div 
          className="hr-sidebar-item cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
