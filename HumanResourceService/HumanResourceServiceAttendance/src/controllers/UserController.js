const { user } = require('../configs/DbConfig.js');
const db = require('../repositories/UserRepository.js');
const UserService = require('../services/UserService.js');
const helper = require('../utils/DataUtil.js');
const { validationResult } = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;

async function getUsers(req, res, next) {
    try {
        const users = await UserService.getUsers(req, next)
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(201).json(users);
        }
    } catch (err) {
        next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const users = await UserService.getByUserId(req, next)

        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(201).json(users);
        }
    } catch (err) {
        next(err);
    }
}

async function register(req, res, next) {
    try {
        const errorValidation = validationResult(req);
        if (errorValidation.errors.length > 0) {
            errorValidation.errors[0].statusCode = 400;
            return next(errorValidation.errors[0]);
        }

        const users = await UserService.getByUserEmail(req, next)
        if (users.length > 0) {
            return res.status(201).json({ message: "user already exist" });
        }

        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });

        let body = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: req.body.role,
        };

        const user = await UserService.createUser(body, next)
        res.status(200).send(user)
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const errorValidation = validationResult(req);
        if (errorValidation.errors.length > 0) {
            errorValidation.errors[0].statusCode = 400;
            return next(errorValidation.errors[0]);
        }

        const user = await UserService.createUser(req, next)
        res.status(200).send(user)
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const errorValidation = validationResult(req);
        if (errorValidation.errors.length > 0) {
            errorValidation.errors[0].statusCode = 400;
            return next(errorValidation.errors[0]);
        }

        const users = await UserService.updateUser(req, next)
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const users = await UserService.getByUserId(req, next)

        if (!users.length > 0) {
            return res.status(201).json({ message: "user does not exist" });
        }

        await UserService.deleteUserById(req, next);
        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getUsers,
    getUserById,
    create,
    register,
    update,
    remove,
};