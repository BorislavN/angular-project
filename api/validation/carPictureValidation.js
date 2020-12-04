const { body } = require('express-validator');

module.exports = body("pictures")
    .isArray({ min: 1, max: 3 })
    .withMessage("You need to add between 1 and 3 pictures of your car!");