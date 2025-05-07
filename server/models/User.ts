import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for User document
export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const UserSchema = new Schema<IUser>(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      required: true, 
      enum: ['admin', 'hr', 'manager', 'employee'],
      default: 'employee'
    }
  },
  { 
    timestamps: true 
  }
);

// Create and export the User model
export default mongoose.model<IUser>('User', UserSchema);