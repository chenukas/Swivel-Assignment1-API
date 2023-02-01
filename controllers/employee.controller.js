const { HttpStatus } = require('../types/http');
const EmployeeService = require('../services/employee.service');
const logger = require('../utils');

/**
 * Client error handler
 * @param {*} res Response object
 * @param {*} error Error message to be returned
 */
const handleBadRequest = (res, error) => {
    logger.error(`Bad request ${HttpStatus.BAD_REQUEST}: ${error}`);
    res.status(HttpStatus.BAD_REQUEST)
        .json({
            success: false, error
        });
}

/**
* Success scenario handler
* @param {*} res Response object
* @param {*} data Data object
*/
const handleSuccessResponse = (res, data, message = '') => {
    logger.info(`Success ${HttpStatus.OK}: ${message}`);
    res.status(HttpStatus.OK)
        .json({
            success: true, data, message
        });
}

/**
* Handle server side errors
* @param {*} res Response object
* @param {*} error Error message
*/
const handleError = (res, error) => {
    logger.error(`Internal server error ${HttpStatus.INTERNAL_SERVER_ERROR}: ${error}`);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
            success: false, error
        });
}

const getAllEmployees = async (req, res) => {
    try {
        const result = await EmployeeService.getAllEmployees();

        if (result.length == 0) {
            return handleSuccessResponse(res, [], 'Employees not found');
        }

        return handleSuccessResponse(res, result);
    } catch (err) {
        return handleError(res, err.message);
    }
};

const createNewEmployee = async (req, res) => {
    try {
        const result = await EmployeeService.createNewEmployee(req.body);

        return handleSuccessResponse(res, result);
    } catch (err) {
        return handleError(res, err.message);
    }
};

const editAnEmployee = async (req, res) => {
    try {
        const result = await EmployeeService.editAnEmployee(req.params.id, req.body);

        if (result == -1) {
            return handleBadRequest(res, 'Email already exist');
        }

        return handleSuccessResponse(res, result);

    } catch (err) {
        return handleError(res, err.message);
    }

};

const deleteAnEmployee = async (req, res) => {
    try {
        const result = await EmployeeService.deleteAnEmployee(req.params.id);

        return handleSuccessResponse(res, result);
    } catch (err) {
        return handleError(res, err.message);
    }
};

module.exports = {
    handleBadRequest,
    handleSuccessResponse,
    handleError,
    getAllEmployees,
    createNewEmployee,
    editAnEmployee,
    deleteAnEmployee
}