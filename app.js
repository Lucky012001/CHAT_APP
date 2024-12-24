// const express = require('express');
// const sequelize = require('./config/database');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');
// const path = require('path');
// const cors = require('cors');

// // Initialize app first
// const app = express();

// // Add CORS Middleware
// app.use(cors());

// // Middleware
// app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/auth', authRoutes);

// // Database Sync
// sequelize.sync({ force: false }).then(() => {
//     console.log('Database connected');
// }).catch((error) => {
//     console.log('Database connection error:', error);
// });

// // Start server
// app.listen(2000, () => {
//     console.log('Server is running on http://localhost:2000');
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const userRouter = require('./routes/userRoutes'); // Assuming your router file is in a 'routes' folder

// const app = express();

// // Middleware to parse incoming requests with JSON payloads
// app.use(bodyParser.json());

// // Use the userRouter for routes related to user actions
// app.use('/api', userRouter);

// // Basic route to check if the server is running
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // Set the port for the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const sequelize = require('./config/database');
// const authRoutes = require('./routes/auth'); // Authentication routes (assuming you have this file)
// const userRouter = require('./routes/userRoutes'); // User-related routes
// const path = require('path');
// const cors = require('cors');

// // Initialize the Express app
// const app = express();

// // Add CORS Middleware
// app.use(cors());

// // Middleware to parse incoming requests with JSON payloads
// app.use(bodyParser.json());

// // Middleware to serve static files (like images) from the 'uploads' folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/auth', authRoutes);  // Authentication routes (if you have them)
// app.use('/api', userRouter);       // User-related routes (your user routes)

// // Basic route to check if the server is running
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // Sync the database and start the server
// sequelize.sync({ force: false }).then(() => {
//   console.log('Database connected');
// }).catch((error) => {
//   console.log('Database connection error:', error);
// });

// // Set the port for the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });










const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth'); // Authentication routes
const userRouter = require('./routes/userRoutes'); // User-related routes
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the Express app
const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.IO

// Set up Socket.IO with CORS options
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',  // Allow frontend (React) URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,  // Optional, if you need cookies
  },
});

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// CORS middleware to allow cross-origin requests from frontend
app.use(cors({
  origin: 'http://localhost:3000',  // React app URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,  // Optional, for sending credentials (cookies)
}));

// Middleware to serve static files (like images) from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api', userRouter);       // User-related routes

// Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);
    io.emit('receiveMessage', message);  // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.log('Database connection error:', error);
});

// Set the port for the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
