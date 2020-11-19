const { User } = require('../models');
const { jwt, formValidator } = require('../utils');
const { cookie } = require('../config');

module.exports = {
    get: {
        login(req, res, next) {
            res.render('./user/login.hbs')
        },
        register(req, res, next) {
            res.render('./user/register.hbs')
        },
        profile(req, res, next) {
            res.render('./user/profile.hbs')
        },

        logout(req, res, next) {
            res
                .clearCookie(cookie)
                .redirect('/home/');
        }
    },

    post: {
        register(req, res, next) {

            const validationErrors = formValidator(req);
            if (!validationErrors.isOk) {
                res.render('./user/register.hbs', validationErrors.contextOptions);
                return;
            }

            const { username, password } = { ...req.body };
            User
                .findOne({ username })
                .then((user) => {
                    if (user) {
                        throw new Error('The given username is already in use...');
                    }
                    return User.create({ username, password })
                })
                .then((createdUser) => {
                    res.redirect('/user/login');
                })
                .catch((e) => {
                    console.log(e);
                    res.redirect('/user/register');
                });

        },

        login(req, res, next) {
            const validationErrors = formValidator(req);
            if (!validationErrors.isOk) {
                res.render('./user/login.hbs', validationErrors.contextOptions);
                return;
            }

            const { username, password } = req.body;

            User
                .findOne({ username })
                .then((user) => {
                    return Promise.all([
                        user.comparePasswords(password),
                        user,
                    ])
                })
                .then(([isPasswordsMatched, user]) => {
                    if (!isPasswordsMatched) {
                        res.render('./user/login.hbs', { message: 'Wrong username or password' });
                        return;
                    }

                    const token = jwt.createToken(user._id);

                    res
                        .cookie(cookie, token)
                        .redirect('/home');

                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
};
