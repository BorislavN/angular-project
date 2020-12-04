const { body } = require('express-validator');

const priceValidation = body("price")
    .isFloat({ min: 100, max: 5000000 })
    .withMessage("Price value must be between 100 and 5 000 000!");

const carIdValidation = body("carId")
    .trim()
    .isLength({ min: 1 })
    .withMessage("CarId can't be empty!");

const descriptionValidation = body("description")
    .optional()
    .trim()
    .isLength({ max: 750 })
    .withMessage("Description can't be more than 750 symbols!");

module.exports = [priceValidation, carIdValidation, descriptionValidation];