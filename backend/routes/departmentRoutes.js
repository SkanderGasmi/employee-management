const express = require('express');
const router = express.Router();
const {
    createDepartment,
    getAllDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment
} = require('../controllers/departmentController');

router.route('/')
    .post(createDepartment)
    .get(getAllDepartments);

router.route('/:id')
    .get(getDepartment)
    .put(updateDepartment)
    .delete(deleteDepartment);

module.exports = router;