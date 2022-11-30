const { HttpStatus } = require('../types/http');
const { employeeDataValidation } = require('../middleware/validations');
const EmployeeService = require('../services/employee.service');

const getAllEmployees = async (req, res) => {
    try {
        const result = await EmployeeService.getAllEmployees();

        if (result.length == 0) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Employees not found'
            });
        }

        return res.status(HttpStatus.OK).json({
            data: result
        });
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err.message,
        });
    }
};

const createNewEmployee = async (req, res) => {
    const { error } = employeeDataValidation(req.body);

    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            error: error.details[0].message
        });
    }

    try {
        const result = await EmployeeService.createNewEmployee(req.body);

        return res.status(HttpStatus.CREATED).json({
            data: result
        });

    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err.message,
        });
    }
};

const editAnEmployee = async (req, res) => {
    const { error } = employeeDataValidation(req.body);

    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            error: error.details[0].message
        });
    }

    try {
        const result = await EmployeeService.editAnEmployee(req.params.id, req.body);

        if (result == -1) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: 'Email already exist'
            });
        }

        return res.status(HttpStatus.OK).json({
            data: result
        });

    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err.message,
        });
    }

};

const deleteAnEmployee = async (req, res) => {
    try {
        const result = await EmployeeService.deleteAnEmployee(req.params.id);

        return res.status(HttpStatus.OK).json({
            data: result
        });
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err.message,
        });
    }
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    editAnEmployee,
    deleteAnEmployee
}