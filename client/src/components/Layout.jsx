import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Mail, Bell, ChevronDown } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';

const Layout = ({ children, title }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get user from auth utility
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 pl-[250px] md:pl-[250px] sm:pl-[70px] transition-all duration-300">
        <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center">
            <div className="relative mr-5">
              <Mail className="h-6 w-6 text-gray-500 hover:text-hr-purple transition-colors duration-200" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">3</div>
            </div>
            <div className="relative mr-6">
              <Bell className="h-6 w-6 text-gray-500 hover:text-hr-purple transition-colors duration-200" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">2</div>
            </div>
            <div className="flex items-center border-l pl-5 ml-2">
              <div className="w-10 h-10 rounded-full bg-hr-purple text-white flex items-center justify-center font-medium">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="ml-3 hidden md:block">
                <div className="font-medium text-gray-800">{user?.name || 'Admin'}</div>
                <div className="text-xs text-gray-500">{user?.role || 'Administrator'}</div>
              </div>
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500 hidden md:block" />
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
