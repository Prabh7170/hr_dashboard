import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Employee document
export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Employee schema
const EmployeeSchema = new Schema<IEmployee>(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true
    },
    phone: { 
      type: String, 
      required: true 
    },
    position: { 
      type: String, 
      required: true 
    },
    department: { 
      type: String, 
      required: true 
    },
    joinDate: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      required: true,
      enum: ['active', 'on-leave', 'terminated'],
      default: 'active'
    }
  },
  { 
    timestamps: true 
  }
);

// Create and export the Employee model
export default mongoose.model<IEmployee>('Employee', EmployeeSchema);