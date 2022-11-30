require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || '5000',
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    ENV: process.env.ENV || 'production'
}