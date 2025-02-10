const express = require("express")
const router = express.Router();

//Controler
const { register, login, GetCurrentUser } = require("../controllers/UserController")

//middlewares
const validate = require("../middlewares/handleValidation")
const { userCreateValidation, loginValidation } = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");

//routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, GetCurrentUser);

module.exports = router;