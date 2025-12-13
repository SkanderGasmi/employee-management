const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const employeeRoutes = require('./routes/employees');
const departmentRoutes = require('./routes/departments');

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);

// Test route
app.get('/', (req, res) => res.send('Employee Management App Running'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
