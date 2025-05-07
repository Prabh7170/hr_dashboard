import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// Import validation schemas if needed
import { userSchema, employeeSchema, candidateSchema, leaveSchema, attendanceSchema } from "../shared/mongo-schemas";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for user registration
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, password, name, role } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User with this email already exists' 
        });
      }
      
      // Create the new user
      const newUser = await storage.createUser({
        username,
        password, // In a production app, this should be hashed
        name: name || username.split('@')[0], // Default name is email username
        role: role || 'user' // Default role is user
      });
      
      return res.status(201).json({ 
        success: true, 
        message: 'User registered successfully',
        userId: newUser.id
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error during registration' 
      });
    }
  });

  // API route for login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // First check if it's the hardcoded user for backward compatibility
      if (email === 'hr@example.com' && password === 'password') {
        const user = {
          id: 1,
          name: 'Admin',
          email: 'hr@example.com',
          role: 'admin'
        };
        
        return res.status(200).json({ success: true, user });
      }
      
      // Otherwise check in the database (assuming email is stored as username)
      const dbUser = await storage.getUserByUsername(email);
      
      if (dbUser && dbUser.password === password) {
        // In a real app, passwords would be hashed
        const user = {
          id: dbUser.id,
          name: dbUser.name || 'User',
          email: dbUser.username, // Using username as email
          role: dbUser.role || 'user'
        };
        
        return res.status(200).json({ success: true, user });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ success: false, message: 'Server error during login' });
    }
  });
  
  // API route for logout
  app.post('/api/auth/logout', (req, res) => {
    return res.status(200).json({ success: true });
  });
  
  // API routes for employees
  app.get('/api/employees', async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch employees' });
    }
  });
  
  app.post('/api/employees', async (req, res) => {
    try {
      const employee = await storage.createEmployee(req.body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create employee' });
    }
  });
  
  app.put('/api/employees/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const employee = await storage.updateEmployee(id, req.body);
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update employee' });
    }
  });
  
  app.delete('/api/employees/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEmployee(id);
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete employee' });
    }
  });
  
  // API routes for candidates
  app.get('/api/candidates', async (req, res) => {
    try {
      const candidates = await storage.getAllCandidates();
      res.status(200).json(candidates);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch candidates' });
    }
  });
  
  app.post('/api/candidates', async (req, res) => {
    try {
      const candidate = await storage.createCandidate(req.body);
      res.status(201).json(candidate);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create candidate' });
    }
  });
  
  // API routes for leaves
  app.get('/api/leaves', async (req, res) => {
    try {
      const leaves = await storage.getAllLeaves();
      res.status(200).json(leaves);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch leaves' });
    }
  });
  
  app.post('/api/leaves', async (req, res) => {
    try {
      const leave = await storage.createLeave(req.body);
      res.status(201).json(leave);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create leave' });
    }
  });
  
  app.put('/api/leaves/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const leave = await storage.updateLeave(id, req.body);
      res.status(200).json(leave);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update leave' });
    }
  });
  
  // API routes for attendance
  app.get('/api/attendance', async (req, res) => {
    try {
      const attendance = await storage.getAllAttendance();
      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch attendance records' });
    }
  });
  
  app.post('/api/attendance', async (req, res) => {
    try {
      const attendance = await storage.createAttendance(req.body);
      res.status(201).json(attendance);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create attendance record' });
    }
  });
  
  app.put('/api/attendance/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const attendance = await storage.updateAttendance(id, req.body);
      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update attendance record' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
