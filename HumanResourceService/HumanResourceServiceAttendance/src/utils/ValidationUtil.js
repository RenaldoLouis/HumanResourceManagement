const { body, param } = require('express-validator');

// Define validation rules for creating a user
const bodyUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Invalid email address'),
];

const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('password is required'),
    body('role').notEmpty().withMessage('role is required'),
    body('gender').notEmpty().withMessage('gender is required'),
    body('religion').notEmpty().withMessage('religion is required'),
    body('security_number').notEmpty().withMessage('security_number is required'),
    body('age').notEmpty().withMessage('age is required'),
    body('birth_date').notEmpty().withMessage('birth_date is required'),
];

const loginValidation = [
    body('email').notEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('password is required'),
];

const idUserValidation = [
    param('id', 'id must be number!').isNumeric(),
    param('id', 'id has to be filled!').notEmpty(),
];


module.exports = {
    bodyUserValidation,
    idUserValidation,
    registerValidation,
    loginValidation
}

