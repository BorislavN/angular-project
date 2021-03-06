const { body } = require('express-validator');

const makeValidation = body("make")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Car make must be between 1 and 20 symbols!");

const modelValidation = body("model")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Car model must be between 1 and 20 symbols!");

const yearValidation = body("year")
    .isInt({ min: 1910, max: new Date().getFullYear() })
    .withMessage("Car year must be between 1910 and now!");

const milesValidation = body("miles")
    .isInt({ min: 0, max: 500000 })
    .withMessage("Car miles must be between 0 and 500 000!");

const powertrainValidation = body("powertrain")
    .trim()
    .isIn(["Gasoline", "Diesel", "Hybrid", "Electric"])
    .withMessage("Car powertrain type is invalid!");

const transmissionValidation = body("transmission")
    .trim()
    .isIn(["Manual", "Automatic"])
    .withMessage("Car transmission type is invalid!");

const picturesValidation = body("pictures")
    .isArray({ min: 1, max: 3 })
    .withMessage("You need to add between 1 and 3 pictures of your car!");

module.exports = {
    "add": [makeValidation, modelValidation, yearValidation, milesValidation, powertrainValidation, transmissionValidation, picturesValidation],
    "edit": [makeValidation, modelValidation, yearValidation, milesValidation, powertrainValidation, transmissionValidation]
}