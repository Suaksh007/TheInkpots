const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load .env variables
dotenv.config();

// Check connection string
console.log(process.env.MONGO_URI);

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoute = require('./routes/auth');
const protectedRoute = require('./routes/protected');

app.use('/api/auth', authRoute);       // Login / Register
app.use('/api', protectedRoute);       // Protected routes

app.get('/', (req, res) => {
  res.send('Server is running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection failed:', err));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
