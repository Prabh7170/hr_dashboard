// Simple authentication utility for the HR Dashboard

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
export const login = (email, password) => {
  // For demo, we'll just check if the credentials match our test account
  if (email === 'hr@example.com' && password === 'password') {
    const user = {
      id: 1,
      name: 'Admin',
      email: 'hr@example.com',
      role: 'admin'
    };
    
    localStorage.setItem('hr_user', JSON.stringify(user));
    return user;
  }
  
  return null;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('hr_user');
};