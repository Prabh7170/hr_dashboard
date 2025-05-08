const mongoose = require('mongoose');

// Replace with your MongoDB Compass connection string
const MONGODB_URI = 'mongodb://localhost:27017/hr-dashboard';

// Define Mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'User' },
  role: { type: String, default: 'employee' }
}, { timestamps: true });

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  joinDate: { type: String, required: true },
  status: { type: String, default: 'active' },
  profile: { type: String, default: '/placeholder.svg' }
}, { timestamps: true });

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  position: { type: String, required: true },
  status: { type: String, default: 'screening' },
  appliedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  resume: { type: String, default: null }
}, { timestamps: true });

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeName: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'pending' },
  type: { type: String, default: 'vacation' },
  document: { type: String, default: null },
  profile: { type: String, default: '/placeholder.svg' }
}, { timestamps: true });

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  task: { type: String, default: 'Task' },
  status: { type: String, default: 'present' },
  profile: { type: String, default: '/placeholder.svg' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

// Create models
const UserModel = mongoose.model('User', userSchema);
const EmployeeModel = mongoose.model('Employee', employeeSchema);
const CandidateModel = mongoose.model('Candidate', candidateSchema);
const LeaveModel = mongoose.model('Leave', leaveSchema);
const AttendanceModel = mongoose.model('Attendance', attendanceSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected via Compass...');
    
    // Check if we need to seed initial data
    const usersCount = await UserModel.countDocuments();
    if (usersCount === 0) {
      console.log('No users found, seeding initial data...');
      await seedInitialData();
    }
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    throw err;
  }
};

// Seed initial data function
const seedInitialData = async () => {
  try {
    // Add a demo admin user
    const adminUser = await UserModel.create({
      username: 'admin',
      password: 'password',
      name: 'Admin',
      role: 'admin'
    });
    
    // Add sample employees
    const employee1 = await EmployeeModel.create({
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      phone: '(704) 555-0127',
      position: 'Intern',
      department: 'Designer',
      joinDate: '10/06/13',
      status: 'active'
    });
    
    const employee2 = await EmployeeModel.create({
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '(684) 555-0102',
      position: 'Manager',
      department: 'Marketing',
      joinDate: '05/12/18',
      status: 'active'
    });
    
    await EmployeeModel.create({
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '(501) 555-0199',
      position: 'Senior Developer',
      department: 'Engineering',
      joinDate: '02/03/20',
      status: 'active'
    });
    
    // Sample candidates
    await CandidateModel.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      position: 'Frontend Developer',
      status: 'Selected',
      appliedDate: '05/01/24'
    });
    
    await CandidateModel.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 234-5678',
      position: 'UX Designer',
      status: 'Interview',
      appliedDate: '05/10/24'
    });
    
    // Sample leaves
    await LeaveModel.create({
      employeeId: employee1._id,
      employeeName: 'Jane Cooper',
      position: 'Full Time',
      department: 'Designer',
      date: '10/09/24',
      reason: 'Visiting House',
      status: 'Approved',
      type: 'vacation'
    });
    
    await LeaveModel.create({
      employeeId: employee2._id,
      employeeName: 'Robert Johnson',
      position: 'Full Time',
      department: 'Marketing',
      date: '15/09/24',
      reason: 'Medical Emergency',
      status: 'Pending',
      type: 'emergency'
    });
    
    // Sample attendance
    await AttendanceModel.create({
      employeeId: employee1._id,
      name: 'Jane Cooper',
      position: 'Full Time',
      department: 'Designer',
      task: 'Dashboard Home page Alignment',
      status: 'Present'
    });
    
    await AttendanceModel.create({
      employeeId: employee2._id,
      name: 'Michael Johnson',
      position: 'Part Time',
      department: 'Developer',
      task: 'API Integration',
      status: 'Present'
    });
    
    console.log('Initial data seeded successfully');
  } catch (err) {
    console.error('Error seeding initial data:', err);
    throw err;
  }
};

