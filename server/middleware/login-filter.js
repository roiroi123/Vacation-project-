const expressJwt = require('express-jwt');
const config = require('../config.json');

// Extracting the text from the secret's JSON
const { secret } = config;

const authenticateJwtRequestToken = () => {
  // Load secret into
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/users/login',
      '/users/',
    ],
  });
};

module.exports = authenticateJwtRequestToken;
