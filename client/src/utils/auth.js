// Authentication utility for the HR Dashboard

// The base URL for API requests
const API_BASE_URL = '/api';

// Get the current logged in user
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('hr_user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem('hr_user', JSON.stringify(data.user));
      return data.user;
    } else {
      console.error('Login failed:', data.message);
      throw new Error(data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register new user
export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        username: email, // Using email as username
        password,
        role: 'user' // Default role
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return true;
    } else {
      console.error('Registration failed:', data.message);
      throw new Error(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    // Call the logout API (optional)
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always remove from localStorage
    localStorage.removeItem('hr_user');
  }
};