// MongoDB implementation using Mongoose models
class MongoDBImplementation {
  // Users
  async findUser(id) {
    try {
      const user = await UserModel.findById(id);
      if (!user) return null;
      
      return {
        id: user._id.toString(),
        username: user.username,
        password: user.password,
        name: user.name,
        role: user.role
      };
    } catch (err) {
      console.error('Error finding user:', err);
      throw err;
    }
  }
  
  async findUserByUsername(username) {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return null;
      
      return {
        id: user._id.toString(),
        username: user.username,
        password: user.password,
        name: user.name || 'User',
        role: user.role || 'employee'
      };
    } catch (err) {
      console.error('Error finding user by username:', err);
      throw err;
    }
  }
  
  async insertUser(userData) {
    try {
      const user = await UserModel.create({
        username: userData.username,
        password: userData.password,
        name: userData.name || 'User',
        role: userData.role || 'employee'
      });
      
      return {
        id: user._id.toString(),
        username: user.username,
        password: user.password,
        name: user.name,
        role: user.role
      };
    } catch (err) {
      console.error('Error inserting user:', err);
      throw err;
    }
  }
  
  // Employees
  async findAllEmployees() {
    try {
      const employees = await EmployeeModel.find();
      return employees.map(employee => ({
        id: employee._id.toString(),
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        joinDate: employee.joinDate,
        status: employee.status,
        profile: employee.profile
      }));
    } catch (err) {
      console.error('Error finding all employees:', err);
      throw err;
    }
  }
  
  async findEmployee(id) {
    try {
      const employee = await EmployeeModel.findById(id);
      if (!employee) return null;
      
      return {
        id: employee._id.toString(),
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        joinDate: employee.joinDate,
        status: employee.status,
        profile: employee.profile
      };
    } catch (err) {
      console.error('Error finding employee:', err);
      throw err;
    }
  }
  
  async insertEmployee(employeeData) {
    try {
      const employee = await EmployeeModel.create({
        name: employeeData.name,
        email: employeeData.email,
        phone: employeeData.phone,
        position: employeeData.position,
        department: employeeData.department,
        joinDate: employeeData.joinDate,
        status: employeeData.status || 'active',
        profile: employeeData.profile || '/placeholder.svg'
      });
      
      return {
        id: employee._id.toString(),
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        joinDate: employee.joinDate,
        status: employee.status,
        profile: employee.profile
      };
    } catch (err) {
      console.error('Error inserting employee:', err);
      throw err;
    }
  }
  
  async updateEmployee(id, employeeData) {
    try {
      const employee = await EmployeeModel.findByIdAndUpdate(id, employeeData, { new: true });
      if (!employee) {
        throw new Error(`Employee with id ${id} not found`);
      }
      
      return {
        id: employee._id.toString(),
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        joinDate: employee.joinDate,
        status: employee.status,
        profile: employee.profile
      };
    } catch (err) {
      console.error('Error updating employee:', err);
      throw err;
    }
  }
  
  async deleteEmployee(id) {
    try {
      const result = await EmployeeModel.findByIdAndDelete(id);
      if (!result) {
        throw new Error(`Employee with id ${id} not found`);
      }
    } catch (err) {
      console.error('Error deleting employee:', err);
      throw err;
    }
  }
  
  // Candidates
  async findAllCandidates() {
    try {
      const candidates = await CandidateModel.find();
      return candidates.map(candidate => ({
        id: candidate._id.toString(),
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        status: candidate.status,
        appliedDate: candidate.appliedDate,
        resume: candidate.resume
      }));
    } catch (err) {
      console.error('Error finding all candidates:', err);
      throw err;
    }
  }
  
  async findCandidate(id) {
    try {
      const candidate = await CandidateModel.findById(id);
      if (!candidate) return null;
      
      return {
        id: candidate._id.toString(),
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        status: candidate.status,
        appliedDate: candidate.appliedDate,
        resume: candidate.resume
      };
    } catch (err) {
      console.error('Error finding candidate:', err);
      throw err;
    }
  }
  
  async insertCandidate(candidateData) {
    try {
      const candidate = await CandidateModel.create({
        name: candidateData.name,
        email: candidateData.email,
        phone: candidateData.phone || '',
        position: candidateData.position,
        status: candidateData.status || 'screening',
        appliedDate: candidateData.appliedDate || new Date().toISOString().split('T')[0],
        resume: candidateData.resume || null
      });
      
      return {
        id: candidate._id.toString(),
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        status: candidate.status,
        appliedDate: candidate.appliedDate,
        resume: candidate.resume
      };
    } catch (err) {
      console.error('Error inserting candidate:', err);
      throw err;
    }
  }
  
  async updateCandidate(id, candidateData) {
    try {
      const candidate = await CandidateModel.findByIdAndUpdate(id, candidateData, { new: true });
      if (!candidate) {
        throw new Error(`Candidate with id ${id} not found`);
      }
      
      return {
        id: candidate._id.toString(),
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        status: candidate.status,
        appliedDate: candidate.appliedDate,
        resume: candidate.resume
      };
    } catch (err) {
      console.error('Error updating candidate:', err);
      throw err;
    }
  }
  
  async deleteCandidate(id) {
    try {
      const result = await CandidateModel.findByIdAndDelete(id);
      if (!result) {
        throw new Error(`Candidate with id ${id} not found`);
      }
    } catch (err) {
      console.error('Error deleting candidate:', err);
      throw err;
    }
  }
  
  // Leaves
  async findAllLeaves() {
    try {
      const leaves = await LeaveModel.find();
      return leaves.map(leave => ({
        id: leave._id.toString(),
        employeeId: leave.employeeId.toString(),
        employeeName: leave.employeeName,
        position: leave.position,
        department: leave.department,
        date: leave.date,
        reason: leave.reason,
        status: leave.status,
        type: leave.type,
        document: leave.document,
        profile: leave.profile
      }));
    } catch (err) {
      console.error('Error finding all leaves:', err);
      throw err;
    }
  }
  
  async findLeave(id) {
    try {
      const leave = await LeaveModel.findById(id);
      if (!leave) return null;
      
      return {
        id: leave._id.toString(),
        employeeId: leave.employeeId.toString(),
        employeeName: leave.employeeName,
        position: leave.position,
        department: leave.department,
        date: leave.date,
        reason: leave.reason,
        status: leave.status,
        type: leave.type,
        document: leave.document,
        profile: leave.profile
      };
    } catch (err) {
      console.error('Error finding leave:', err);
      throw err;
    }
  }
  
  async insertLeave(leaveData) {
    try {
      // Find employee name if available
      let employeeName = "Employee";
      let position = "Position";
      let department = "Department";
      let profile = "/placeholder.svg";
      
      if (leaveData.employeeId) {
        const employee = await EmployeeModel.findById(leaveData.employeeId);
        if (employee) {
          employeeName = employee.name;
          position = employee.position;
          department = employee.department;
          profile = employee.profile;
        }
      }
      
      const leave = await LeaveModel.create({
        employeeId: leaveData.employeeId,
        employeeName: leaveData.employeeName || employeeName,
        position: leaveData.position || position,
        department: leaveData.department || department,
        date: leaveData.date,
        reason: leaveData.reason,
        status: leaveData.status || 'pending',
        type: leaveData.type || 'vacation',
        document: leaveData.document || null,
        profile: leaveData.profile || profile
      });
      
      return {
        id: leave._id.toString(),
        employeeId: leave.employeeId.toString(),
        employeeName: leave.employeeName,
        position: leave.position,
        department: leave.department,
        date: leave.date,
        reason: leave.reason,
        status: leave.status,
        type: leave.type,
        document: leave.document,
        profile: leave.profile
      };
    } catch (err) {
      console.error('Error inserting leave:', err);
      throw err;
    }
  }
  
  async updateLeave(id, leaveData) {
    try {
      const leave = await LeaveModel.findByIdAndUpdate(id, leaveData, { new: true });
      if (!leave) {
        throw new Error(`Leave with id ${id} not found`);
      }
      
      return {
        id: leave._id.toString(),
        employeeId: leave.employeeId.toString(),
        employeeName: leave.employeeName,
        position: leave.position,
        department: leave.department,
        date: leave.date,
        reason: leave.reason,
        status: leave.status,
        type: leave.type,
        document: leave.document,
        profile: leave.profile
      };
    } catch (err) {
      console.error('Error updating leave:', err);
      throw err;
    }
  }
  
  async deleteLeave(id) {
    try {
      const result = await LeaveModel.findByIdAndDelete(id);
      if (!result) {
        throw new Error(`Leave with id ${id} not found`);
      }
    } catch (err) {
      console.error('Error deleting leave:', err);
      throw err;
    }
  }
  
  // Attendance
  async findAllAttendance() {
    try {
      const attendances = await AttendanceModel.find();
      return attendances.map(attendance => ({
        id: attendance._id.toString(),
        employeeId: attendance.employeeId.toString(),
        name: attendance.name,
        position: attendance.position,
        department: attendance.department,
        task: attendance.task,
        status: attendance.status,
        profile: attendance.profile,
        date: attendance.date
      }));
    } catch (err) {
      console.error('Error finding all attendance:', err);
      throw err;
    }
  }
  
  async findAttendance(id) {
    try {
      const attendance = await AttendanceModel.findById(id);
      if (!attendance) return null;
      
      return {
        id: attendance._id.toString(),
        employeeId: attendance.employeeId.toString(),
        name: attendance.name,
        position: attendance.position,
        department: attendance.department,
        task: attendance.task,
        status: attendance.status,
        profile: attendance.profile,
        date: attendance.date
      };
    } catch (err) {
      console.error('Error finding attendance:', err);
      throw err;
    }
  }
  
  async insertAttendance(attendanceData) {
    try {
      // Find employee name if available
      let name = "Employee";
      let position = "Position";
      let department = "Department";
      let profile = "/placeholder.svg";
      
      if (attendanceData.employeeId) {
        const employee = await EmployeeModel.findById(attendanceData.employeeId);
        if (employee) {
          name = employee.name;
          position = employee.position;
          department = employee.department;
          profile = employee.profile;
        }
      }
      
      const attendance = await AttendanceModel.create({
        employeeId: attendanceData.employeeId,
        name: attendanceData.name || name,
        position: attendanceData.position || position,
        department: attendanceData.department || department,
        task: attendanceData.task || 'Task',
        status: attendanceData.status || 'present',
        profile: attendanceData.profile || profile,
        date: attendanceData.date || new Date()
      });
      
      return {
        id: attendance._id.toString(),
        employeeId: attendance.employeeId.toString(),
        name: attendance.name,
        position: attendance.position,
        department: attendance.department,
        task: attendance.task,
        status: attendance.status,
        profile: attendance.profile,
        date: attendance.date
      };
    } catch (err) {
      console.error('Error inserting attendance:', err);
      throw err;
    }
  }
  
  async updateAttendance(id, attendanceData) {
    try {
      const attendance = await AttendanceModel.findByIdAndUpdate(id, attendanceData, { new: true });
      if (!attendance) {
        throw new Error(`Attendance with id ${id} not found`);
      }
      
      return {
        id: attendance._id.toString(),
        employeeId: attendance.employeeId.toString(),
        name: attendance.name,
        position: attendance.position,
        department: attendance.department,
        task: attendance.task,
        status: attendance.status,
        profile: attendance.profile,
        date: attendance.date
      };
    } catch (err) {
      console.error('Error updating attendance:', err);
      throw err;
    }
  }
  
  async deleteAttendance(id) {
    try {
      const result = await AttendanceModel.findByIdAndDelete(id);
      if (!result) {
        throw new Error(`Attendance with id ${id} not found`);
      }
    } catch (err) {
      console.error('Error deleting attendance:', err);
      throw err;
    }
  }
  
  // Initialize sample data
  async initializeSampleData() {
    try {
      // Check if there's already data
      const usersCount = await UserModel.countDocuments();
      if (usersCount > 0) {
        console.log('Sample data already exists');
        return;
      }
      
      // If no data exists, seed the initial data
      await seedInitialData();
    } catch (err) {
      console.error('Error initializing sample data:', err);
      throw err;
    }
  }
}

// Export the MongoDB implementation
const db = new MongoDBImplementation();

module.exports = {
  connectDB,
  db
};