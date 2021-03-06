const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbUrl: 'mongodb://localhost:27017/Courses',
        cookie: 'x-auth-token',
        secret: 'SuperSecretSecret',
        saltRounds: 11
    }
};

module.exports = config[env];
3