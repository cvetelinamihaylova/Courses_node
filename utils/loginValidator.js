const { body } = require('express-validator');

module.exports = [
    body('username', 'Username should consist only english letters and digits!').isAlphanumeric(),
    body('username', 'Username should be at least 5 characters long!').isLength({ min: 5 }),
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 }),
];