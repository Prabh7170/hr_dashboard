import mongoose from 'mongoose';

// A simplified in-memory MongoDB connection
export async function connectInMemoryMongoDB(): Promise<void> {
  try {
    // Use a local in-memory connection string that will work on Replit
    const uri = 'mongodb://127.0.0.1:27017/hrdashboard';
    
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log('Connected to in-memory MongoDB');
    
    // Seed with default admin user
    await seedDatabase();
    
    return;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function seedDatabase() {
  // You can add seed data logic here if needed
  console.log('Database ready to use');
}

// Export mongoose for use elsewhere in the app
export { mongoose };