const { body } = require('express-validator');
const { userModel } = require("../model");

const usernameValidation = body("username")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username should be between 4 and 20 symbols!");

const uniqueUsernameValidation = body('username').custom(value => {
    return userModel.findOne({ username: value }).then(user => {
        if (user) {
            return Promise.reject('User with that username already exists!');
        }
    });
});

const newUsernameValidation = body('username').custom((value, { req }) => {
    return userModel.findOne({ username: value }).then(user => {
        if (user && (req.user.userId !== user._id)) {
            return Promise.reject('User with that username already exists!');
        }
    });
});

const emailValidation = body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email should be valid!");

const uniqueEmailValidation = body('email').custom(value => {
    return userModel.findOne({ email: value }).then(user => {
        if (user) {
            return Promise.reject('User with that e-mail already exists!');
        }
    });
});

const newEmailValidation = body('email').custom((value, { req }) => {
    return userModel.findOne({ email: value }).then(user => {
        if (user && (req.user.userId !== user._id)) {
            return Promise.reject('User with that e-mail already exists!');
        }
    });
});

const passwordValidation = body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password should be between 6 and 20 symbols!");

const repeatPasswordValidation = body('repeatPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        return Promise.reject('Passwords don\'t match!');
    }
    return Promise.resolve(null);
});

const transactionValidation = body("transaction")
    .isFloat({ min: 1, max: 3000000 })
    .withMessage("Transaction value should be between 1 and 3 000 000!");

module.exports = {
    "register": [usernameValidation, uniqueUsernameValidation, emailValidation, uniqueEmailValidation, passwordValidation, repeatPasswordValidation],
    "login": [usernameValidation, passwordValidation],
    "edit": [usernameValidation, newUsernameValidation, emailValidation, newEmailValidation],
    "transfer": [transactionValidation]
}