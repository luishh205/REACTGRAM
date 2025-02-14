const {body} = require("express-validator")


const photoInsertValidation = () => {
    return [
        body("title")
        .not()
        .equals("undefined")
        .withMessage("o título é obrigatorio.")
        .isString()
        .withMessage("o título é obrigatorio.")
        .isLength({min: 3})
        .withMessage("o título precisa ter no minimo 3 caracteres."),
        body("image").custom((value, {req}) => {
            if(!req.file){
                throw new Error("A imagem é obrigatória.");
            }
            return true;
        })
    ]
}

module.exports = {
    photoInsertValidation,
};