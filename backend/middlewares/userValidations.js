const {body} = require("express-validator")

const userCreateValidation = () =>{
    return[
        body("name").isString().withMessage("O nome é obrigatorio.")
            .isLength({min: 3}).withMessage("O nome precisa ter no mínimo 3 caracteres."),
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatorio.")
            .isEmail()
            .withMessage("Insira um e-mail válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatoria.")
            .isLength({ min: 5 })
            .withMessage("O senha precisa ter no mínimo 5 caracteres."),
        body("confirmpassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .custom((value, { req })=>{
                if(value != req.body.password){
                    throw new Error("As senhas não são iguais.")
                }
                return true;
            }),
    ];
};

module.exports = {
    userCreateValidation,
};