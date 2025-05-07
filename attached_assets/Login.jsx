
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(email, password);
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: error.response?.data?.msg || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section with image */}
      <div className="hidden lg:flex lg:w-1/2 bg-hr-purple flex-col justify-center items-center p-12 relative">
        <img 
          src="/lovable-uploads/f62b4c36-a2e2-4e10-b9f2-520a9647da69.png" 
          alt="HR Dashboard" 
          className="mb-8 max-w-md"
        />
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Streamline Your HR Tasks</h2>
          <p className="text-lg">
            Manage candidates, employees, attendance, and leaves all in one place with our comprehensive HR dashboard.
          </p>
        </div>
        <div className="flex mt-8">
          <div className="w-2 h-2 bg-white rounded-full mx-1 opacity-100"></div>
          <div className="w-2 h-2 bg-white rounded-full mx-1 opacity-50"></div>
          <div className="w-2 h-2 bg-white rounded-full mx-1 opacity-50"></div>
        </div>
      </div>

      {/* Right section with login form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Welcome to Dashboard</h1>
            <p className="text-gray-600">Login to access your HR dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-hr-purple`}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-hr-purple pr-10`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-hr-purple hover:bg-purple-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hr-purple"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>
              Don't have an account? <Link to="/register" className="text-hr-purple hover:underline">Register</Link>
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>For demo purposes, use:</p>
            <p>Email: hr@example.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
