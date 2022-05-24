const { check } = require('express-validator');

exports.validateBooksData = [
    check('horusHeresy')
    .not()
    .isEmpty()
    .withMessage('No data sent.')
    .isLength({ min: 600, max: 602 })
    .withMessage('Book data invalid. horusHeresy.')
    .custom((value) => {
        if (value.match(/[^\[0,1\]]/)) {
          throw new Error('Book data invalid. Illegal character found in horusHeresy data.');
        }
        return true;
    }),
    check('inquisitors')
    .not()
    .isEmpty()
    .withMessage('No data sent. inquisitor.')
    .isLength({ min: 200, max: 202 })
    .withMessage('Book data invalid.')
    .custom((value) => {
        if (value.match(/[^\[0,1\]]/)) {
          throw new Error('Book data invalid. Illegal character found in inquisitor data.');
        }
        return true;
    }),
    check('imperialGuard')
    .not()
    .isEmpty()
    .withMessage('No data sent. imperialGaurd.')
    .isLength({ min: 200, max: 202 })
    .withMessage('Book data invalid.')
    .custom((value) => {
        if (value.match(/[^\[0,1\]]/)) {
          throw new Error('Book data invalid. Illegal character found in imperialGaurd data.');
        }
        return true;
    })
];