const jwt = require('./jwt');
const auth = require('./auth');
const registerValidator = require('./registerValidator');
const loginValidator = require('./loginValidator');
const formValidator = require('./formValidator');
const isAuthNeeded = require('./check-auth');
const editCourseValidator = require('./editCourseValidator');
const courseValidator = require('./courseValidator');


module.exports = {
    jwt,
    registerValidator,
    loginValidator,
    formValidator,
    isAuthNeeded,
    editCourseValidator,
    courseValidator,
    auth
};