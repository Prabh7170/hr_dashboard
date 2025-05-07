import { users, type User, type InsertUser } from "@shared/schema";
import { type Employee, type InsertEmployee } from "@shared/schema";
import { type Candidate, type InsertCandidate } from "@shared/schema";
import { type Leave, type InsertLeave } from "@shared/schema";
import { type Attendance, type InsertAttendance } from "@shared/schema";

// Storage interface with all CRUD methods needed for the application
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Employee methods
  getAllEmployees(): Promise<Employee[]>;
  getEmployee(id: number): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee>;
  deleteEmployee(id: number): Promise<void>;
  
  // Candidate methods
  getAllCandidates(): Promise<Candidate[]>;
  getCandidate(id: number): Promise<Candidate | undefined>;
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;
  updateCandidate(id: number, candidate: Partial<Candidate>): Promise<Candidate>;
  deleteCandidate(id: number): Promise<void>;
  
  // Leave methods
  getAllLeaves(): Promise<Leave[]>;
  getLeave(id: number): Promise<Leave | undefined>;
  createLeave(leave: InsertLeave): Promise<Leave>;
  updateLeave(id: number, leave: Partial<Leave>): Promise<Leave>;
  deleteLeave(id: number): Promise<void>;
  
  // Attendance methods
  getAllAttendance(): Promise<Attendance[]>;
  getAttendance(id: number): Promise<Attendance | undefined>;
  createAttendance(attendance: InsertAttendance): Promise<Attendance>;
  updateAttendance(id: number, attendance: Partial<Attendance>): Promise<Attendance>;
  deleteAttendance(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private employees: Map<number, Employee>;
  private candidates: Map<number, Candidate>;
  private leaves: Map<number, Leave>;
  private attendance: Map<number, Attendance>;
  
  private userNextId: number;
  private employeeNextId: number;
  private candidateNextId: number;
  private leaveNextId: number;
  private attendanceNextId: number;

  constructor() {
    this.users = new Map();
    this.employees = new Map();
    this.candidates = new Map();
    this.leaves = new Map();
    this.attendance = new Map();
    
    this.userNextId = 1;
    this.employeeNextId = 1;
    this.candidateNextId = 1;
    this.leaveNextId = 1;
    this.attendanceNextId = 1;
    
    // Add test user
    this.createUser({
      username: 'admin',
      password: 'password'
    });
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Sample employees
    this.createEmployee({
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      phone: '(704) 555-0127',
      position: 'Intern',
      department: 'Designer',
      joiningDate: '10/06/13',
      profile: '/placeholder.svg'
    });
    
    this.createEmployee({
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '(684) 555-0102',
      position: 'Manager',
      department: 'Marketing',
      joiningDate: '05/12/18',
      profile: '/placeholder.svg'
    });
    
    this.createEmployee({
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '(501) 555-0199',
      position: 'Senior Developer',
      department: 'Engineering',
      joiningDate: '02/03/20',
      profile: '/placeholder.svg'
    });
    
    // Sample candidates
    this.createCandidate({
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Selected',
      resume: null
    });
    
    this.createCandidate({
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Interview',
      resume: null
    });
    
    // Sample leaves
    this.createLeave({
      employeeId: 1,
      employeeName: 'Jane Cooper',
      position: 'Full Time',
      department: 'Designer',
      date: '10/09/24',
      reason: 'Visiting House',
      status: 'Approved',
      document: 'leave_document.pdf',
      profile: '/placeholder.svg'
    });
    
    this.createLeave({
      employeeId: 2,
      employeeName: 'Robert Johnson',
      position: 'Full Time',
      department: 'Developer',
      date: '15/09/24',
      reason: 'Medical Emergency',
      status: 'Pending',
      document: 'medical_certificate.pdf',
      profile: '/placeholder.svg'
    });
    
    // Sample attendance
    this.createAttendance({
      employeeId: 1,
      name: 'Jane Cooper',
      position: 'Full Time',
      department: 'Designer',
      task: 'Dashboard Home page Alignment',
      status: 'Present',
      profile: '/placeholder.svg'
    });
    
    this.createAttendance({
      employeeId: 2,
      name: 'Michael Johnson',
      position: 'Part Time',
      department: 'Developer',
      task: 'API Integration',
      status: 'Present',
      profile: '/placeholder.svg'
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userNextId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Employee methods
  async getAllEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }
  
  async getEmployee(id: number): Promise<Employee | undefined> {
    return this.employees.get(id);
  }
  
  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const id = this.employeeNextId++;
    const employee: Employee = { ...insertEmployee, id };
    this.employees.set(id, employee);
    return employee;
  }
  
  async updateEmployee(id: number, employeeData: Partial<Employee>): Promise<Employee> {
    const existingEmployee = this.employees.get(id);
    if (!existingEmployee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    
    const updatedEmployee = { ...existingEmployee, ...employeeData };
    this.employees.set(id, updatedEmployee);
    
    return updatedEmployee;
  }
  
  async deleteEmployee(id: number): Promise<void> {
    if (!this.employees.has(id)) {
      throw new Error(`Employee with id ${id} not found`);
    }
    
    this.employees.delete(id);
  }
  
  // Candidate methods
  async getAllCandidates(): Promise<Candidate[]> {
    return Array.from(this.candidates.values());
  }
  
  async getCandidate(id: number): Promise<Candidate | undefined> {
    return this.candidates.get(id);
  }
  
  async createCandidate(insertCandidate: InsertCandidate): Promise<Candidate> {
    const id = this.candidateNextId++;
    const candidate: Candidate = { ...insertCandidate, id };
    this.candidates.set(id, candidate);
    return candidate;
  }
  
  async updateCandidate(id: number, candidateData: Partial<Candidate>): Promise<Candidate> {
    const existingCandidate = this.candidates.get(id);
    if (!existingCandidate) {
      throw new Error(`Candidate with id ${id} not found`);
    }
    
    const updatedCandidate = { ...existingCandidate, ...candidateData };
    this.candidates.set(id, updatedCandidate);
    
    return updatedCandidate;
  }
  
  async deleteCandidate(id: number): Promise<void> {
    if (!this.candidates.has(id)) {
      throw new Error(`Candidate with id ${id} not found`);
    }
    
    this.candidates.delete(id);
  }
  
  // Leave methods
  async getAllLeaves(): Promise<Leave[]> {
    return Array.from(this.leaves.values());
  }
  
  async getLeave(id: number): Promise<Leave | undefined> {
    return this.leaves.get(id);
  }
  
  async createLeave(insertLeave: InsertLeave): Promise<Leave> {
    const id = this.leaveNextId++;
    const leave: Leave = { ...insertLeave, id };
    this.leaves.set(id, leave);
    return leave;
  }
  
  async updateLeave(id: number, leaveData: Partial<Leave>): Promise<Leave> {
    const existingLeave = this.leaves.get(id);
    if (!existingLeave) {
      throw new Error(`Leave with id ${id} not found`);
    }
    
    const updatedLeave = { ...existingLeave, ...leaveData };
    this.leaves.set(id, updatedLeave);
    
    return updatedLeave;
  }
  
  async deleteLeave(id: number): Promise<void> {
    if (!this.leaves.has(id)) {
      throw new Error(`Leave with id ${id} not found`);
    }
    
    this.leaves.delete(id);
  }
  
  // Attendance methods
  async getAllAttendance(): Promise<Attendance[]> {
    return Array.from(this.attendance.values());
  }
  
  async getAttendance(id: number): Promise<Attendance | undefined> {
    return this.attendance.get(id);
  }
  
  async createAttendance(insertAttendance: InsertAttendance): Promise<Attendance> {
    const id = this.attendanceNextId++;
    const attendance: Attendance = { ...insertAttendance, id };
    this.attendance.set(id, attendance);
    return attendance;
  }
  
  async updateAttendance(id: number, attendanceData: Partial<Attendance>): Promise<Attendance> {
    const existingAttendance = this.attendance.get(id);
    if (!existingAttendance) {
      throw new Error(`Attendance with id ${id} not found`);
    }
    
    const updatedAttendance = { ...existingAttendance, ...attendanceData };
    this.attendance.set(id, updatedAttendance);
    
    return updatedAttendance;
  }
  
  async deleteAttendance(id: number): Promise<void> {
    if (!this.attendance.has(id)) {
      throw new Error(`Attendance with id ${id} not found`);
    }
    
    this.attendance.delete(id);
  }
}

export const storage = new MemStorage();
