const mongoose = require('mongoose');
const config = require('.');
const logger = require('../utils');

const connectDatabase = async () => {
    try {
        await mongoose.connect(config.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('Database is connected');
    } catch (error) {
        logger.error('Database connection failed:', error);
        process.exit(1);
    }
}

module.exports = connectDatabase;