const { check } = require('express-validator');

exports.validateUsersPost = [
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email.'),
    check('password')
        .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('Password must be 6 to 70 characters long. It must contain at least one lowercase letter, one uppercase letter, one number and one special character.')
        .isLength({ max: 70 })
        .withMessage('Password must be 6 to 70 characters long!'),
];