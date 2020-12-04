const { body } = require('express-validator');

const textCheck = body("text")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Your comment must me between 1 and 500 symbols!");

module.exports = [textCheck];