const { spawn } = require('child_process');

// Set environment variables for the child process
const env = { ...process.env, NODE_ENV: 'development' };

// Start the server with node
const server = spawn('node', ['server/index.js'], { 
  env, 
  stdio: 'inherit',
  shell: true 
});

// Handle server exit
server.on('close', code => {
  console.log(`Server process exited with code ${code}`);
});