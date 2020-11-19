const { body } = require('express-validator');

module.exports = [
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
