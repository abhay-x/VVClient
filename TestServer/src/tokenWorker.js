const jwt = require('jsonwebtoken');
const secretKey = '12345';

function generateToken(data) {
  const token = jwt.sign(data, secretKey);
  return token;
}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Handle token validation errors here
    return null;
  }
}

module.exports = {
  generateToken,
  validateToken,
};
