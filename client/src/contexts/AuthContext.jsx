import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useLocation();

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check local storage for user info (in a real app, this would be a server call)
        const storedUser = localStorage.getItem('hr_user');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, accept these credentials
      if (email === 'hr@example.com' && password === 'password') {
        const user = {
          id: 1,
          name: 'Admin',
          email: 'hr@example.com',
          role: 'admin'
        };
        
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('hr_user', JSON.stringify(user));
        
        toast({
          title: 'Login Successful',
          description: 'Welcome to the HR Dashboard!'
        });
        
        setLocation('/dashboard');
        return true;
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive'
        });
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Login Failed',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hr_user');
    setLocation('/login');
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
