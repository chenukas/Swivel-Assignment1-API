const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');
const { employeeDataValidation } = require('../middleware/validations');

router.get('/employees', employeeController.getAllEmployees);
router.post('/employees', employeeDataValidation, employeeController.createNewEmployee);
router.put('/employees/:id', employeeDataValidation, employeeController.editAnEmployee);
router.delete('/employees/:id', employeeController.deleteAnEmployee);

module.exports = router;