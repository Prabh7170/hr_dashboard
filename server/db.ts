// This is a simplified version that emulates MongoDB for the Replit environment
import { 
  User, InsertUser,
  Employee, InsertEmployee,
  Candidate, InsertCandidate,
  Leave, InsertLeave,
  Attendance, InsertAttendance
} from "../shared/mongo-schemas";

// Create a class to simulate MongoDB functionality
class MockDB {
  private users: Map<number, User> = new Map();
  private employees: Map<number, Employee> = new Map();
  private candidates: Map<number, Candidate> = new Map();
  private leaves: Map<number, Leave> = new Map();
  private attendance: Map<number, Attendance> = new Map();
  
  private userIdCounter = 1;
  private employeeIdCounter = 1;
  private candidateIdCounter = 1;
  private leaveIdCounter = 1;
  private attendanceIdCounter = 1;
  
  // Users
  findUser(id: number) {
    return this.users.get(id) || null;
  }
  
  findUserByUsername(username: string) {
    return Array.from(this.users.values()).find(user => user.username === username) || null;
  }
  
  insertUser(userData: InsertUser): User {
    const id = this.userIdCounter++;
    const user: User = {
      id, 
      username: userData.username,
      password: userData.password,
      name: userData.name || "User",
      role: userData.role || "employee"
    };
    this.users.set(id, user);
    return user;
  }
  
  // Employees
  findAllEmployees() {
    return Array.from(this.employees.values());
  }
  
  findEmployee(id: number) {
    return this.employees.get(id) || null;
  }
  
  insertEmployee(employeeData: InsertEmployee): Employee {
    const id = this.employeeIdCounter++;
    const employee: Employee = {
      id,
      name: employeeData.name,
      email: employeeData.email,
      phone: employeeData.phone,
      position: employeeData.position,
      department: employeeData.department,
      joinDate: employeeData.joinDate, 
      status: employeeData.status || "active",
      profile: employeeData.profile || "/placeholder.svg"
    };
    this.employees.set(id, employee);
    return employee;
  }
  
  updateEmployee(id: number, employeeData: Partial<Employee>): Employee {
    const employee = this.employees.get(id);
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    
    const updatedEmployee = { ...employee, ...employeeData };
    this.employees.set(id, updatedEmployee);
    return updatedEmployee;
  }
  
  deleteEmployee(id: number): void {
    if (!this.employees.has(id)) {
      throw new Error(`Employee with id ${id} not found`);
    }
    this.employees.delete(id);
  }
  
  // Candidates
  findAllCandidates() {
    return Array.from(this.candidates.values());
  }
  
  findCandidate(id: number) {
    return this.candidates.get(id) || null;
  }
  
  insertCandidate(candidateData: InsertCandidate): Candidate {
    const id = this.candidateIdCounter++;
    const candidate: Candidate = {
      id,
      name: candidateData.name,
      email: candidateData.email,
      phone: candidateData.phone || "",
      position: candidateData.position,
      status: candidateData.status || "screening",
      appliedDate: candidateData.appliedDate || new Date().toISOString(),
      resume: null
    };
    this.candidates.set(id, candidate);
    return candidate;
  }
  
  updateCandidate(id: number, candidateData: Partial<Candidate>): Candidate {
    const candidate = this.candidates.get(id);
    if (!candidate) {
      throw new Error(`Candidate with id ${id} not found`);
    }
    
    const updatedCandidate = { ...candidate, ...candidateData };
    this.candidates.set(id, updatedCandidate);
    return updatedCandidate;
  }
  
  deleteCandidate(id: number): void {
    if (!this.candidates.has(id)) {
      throw new Error(`Candidate with id ${id} not found`);
    }
    this.candidates.delete(id);
  }
  
  // Leaves
  findAllLeaves() {
    return Array.from(this.leaves.values());
  }
  
  findLeave(id: number) {
    return this.leaves.get(id) || null;
  }
  
  insertLeave(leaveData: InsertLeave): Leave {
    const id = this.leaveIdCounter++;
    
    // Find employee name if available
    let employeeName = "Employee";
    let position = "Position";
    let department = "Department";
    
    const employee = this.employees.get(leaveData.employeeId);
    if (employee) {
      employeeName = employee.name;
      position = employee.position;
      department = employee.department;
    }
    
    const leave: Leave = {
      id,
      employeeId: leaveData.employeeId,
      employeeName: leaveData.employeeName || employeeName,
      position: leaveData.position || position,
      department: leaveData.department || department,
      date: leaveData.date,
      reason: leaveData.reason,
      status: leaveData.status || "pending",
      type: leaveData.type || "vacation",
      document: leaveData.document || null,
      profile: leaveData.profile || "/placeholder.svg"
    };
    
    this.leaves.set(id, leave);
    return leave;
  }
  
