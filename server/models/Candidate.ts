import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Candidate document
export interface ICandidate extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  appliedDate: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Candidate schema
const CandidateSchema = new Schema<ICandidate>(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true,
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
    status: { 
      type: String, 
      required: true,
      enum: ['screening', 'interview', 'technical', 'offered', 'rejected', 'hired'],
      default: 'screening'
    },
    appliedDate: { 
      type: String, 
      required: true 
    }
  },
  { 
    timestamps: true 
  }
);

// Create and export the Candidate model
export default mongoose.model<ICandidate>('Candidate', CandidateSchema);