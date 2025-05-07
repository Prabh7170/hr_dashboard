import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts';

const Layout = ({ children, title }) => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[250px] md:ml-[250px] sm:ml-[70px]">
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex items-center">
            <div className="relative mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">3</div>
            </div>
            <div className="relative mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">2</div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-hr-purple text-white flex items-center justify-center">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="ml-2 hidden md:block">{user?.name || 'Admin'}</span>
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
