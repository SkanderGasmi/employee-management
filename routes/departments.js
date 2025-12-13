const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// Get all departments
router.get('/', async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
});

// Create department
router.post('/', async (req, res) => {
    const newDept = new Department(req.body);
    await newDept.save();
    res.json(newDept);
});

module.exports = router;
