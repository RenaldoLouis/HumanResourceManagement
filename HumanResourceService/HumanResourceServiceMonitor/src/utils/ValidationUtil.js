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

