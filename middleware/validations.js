const Joi = require('joi');
const { handleBadRequest } = require('../controllers/employee.controller');
const logger = require('../utils');

function employeeDataValidation(req, res, next) {
    const schema = Joi.object({
        first_name: Joi.string().max(10).required(),
        last_name: Joi.string().max(10).required(),
        email: Joi.string().required().email(),
        number: Joi.string().regex(/^(?:\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/),
        gender: Joi.string().max(1).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        logger.error(`Employee data validation error: ${error.details[0].message}`)
        return handleBadRequest(res, error.details[0].message);
    } else {
        next()
    }
};

module.exports.employeeDataValidation = employeeDataValidation;