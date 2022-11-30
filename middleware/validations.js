const Joi = require('joi');

const employeeDataValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(6).max(10).required(),
        last_name: Joi.string().min(6).max(10).required(),
        email: Joi.string().required().email(),
        number: Joi.string().regex(/^(?:\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/),
        gender: Joi.string().max(1).required(),
    });
    return schema.validate(data);
};

module.exports.employeeDataValidation = employeeDataValidation;