const winston = require('winston');
const { createLogger, format, transports } = winston;
const DailyRotateFile = require('winston-daily-rotate-file');

// Configure Winston logger
const logger = createLogger({
    level: 'info', // Log level
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json() // Log in JSON format
    ),
    transports: [
        // Log to the console
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
        }),

        // Log to daily rotating files
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '14d', // Keep logs for 14 days
            format: format.combine(
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
        }),
    ],
    exceptionHandlers: [
        // Log unhandled exceptions to a separate file
        new transports.File({ filename: 'logs/exceptions.log' }),
    ],
    exitOnError: false, // Continue after logging exceptions
});

// Example log messages
// logger.info('This is an information message.');
// logger.error('This is an error message.');

// Handle exceptions and log them
process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception:', error);
    // Handle the exception gracefully or exit the application
    // process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled promise rejection:`, reason);
    // Handle the rejection or exit the application
    // process.exit(1);
});

module.exports = logger;

// the level is set to 'info', which means that log messages with a severity level of 'info', 'warn', and 'error' will be recorded, but log messages with a severity level of 'debug' will be ignored.
// 'silly': The lowest log level, capturing all messages.
// 'debug': Debugging information useful for development.
// 'info': General information about the application's state.
// 'warn': Warnings or issues that should be addressed but do not necessarily indicate an error.
// 'error': Error messages indicating a problem that requires attention.
// 'fatal': The highest log level, reserved for critical errors that may cause the application to crash.