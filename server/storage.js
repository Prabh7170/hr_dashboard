// Import MongoDB database
const { db } = require('./db');

// Storage implementation using MongoDB
class MongoStorage {
  // User methods
  async getUser(id) {
    try {
      const user = await db.findUser(id);
      return user || undefined;
    } catch (err) {
      console.error('Error getting user:', err);
      return undefined;
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await db.findUserByUsername(username);
      return user || undefined;
    } catch (err) {
      console.error('Error getting user by username:', err);
      return undefined;
    }
  }

  async createUser(insertUser) {
    try {
      const user = await db.insertUser(insertUser);
      return user;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }

  // Employee methods
  async getAllEmployees() {
    try {
      const employees = await db.findAllEmployees();
      return employees;
    } catch (err) {
      console.error('Error getting all employees:', err);
      return [];
    }
  }

  async getEmployee(id) {
    try {
      const employee = await db.findEmployee(id);
      return employee || undefined;
    } catch (err) {
      console.error('Error getting employee:', err);
      return undefined;
    }
  }

  async createEmployee(insertEmployee) {
    try {
      const employee = await db.insertEmployee(insertEmployee);
      return employee;
    } catch (err) {
      console.error('Error creating employee:', err);
      throw err;
    }
  }

  async updateEmployee(id, employeeData) {
    try {
      const employee = await db.updateEmployee(id, employeeData);
      return employee;
    } catch (err) {
      console.error('Error updating employee:', err);
      throw err;
    }
  }

  async deleteEmployee(id) {
    try {
      await db.deleteEmployee(id);
    } catch (err) {
      console.error('Error deleting employee:', err);
      throw err;
    }
  }

  // Candidate methods
  async getAllCandidates() {
    try {
      const candidates = await db.findAllCandidates();
      return candidates;
    } catch (err) {
      console.error('Error getting all candidates:', err);
      return [];
    }
  }

  async getCandidate(id) {
    try {
      const candidate = await db.findCandidate(id);
      return candidate || undefined;
    } catch (err) {
      console.error('Error getting candidate:', err);
      return undefined;
    }
  }

  async createCandidate(insertCandidate) {
    try {
      const candidate = await db.insertCandidate(insertCandidate);
      return candidate;
    } catch (err) {
      console.error('Error creating candidate:', err);
      throw err;
    }
  }

  async updateCandidate(id, candidateData) {
    try {
      const candidate = await db.updateCandidate(id, candidateData);
      return candidate;
    } catch (err) {
      console.error('Error updating candidate:', err);
      throw err;
    }
  }

  async deleteCandidate(id) {
    try {
      await db.deleteCandidate(id);
    } catch (err) {
      console.error('Error deleting candidate:', err);
      throw err;
    }
  }

  // Leave methods
  async getAllLeaves() {
    try {
      const leaves = await db.findAllLeaves();
      return leaves;
    } catch (err) {
      console.error('Error getting all leaves:', err);
      return [];
    }
  }

  async getLeave(id) {
    try {
      const leave = await db.findLeave(id);
      return leave || undefined;
    } catch (err) {
      console.error('Error getting leave:', err);
      return undefined;
    }
  }

  async createLeave(insertLeave) {
    try {
      const leave = await db.insertLeave(insertLeave);
      return leave;
    } catch (err) {
      console.error('Error creating leave:', err);
      throw err;
    }
  }

  async updateLeave(id, leaveData) {
    try {
      const leave = await db.updateLeave(id, leaveData);
      return leave;
    } catch (err) {
      console.error('Error updating leave:', err);
      throw err;
    }
  }

  async deleteLeave(id) {
    try {
      await db.deleteLeave(id);
    } catch (err) {
      console.error('Error deleting leave:', err);
      throw err;
    }
  }

  // Attendance methods
  async getAllAttendance() {
    try {
      const attendance = await db.findAllAttendance();
      return attendance;
    } catch (err) {
      console.error('Error getting all attendance:', err);
      return [];
    }
  }

  async getAttendance(id) {
    try {
      const attendance = await db.findAttendance(id);
      return attendance || undefined;
    } catch (err) {
      console.error('Error getting attendance:', err);
      return undefined;
    }
  }

  async createAttendance(insertAttendance) {
    try {
      const attendance = await db.insertAttendance(insertAttendance);
      return attendance;
    } catch (err) {
      console.error('Error creating attendance:', err);
      throw err;
    }
  }

  async updateAttendance(id, attendanceData) {
    try {
      const attendance = await db.updateAttendance(id, attendanceData);
      return attendance;
    } catch (err) {
      console.error('Error updating attendance:', err);
      throw err;
    }
  }

  async deleteAttendance(id) {
    try {
      await db.deleteAttendance(id);
    } catch (err) {
      console.error('Error deleting attendance:', err);
      throw err;
    }
  }
  
  // Initialize sample data
  async initializeSampleData() {
    try {
      await db.initializeSampleData();
    } catch (err) {
      console.error('Error initializing sample data:', err);
      throw err;
    }
  }
}

const storage = new MongoStorage();

module.exports = {
  storage
};