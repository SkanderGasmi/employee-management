const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);

// API Documentation
app.get('/api', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
        message: 'Employee Management API',
        database: dbStatus,
        endpoints: {
            employees: '/api/employees',
            departments: '/api/departments'
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
        status: 'healthy',
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
};

// Start server
const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`✅ Server started on port ${PORT}`);
        console.log(`🌐 Open http://localhost:${PORT} in your browser`);
        console.log(`📡 API: http://localhost:${PORT}/api`);
    });
};

startServer();