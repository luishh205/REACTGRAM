const {validationResult} = require("express-validator")

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        return next()
    }

    const extracteErros = [];

    errors.array().map((err) => extracteErros.push(err.msg))

    return res.status(422).json({
        errors: extracteErros
    });
};

module.exports = validate;
