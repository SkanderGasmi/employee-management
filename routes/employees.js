const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Get all employees
router.get('/', async (req, res) => {
    const employees = await Employee.find().populate('department');
    res.json(employees);
});

// Create employee
router.post('/', async (req, res) => {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
});

module.exports = router;
