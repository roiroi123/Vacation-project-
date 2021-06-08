const config = require('../config.json');
const jwt = require('jsonwebtoken');

// Extracting the text from the secret's JSON
const { secret } = config;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log(user);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {authenticateJWT}