const express = require('express');
const { json } = require('express');
const { createServer } = require('http');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { log, setupVite, serveStatic } = require('./vite');
const { registerRoutes } = require('./routes');
const { connectDB } = require('./db');
const { storage } = require('./storage');

// Use environment variables safely (for Windows compatibility)
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '4000', 10);

// Connect to the database
connectDB().then(() => {
  console.log("MongoDB Connected...");
  
  // Initialize sample data
  storage.initializeSampleData().then(() => {
    console.log("Sample data already initialized");
  }).catch((err) => {
    console.error(`Error initializing sample data: ${err.message}`);
  });
  
}).catch((err) => {
  console.error(`Database connection error: ${err.message}`);
});

const app = express();
app.use(json());

// Configure session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize/deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// API routes
registerRoutes(app).then((httpServer) => {
  // Serve static assets in production
  if (NODE_ENV === "production") {
    serveStatic(app);
  } else {
    // Dev mode: use Vite for HMR
    setupVite(app, httpServer);
  }

  // Error handling middleware
  app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message,
      error: NODE_ENV === "development" ? err : {}
    });
  });

  // Start the server without binding to a specific IP
  httpServer.listen(PORT, () => {
    console.log(`[express] serving on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to register routes:", err);
});

module.exports = app;