const { body } = require('express-validator');
const { User } = require('../models');

module.exports = [
    body('username').custom(checkUsernameExistence),
    body('username', 'Username should consist only english letters and digits!').isAlphanumeric(),
    body('username', 'Username should be at least 5 characters long!').isLength({ min: 5 }),
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 }),
    body('repeatPassword').custom(repeatPasswordCheck)
];

function repeatPasswordCheck(repeatPass, { req }) {
    if (repeatPass !== req.body.password) {
        throw new Error('Repeat password does not match with password');
    }
    return true;
};

function checkUsernameExistence(value) {
    return User.findOne({ username: value }).then(user => {
        if (user) {
            throw new Error('Username already in use');
        }
    });
};
