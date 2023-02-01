const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const prodLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            json()
        ),
        transports: [
            new transports.Console(),
            new transports.File({
                filename: 'errors.log'
            })
        ]
    });
}

module.exports = prodLogger;