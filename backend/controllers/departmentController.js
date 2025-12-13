const Department = require('../models/Department');
const Employee = require('../models/Employee');

exports.createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json({
            success: true,
            data: department
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json({
            success: true,
            count: departments.length,
            data: departments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({
                success: false,
                error: 'Department not found'
            });
        }
        res.json({
            success: true,
            data: department
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!department) {
            return res.status(404).json({
                success: false,
                error: 'Department not found'
            });
        }
        res.json({
            success: true,
            data: department
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        // Check if department has employees
        const employees = await Employee.find({ department: req.params.id });
        if (employees.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Cannot delete department with employees'
            });
        }
        
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) {
            return res.status(404).json({
                success: false,
                error: 'Department not found'
            });
        }
        res.json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};