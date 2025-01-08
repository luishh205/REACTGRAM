const express = require("express")
const router = express.Router();

//Controler
const { register } = require("../controllers/UserController")

router.post("/register", register);

module.exports = router;