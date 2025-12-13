const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        const populated = await Employee.findById(employee._id).populate('department');
        res.status(201).json({
            success: true,
            data: populated
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('department');
        res.json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('department');
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }
        res.json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('department');
        
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }
        res.json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
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