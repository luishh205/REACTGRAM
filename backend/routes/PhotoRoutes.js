const express = require("express");
const router = express.Router();

const { insertPhoto } = require("../controllers/PhotoController");

const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/ImageUpload");
const validate = require("../middlewares/handleValidation");
const { photoInsertValidation } = require("../middlewares/photoValidation");

router.post(
    "/",
    authGuard, 
    imageUpload.single("image"),
    photoInsertValidation(),
    validate,
    insertPhoto
)


module.exports = router;