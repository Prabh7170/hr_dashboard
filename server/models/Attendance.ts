import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Attendance document
export interface IAttendance extends Document {
  employeeId: number;
  date: string;
  status: string;
  timeIn: string;
  timeOut: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Attendance schema
const AttendanceSchema = new Schema<IAttendance>(
  {
    employeeId: { 
      type: Number, 
      required: true,
      ref: 'Employee'
    },
    date: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      required: true,
      enum: ['present', 'absent', 'late', 'half-day'],
      default: 'present'
    },
    timeIn: { 
      type: String, 
      required: true 
    },
    timeOut: { 
      type: String, 
      required: true 
    }
  },
  { 
    timestamps: true 
  }
);

// Create and export the Attendance model
export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);