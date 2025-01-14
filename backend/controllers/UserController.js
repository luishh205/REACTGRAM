const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET;

//gerar token
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret,{
        expiresIn:"7d",
    });
};

//registrar user
const register = async(req, res) => {
    
const {name, email, password} = req.body

// checar se o user existe
const user = await User.findOne({email})
if(user){
    res.status(422).json({errors: ["Por favor, utilizar outro email"]})
    return
}

//gerar a hast da senha
const salt = await bcrypt.genSalt()
const passwordHash = await bcrypt.hash(password, salt)

//criar user 
const newUser = await User.create({
    name,
    email,
    password: passwordHash
})

//checar se user foi criado com success
if(!newUser){
    res.satus(422).json({erros:["Houve um erro, por favor contrate o suporte!"]})
    return
}

res.status(201).json({
    _id: newUser.id,
    token: generateToken(newUser._id),
});
};

//login
const login = async( req, res ) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        res.status(404).json({erros:["Usuário não encontrado."]})
        return
    }

    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({erros:["Senha inálida"]})
        return
    }

    res.status(201).json({
        _id: user.id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });

}

module.exports = {
   register,
   login,
};