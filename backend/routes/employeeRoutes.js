const express = require('express');
const router = express.Router();
const {
    createEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

router.route('/')
    .post(createEmployee)
    .get(getAllEmployees);

router.route('/:id')
    .get(getEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

module.exports = router;