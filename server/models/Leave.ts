import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Leave document
export interface ILeave extends Document {
  employeeId: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Leave schema
const LeaveSchema = new Schema<ILeave>(
  {
    employeeId: { 
      type: Number, 
      required: true,
      ref: 'Employee'
    },
    startDate: { 
      type: String, 
      required: true 
    },
    endDate: { 
      type: String, 
      required: true 
    },
    reason: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      required: true,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    type: { 
      type: String, 
      required: true,
      enum: ['vacation', 'sick', 'emergency', 'other'],
      default: 'vacation'
    }
  },
  { 
    timestamps: true 
  }
);

// Create and export the Leave model
export default mongoose.model<ILeave>('Leave', LeaveSchema);