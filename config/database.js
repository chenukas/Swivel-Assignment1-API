const mongoose = require('mongoose');
const config = require('.');

const connectDatabase = async () => {
    try {
        await mongoose.connect(config.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database is connected');
    } catch (error) {
        console.log('Database connection failed', error);
        process.exit(1);
    }
}

module.exports = connectDatabase;