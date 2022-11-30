const employeeRouter = require('./employee.routes');

const init = (app) => {
    app.use(employeeRouter);
};

module.exports = init;