  updateLeave(id: number, leaveData: Partial<Leave>): Leave {
    const leave = this.leaves.get(id);
    if (!leave) {
      throw new Error(`Leave with id ${id} not found`);
    }
    
    const updatedLeave = { ...leave, ...leaveData };
    this.leaves.set(id, updatedLeave);
    return updatedLeave;
  }
  
  deleteLeave(id: number): void {
    if (!this.leaves.has(id)) {
      throw new Error(`Leave with id ${id} not found`);
    }
    this.leaves.delete(id);
  }
  
  // Attendance
  findAllAttendance() {
    return Array.from(this.attendance.values());
  }
  
  findAttendance(id: number) {
    return this.attendance.get(id) || null;
  }
  
  insertAttendance(attendanceData: InsertAttendance): Attendance {
    const id = this.attendanceIdCounter++;
    
    // Find employee name if available
    let name = "Employee";
    let position = "Position";
    let department = "Department";
    
    const employee = this.employees.get(attendanceData.employeeId);
    if (employee) {
      name = employee.name;
      position = employee.position;
      department = employee.department;
    }
    
    const attendance: Attendance = {
      id,
      employeeId: attendanceData.employeeId,
      name: attendanceData.name || name,
      position: attendanceData.position || position,
      department: attendanceData.department || department,
      task: attendanceData.task || "Task",
      status: attendanceData.status || "present",
      profile: attendanceData.profile || "/placeholder.svg",
      date: attendanceData.date || new Date()
    };
    
    this.attendance.set(id, attendance);
    return attendance;
  }
  
  updateAttendance(id: number, attendanceData: Partial<Attendance>): Attendance {
    const attendance = this.attendance.get(id);
    if (!attendance) {
      throw new Error(`Attendance with id ${id} not found`);
    }
    
    const updatedAttendance = { ...attendance, ...attendanceData };
    this.attendance.set(id, updatedAttendance);
    return updatedAttendance;
  }
  
  deleteAttendance(id: number): void {
    if (!this.attendance.has(id)) {
      throw new Error(`Attendance with id ${id} not found`);
    }
    this.attendance.delete(id);
  }
}

// Create an instance of our mock database
export const db = new MockDB();

// Connect to our mock database (this just initializes demo data)
export const connectDB = async (): Promise<void> => {
  console.log('Mock MongoDB Connected...');
  
  // Add a demo admin user
  db.insertUser({
    username: 'admin',
    password: 'password',
    name: 'Admin',
    role: 'admin'
  });
  
  // Add sample employees
  const employee1 = db.insertEmployee({
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    phone: '(704) 555-0127',
    position: 'Intern',
    department: 'Designer',
    joinDate: '10/06/13',
    status: 'active'
  });
  
  const employee2 = db.insertEmployee({
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(684) 555-0102',
    position: 'Manager',
    department: 'Marketing',
    joinDate: '05/12/18',
    status: 'active'
  });
  
  db.insertEmployee({
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '(501) 555-0199',
    position: 'Senior Developer',
    department: 'Engineering',
    joinDate: '02/03/20',
    status: 'active'
  });
  
  // Sample candidates
  db.insertCandidate({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    position: 'Frontend Developer',
    status: 'Selected',
    appliedDate: '05/01/24'
  });
  
  db.insertCandidate({
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(555) 234-5678',
    position: 'UX Designer',
    status: 'Interview',
    appliedDate: '05/10/24'
  });
  
  // Sample leaves
  db.insertLeave({
    employeeId: employee1.id,
    employeeName: employee1.name,
    position: 'Full Time',
    department: employee1.department,
    date: '10/09/24',
    reason: 'Visiting House',
    status: 'Approved',
    type: 'vacation'
  });
  
  db.insertLeave({
    employeeId: employee2.id,
    employeeName: employee2.name,
    position: 'Full Time',
    department: employee2.department,
    date: '15/09/24',
    reason: 'Medical Emergency',
    status: 'Pending',
    type: 'emergency'
  });
  
  // Sample attendance
  db.insertAttendance({
    employeeId: employee1.id,
    name: employee1.name,
    position: 'Full Time',
    department: employee1.department,
    task: 'Dashboard Home page Alignment',
    status: 'Present'
  });
  
  db.insertAttendance({
    employeeId: employee2.id,
    name: 'Michael Johnson',
    position: 'Part Time',
    department: 'Developer',
    task: 'API Integration',
    status: 'Present'
  });
};