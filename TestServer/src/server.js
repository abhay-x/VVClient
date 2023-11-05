const http = require('http');
const cors = require('cors');
const bcrypt = require('bcrypt');
const logger = require('./logger');
const rateLimiter = require('./rateLimiter');
const tokenWorker = require('./tokenWorker');

const saltRounds = 10; // Number of salt rounds for bcrypt
const registeredUsers = [];
const loggedInUsers = {};
let currentUserId = 1;
const port = 8080;

function generateUsername(name) {
  const normalizedName = name.toLowerCase().replace(/\s/g, '');
  const existingUsernames = registeredUsers.map((user) => user.username);
  logger.debug(existingUsernames);
  if (!existingUsernames.includes(normalizedName)) {
    return normalizedName;
  }

  // If it's in use, generate a unique username by appending numbers
  let username = normalizedName;
  let counter = 568;
  while (existingUsernames.includes(username)) {
    username = `${normalizedName}${counter}`;
    counter++;
  }

  return username;
}

function isEmailTaken(email) {
  return registeredUsers.some((user) => user.email === email);
}

function getUserByEmail(email) {
  return registeredUsers.find((user) => user.email === email);
}
function getUserByUserName(username) {
  return registeredUsers.find((user) => user.username === username);
}

async function handleLogin(requestData) {
  try {
    const user = getUserByEmail(requestData.email);

    if (!user) {
      return [401, { error: 'Invalid email or password' }];
    }

    const isPasswordValid = await bcrypt.compare(requestData.password, user.password);

    if (!isPasswordValid) {
      return [401, { error: 'Invalid email or password' }];
    }

    const token = tokenWorker.generateToken({ username: user.username });

    const responseData = {
      username: user.username,
      name: user.name,
      email: user.email,
      token: token,
      bio: 'A web developer',
      avatar: 'avatar.jpg',
      tags: ['javascript', 'node.js'],
    };

    loggedInUsers[user.username] = token;
    console.log(registeredUsers);
    console.log(loggedInUsers);

    return [200, responseData];
  } catch (error) {
    logger.error('Error during login:', error.stack);
    return [500, { error: 'Internal server error' }];
  }
}

async function handleRegister(requestData) {
  try {
    if (isEmailTaken(requestData.email)) {
      return [401, { error: 'Email already exists' }];
    }

    const hashedPassword = await bcrypt.hash(requestData.password, saltRounds);

    const responseData = {
      name: requestData.name,
      email: requestData.email,
      bio: 'A web developer',
      avatar: 'avatar.jpg',
      tags: ['javascript', 'node.js'],
    };

    responseData.username = generateUsername(requestData.name);
    responseData.token = tokenWorker.generateToken({ username: responseData.username });
    loggedInUsers[responseData.username] = responseData.token;

    // Store the registered user data in memory, including the hashed password
    registeredUsers.push({
      ...responseData,
      userId: currentUserId,
      password: hashedPassword,
    });

    console.log(registeredUsers);
    console.log(loggedInUsers);

    currentUserId++;

    return [200, responseData];
  } catch (error) {
    logger.error('Error during registration:', error.stack);
    return [500, { error: 'Internal server error' }];
  }
}

async function handleLogout(req, res) {
  try {
    //const queryParameters = new URL(req.url, 'http://localhost:8080').searchParams;
    //const username = queryParameters.get('username'); // Get a query parameter named 'username'
    const [, , username, token] = req.url.split('/');
    logger.debug(username, token)
    const user = getUserByUserName(username);
    logger.debug("User:: ", user);

    // Validate the token
    const isValidToken = tokenWorker.validateToken(token);
    if (!isValidToken) {
      // If the token is not valid, return an error response
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Invalid token' }));
      return;
    }

    // Perform any necessary session cleanup or token invalidation here


    // Assuming the logout was successful, you can respond with a success message.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'success', message: 'Logout successful' }));
  } catch (error) {
    logger.error('Error during logout:', error.stack);
    res.statusCode = 500; // Internal Server Error
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}


// Common function to handle JSON parsing and response sending
async function handlePOSTRequest(req, res, callback) {
  let requestBody = '';
  req.on('data', (chunk) => {
    requestBody += chunk.toString();
  });

  req.on('end', async () => {
    try {
      logger.debug(requestBody);
      const requestData = JSON.parse(requestBody);
      const [statusCode, responseData] = await callback(requestData);
      logger.debug(responseData);
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(responseData));

    } catch (error) {
      logger.error(error.stack);
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON in the request body' }));
    }

    logger.info(`Sent response with status code ${res.statusCode}`);
  });
}

// HTTP server
const server = http.createServer(async (req, res) => {
  logger.info(`Incoming request for ${req.url} with method ${req.method}`);
  rateLimiter(req, res);

  try {
    // Handle OPTIONS preflight requests
    if (req.method === 'OPTIONS') {
      // Set appropriate CORS headers for the preflight request
      const corsOptions = {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Access-Control-Allow-Credentials'],
      };
      cors(corsOptions)(req, res, () => {
        res.writeHead(204);
        res.end();
      });
      return;
    }
    // Enable CORS for all routes by using the cors middleware
    cors()(req, res, () => { });

    // Define endpoint handlers
    const handlers = {
      '/login': {
        POST: handleLogin,
      },
      '/register': {
        POST: handleRegister,
      },
      '/logout': {
        GET: handleLogout,
      },
    };

    // Execute the appropriate handler based on the URL and request method
    const routeHandler = handlers[Object.keys(handlers).find((route) => req.url.startsWith(route))];
    if (routeHandler) {
      const handler = routeHandler[req.method];
      if (handler) {
        if (req.method === 'POST') {
          await handlePOSTRequest(req, res, handler);
        } else if (req.method === 'GET') {
          await handler(req, res);
        }
      } else {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      }
    } else {
      // Return a 404 Not Found response for other routes
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  } catch (error) {
    logger.error(error.stack);
  } finally {
    logger.debug(`${JSON.stringify(registeredUsers, null, 0)}`);
  }
});


server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});