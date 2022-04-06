const { check } = require('express-validator');

exports.validateBooksData = [
    check('book')
    .not()
    .isEmpty()
    .withMessage('No data sent.')
    .isLength({ min: 600, max: 602 })
    .withMessage('Book data invalid.')
    .custom((value) => {
        if (value.match(/[^\[0,1\]]/)) {
          throw new Error('Book data invalid. Illegal character found in book data.');
        }
        return true;
    }),
];