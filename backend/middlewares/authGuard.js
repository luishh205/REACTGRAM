const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).json({errors: ["Acesso negado!"]})

        const verified = jwt.verify(token, jwtSecret)

        
    try {
        
    } catch (error) {
        res.status(401).json({errors: ["Token inválido."]})
    }    
};

module.exports = authGuard;
    
