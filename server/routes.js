const { createServer } = require('http');
const express = require('express');
const passport = require('passport');
const { storage } = require('./storage');

async function registerRoutes(app) {
  const httpServer = createServer(app);
  
  // Auth routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, password, name, role } = req.body;
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists' });
      }
      
      const newUser = await storage.createUser({
        username,
        password,
        name: name || 'User',
        role: role || 'employee'
      });
      
      // Login the user after registration
      req.login(newUser, (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Login after registration failed' });
        }
        return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ success: false, message: 'Error registering user' });
    }
  });
  
  app.post('/api/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ success: true, user });
      });
    })(req, res, next);
  });
  
  app.post('/api/auth/logout', (req, res) => {
    req.logout(function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error logging out' });
      }
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  });
  
  app.get('/api/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(200).json({ success: true, user: req.user });
    }
    res.status(401).json({ success: false, message: 'Not authenticated' });
  });
  
  // Employee routes
  app.get('/api/employees', async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      res.status(200).json({ success: true, employees });
    } catch (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ success: false, message: 'Error fetching employees' });
    }
  });
  
  app.get('/api/employees/:id', async (req, res) => {
    try {
      const employee = await storage.getEmployee(req.params.id);
      if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }
      res.status(200).json({ success: true, employee });
    } catch (err) {
      console.error('Error fetching employee:', err);
      res.status(500).json({ success: false, message: 'Error fetching employee' });
    }
  });
  
  app.post('/api/employees', async (req, res) => {
    try {
      const employee = await storage.createEmployee(req.body);
      res.status(201).json({ success: true, message: 'Employee created successfully', employee });
    } catch (err) {
      console.error('Error creating employee:', err);
      res.status(500).json({ success: false, message: 'Error creating employee' });
    }
  });
  
  app.put('/api/employees/:id', async (req, res) => {
    try {
      const employee = await storage.updateEmployee(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Employee updated successfully', employee });
    } catch (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ success: false, message: 'Error updating employee' });
    }
  });
  
  app.delete('/api/employees/:id', async (req, res) => {
    try {
      await storage.deleteEmployee(req.params.id);
      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ success: false, message: 'Error deleting employee' });
    }
  });
  
  // Candidate routes
  app.get('/api/candidates', async (req, res) => {
    try {
      const candidates = await storage.getAllCandidates();
      res.status(200).json({ success: true, candidates });
    } catch (err) {
      console.error('Error fetching candidates:', err);
      res.status(500).json({ success: false, message: 'Error fetching candidates' });
    }
  });
  
  app.get('/api/candidates/:id', async (req, res) => {
    try {
      const candidate = await storage.getCandidate(req.params.id);
      if (!candidate) {
        return res.status(404).json({ success: false, message: 'Candidate not found' });
      }
      res.status(200).json({ success: true, candidate });
    } catch (err) {
      console.error('Error fetching candidate:', err);
      res.status(500).json({ success: false, message: 'Error fetching candidate' });
    }
  });
  
  app.post('/api/candidates', async (req, res) => {
    try {
      const candidate = await storage.createCandidate(req.body);
      res.status(201).json({ success: true, message: 'Candidate created successfully', candidate });
    } catch (err) {
      console.error('Error creating candidate:', err);
      res.status(500).json({ success: false, message: 'Error creating candidate' });
    }
  });
  
  app.put('/api/candidates/:id', async (req, res) => {
    try {
      const candidate = await storage.updateCandidate(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Candidate updated successfully', candidate });
    } catch (err) {
      console.error('Error updating candidate:', err);
      res.status(500).json({ success: false, message: 'Error updating candidate' });
    }
  });
  
  app.delete('/api/candidates/:id', async (req, res) => {
    try {
      await storage.deleteCandidate(req.params.id);
      res.status(200).json({ success: true, message: 'Candidate deleted successfully' });
    } catch (err) {
      console.error('Error deleting candidate:', err);
      res.status(500).json({ success: false, message: 'Error deleting candidate' });
    }
  });
  
  // Leave routes
  app.get('/api/leaves', async (req, res) => {
    try {
      const leaves = await storage.getAllLeaves();
      res.status(200).json({ success: true, leaves });
    } catch (err) {
      console.error('Error fetching leaves:', err);
      res.status(500).json({ success: false, message: 'Error fetching leaves' });
    }
  });
  
  app.get('/api/leaves/:id', async (req, res) => {
    try {
      const leave = await storage.getLeave(req.params.id);
      if (!leave) {
        return res.status(404).json({ success: false, message: 'Leave not found' });
      }
      res.status(200).json({ success: true, leave });
    } catch (err) {
      console.error('Error fetching leave:', err);
      res.status(500).json({ success: false, message: 'Error fetching leave' });
    }
  });
  
  app.post('/api/leaves', async (req, res) => {
    try {
      const leave = await storage.createLeave(req.body);
      res.status(201).json({ success: true, message: 'Leave created successfully', leave });
    } catch (err) {
      console.error('Error creating leave:', err);
      res.status(500).json({ success: false, message: 'Error creating leave' });
    }
  });
  
  app.put('/api/leaves/:id', async (req, res) => {
    try {
      const leave = await storage.updateLeave(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Leave updated successfully', leave });
    } catch (err) {
      console.error('Error updating leave:', err);
      res.status(500).json({ success: false, message: 'Error updating leave' });
    }
  });
  
  app.delete('/api/leaves/:id', async (req, res) => {
    try {
      await storage.deleteLeave(req.params.id);
      res.status(200).json({ success: true, message: 'Leave deleted successfully' });
    } catch (err) {
      console.error('Error deleting leave:', err);
      res.status(500).json({ success: false, message: 'Error deleting leave' });
    }
  });
  
  // Attendance routes
  app.get('/api/attendance', async (req, res) => {
    try {
      const attendance = await storage.getAllAttendance();
      res.status(200).json({ success: true, attendance });
    } catch (err) {
      console.error('Error fetching attendance:', err);
      res.status(500).json({ success: false, message: 'Error fetching attendance' });
    }
  });
  
  app.get('/api/attendance/:id', async (req, res) => {
    try {
      const attendance = await storage.getAttendance(req.params.id);
      if (!attendance) {
        return res.status(404).json({ success: false, message: 'Attendance not found' });
      }
      res.status(200).json({ success: true, attendance });
    } catch (err) {
      console.error('Error fetching attendance:', err);
      res.status(500).json({ success: false, message: 'Error fetching attendance' });
    }
  });
  
  app.post('/api/attendance', async (req, res) => {
    try {
      const attendance = await storage.createAttendance(req.body);
      res.status(201).json({ success: true, message: 'Attendance created successfully', attendance });
    } catch (err) {
      console.error('Error creating attendance:', err);
      res.status(500).json({ success: false, message: 'Error creating attendance' });
    }
  });
  
  app.put('/api/attendance/:id', async (req, res) => {
    try {
      const attendance = await storage.updateAttendance(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Attendance updated successfully', attendance });
    } catch (err) {
      console.error('Error updating attendance:', err);
      res.status(500).json({ success: false, message: 'Error updating attendance' });
    }
  });
  
  app.delete('/api/attendance/:id', async (req, res) => {
    try {
      await storage.deleteAttendance(req.params.id);
      res.status(200).json({ success: true, message: 'Attendance deleted successfully' });
    } catch (err) {
      console.error('Error deleting attendance:', err);
      res.status(500).json({ success: false, message: 'Error deleting attendance' });
    }
  });

  return httpServer;
}

module.exports = { registerRoutes };