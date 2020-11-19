const { body } = require('express-validator');
const { Course } = require('../models');

module.exports = [
    body('title').custom(checkCourseExistence),
    body('title', 'Title should be at least 4 characters long!').isLength({ min: 4 }),
    body('description', 'Description should be at least 20 characters long').isLength({ min: 20 }),
    body('imageUrl').custom(checkImage)
];

function checkImage(value) {
    if (value.startsWith('http') || value.startsWith('https')) {
        return true;
    }
    throw new Error('The imageUrl should starts with http or https!');
};

function checkCourseExistence(value) {
    return Course.findOne({ title: value }).then(course => {
        if (course) {
            throw new Error('Course is already created!');
        }
    });
};
