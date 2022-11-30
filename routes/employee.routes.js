const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.get('/employees', employeeController.getAllEmployees);
router.post('/employees', employeeController.createNewEmployee);
router.put('/employees/:id', employeeController.editAnEmployee);
router.delete('/employees/:id', employeeController.deleteAnEmployee);

module.exports = router;