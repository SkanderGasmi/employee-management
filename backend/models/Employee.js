const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Employee name is required'],
        trim: true
    },
    surname: {
        type: String,
        required: [true, 'Employee surname is required'],
        trim: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'Department is required']
    },
    position: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    hireDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);