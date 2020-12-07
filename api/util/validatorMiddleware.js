const { validationResult } = require('express-validator');

function checkForErrors(req, res, next) {
    const errorsSet = validationResult(req);

    if (errorsSet.isEmpty()) {
        next();
    }else{
        return res.status(400).json({ "message": "Some fields have invalid value!", "errors": errorsSet.array() });
    }
};

module.exports = checkForErrors;