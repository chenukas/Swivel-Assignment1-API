const express = require('express');
const middleware = require('./middleware');
const connectDatabase = require('./config/database');
const routes = require('./routes');
const config = require('./config');
const logger = require('./utils')

const app = express();

middleware(app);

routes(app);

app.listen(config.PORT, () => {
    logger.info(`Server is running on ${config.PORT}`)
})

connectDatabase();

module.exports = app;