const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");


const insertPhoto = async(req, res)=>{
    const { title } = re.body;
    const image = req.file.filename;

    const reqUser = req.user

    const user = await User.findByid(reqUser._id)

    const newPhoto = await Photo.create({
        image,
        title,
        userId:user._id,
        userName: user.name,
    })

    if(!newPhoto){
        res.status(422).json({
            erros:["Houve um problema, por favor tente novamente mais tarde."]
        })
    }

    res.status(201).json(newPhoto);
}

module.exports = {
    insertPhoto,
};