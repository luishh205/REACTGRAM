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
    res.send("registro")
};

module.exports = {
   register 
};