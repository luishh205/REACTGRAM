const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")

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
    res.satus(422).json({errors:["Houve um erro, por favor contrate o suporte!"]})
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

    const user = await User.findOne({ email });

    if(!user){
        res.status(404).json({errors:["Usuário não encontrado."]})
        return
    }

    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors:["Senha inválida"]})
        return
    }

    res.status(201).json({
        _id: user.id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });

};

const GetCurrentUser = async (req, res)=>{
    const user = req.user;

    res.status(200).json(user);
};

const update = async (req, res) => {
  
    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if(name){
       user.name = name 
    }

    if(password){
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        
        user.password = passwordHash 
    }

    if(profileImage){
        user.profileImage = profileImage 
    }

    if(bio){
        user.bio = bio 
    }


    await user.save()

    res.status(200).json(user);
};

const getUserById = async(req,res) => {

    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ errors: ["Usuário não encontrado."] });
    }
    const user = await User.findById(id).select("-password");
    
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }

    res.status(200).json(user);
};

module.exports = {
   register,
   login,
   GetCurrentUser,
   update,
   getUserById,
};