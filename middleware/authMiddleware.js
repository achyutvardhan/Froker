const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) return res.status(401).send('No token, authorization denied');

    // Verify token
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send('Token is not valid');
    }
};