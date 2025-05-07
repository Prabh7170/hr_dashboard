import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LogOut, 
  Search, 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  User, 
  Settings, 
  BarChart2,
  Menu,
  AlertCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCurrentUser, logout as authLogout } from '../utils/auth';

const Sidebar = () => {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  
  useEffect(() => {
    // Get user from auth utility
    setUser(getCurrentUser());
  }, []);
  
  const handleLogout = async () => {
    try {
      await authLogout();
      setUser(null);
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.'
      });
      setLocation('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout Error',
        description: 'There was an issue during logout. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const isActive = (path) => {
    return location === path;
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-white shadow-md z-20 transition-all duration-300 ${collapsed ? 'w-[70px]' : 'w-[250px]'}`}>
      <div className="p-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center">
          <div className="w-10 h-10 bg-hr-purple flex items-center justify-center text-white font-bold rounded">
            H
          </div>
          {!collapsed && <span className="ml-2 text-xl font-bold text-hr-purple">HR Pro</span>}
        </Link>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-gray-500 hover:text-hr-purple transition-colors duration-200"
        >
          <Menu size={20} />
        </button>
      </div>

      {!collapsed && (
        <div className="w-full px-4 mt-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hr-purple focus:border-transparent"
            />
            <Search 
              className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" 
            />
          </div>
        </div>
      )}

      <div className="mt-6 overflow-y-auto h-[calc(100vh-120px)]">
        <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider ${collapsed ? 'px-0 text-center' : 'px-6'} mb-2`}>
          {!collapsed && 'Recruitment'}
        </div>
        <Link 
          href="/candidates" 
          className={`flex items-center py-3 ${collapsed ? 'px-0 justify-center' : 'px-6'} ${
            isActive('/candidates') 
              ? 'text-hr-purple bg-purple-50 border-r-4 border-hr-purple' 
              : 'text-gray-600 hover:text-hr-purple hover:bg-purple-50'
          }`}
        >
          <User className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
          {!collapsed && <span>Candidates</span>}
        </Link>

        <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider ${collapsed ? 'px-0 text-center' : 'px-6'} mb-2 mt-6`}>
          {!collapsed && 'Organization'}
        </div>
        <Link 
          href="/dashboard" 
          className={`flex items-center py-3 ${collapsed ? 'px-0 justify-center' : 'px-6'} ${
            isActive('/dashboard') || isActive('/') 
              ? 'text-hr-purple bg-purple-50 border-r-4 border-hr-purple' 
              : 'text-gray-600 hover:text-hr-purple hover:bg-purple-50'
          }`}
        >
          <Home className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link 
          href="/employees" 
          className={`flex items-center py-3 ${collapsed ? 'px-0 justify-center' : 'px-6'} ${
            isActive('/employees') 
              ? 'text-hr-purple bg-purple-50 border-r-4 border-hr-purple' 
              : 'text-gray-600 hover:text-hr-purple hover:bg-purple-50'
          }`}
        >
          <Users className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
          {!collapsed && <span>Employees</span>}
        </Link>
        <Link 
          href="/attendance" 
          className={`flex items-center py-3 ${collapsed ? 'px-0 justify-center' : 'px-6'} ${
            isActive('/attendance') 
              ? 'text-hr-purple bg-purple-50 border-r-4 border-hr-purple' 
              : 'text-gray-600 hover:text-hr-purple hover:bg-purple-50'
          }`}
        >
          <Calendar className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
          {!collapsed && <span>Attendance</span>}
        </Link>
        <Link 
          href="/leaves" 
          className={`flex items-center py-3 ${collapsed ? 'px-0 justify-center' : 'px-6'} ${
            isActive('/leaves') 
              ? 'text-hr-purple bg-purple-50 border-r-4 border-hr-purple' 
              : 'text-gray-600 hover:text-hr-purple hover:bg-purple-50'
          }`}
        >
          <FileText className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
          {!collapsed && <span>Leaves</span>}
        </Link>

        <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider ${collapsed ? 'px-0 text-center' : 'px-6'} mb-2 mt-6`}>
          {!collapsed && 'Others'}
        </div>
        <Link 
          href="/reports" 
          className={`flex items-center py-3 ${collapsed ? 'px-0 justify-center' : 'px-6'} ${
            isActive('/reports') 
              ? 'text-hr-purple bg-purple-50 border-r-4 border-hr-purple' 
              : 'text-gray-600 hover:text-hr-purple hover:bg-purple-50'
          }`}
        >
          <BarChart2 className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
          {!collapsed && <span>Reports</span>}
        </Link>
        <Link 
          href="/settings" 
          className={`flex items-center py-3 ${collapsed ? 'px-0 justify-center' : 'px-6'} ${
            isActive('/settings') 
              ? 'text-hr-purple bg-purple-50 border-r-4 border-hr-purple' 
              : 'text-gray-600 hover:text-hr-purple hover:bg-purple-50'
          }`}
        >
          <Settings className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
          {!collapsed && <span>Settings</span>}
        </Link>
        <div 
          className={`flex items-center py-3 ${collapsed ? 'px-0 justify-center' : 'px-6'} text-gray-600 hover:text-hr-purple hover:bg-purple-50 cursor-pointer`}
          onClick={handleLogout}
        >
          <LogOut className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
      
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 bg-purple-50 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
              <AlertCircle size={16} />
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Help Center</div>
              <div className="text-xs text-gray-500">Access our help resources</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
