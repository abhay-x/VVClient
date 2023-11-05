const logger = require('./logger');

// Create an object to store request counts for each IP address
const requestCounts = {};
const rateLimiter = (req, res) => {
    try {
        // Define the rate limiting settings
        const maxRequestsPerWindow = 10000;
        // Get the client's IP address
        const clientIp = req.connection.remoteAddress;
        // Initialize the request count for this IP if not already set
        requestCounts[clientIp] = requestCounts[clientIp] || 0;
        logger.info(`Incoming request IP: ${clientIp}, requestCounts: ${JSON.stringify(requestCounts, null, 0)}`);

        // Check if the request count exceeds the limit
        if (requestCounts[clientIp] >= maxRequestsPerWindow) {
            res.writeHead(429, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Too many requests. Please try again later.' }));
            return;
        }
        // Increment the request count for this IP
        requestCounts[clientIp]++;
    } catch (error) {
        logger.error(error.stack);
    }
}
// Periodically reset request counts to prevent memory leaks
setInterval(() => {
    Object.keys(requestCounts).forEach((ip) => {
        requestCounts[ip] = 0;
    });
}, 900000); // for 15 min = 15*60*1000

module.exports = rateLimiter;