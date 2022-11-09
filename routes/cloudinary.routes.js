const express = require('express');
const router = express.Router();
const {uploadImage,deleteImage} = require("../controllers/cloudinary/cloudinary.controller")

router.post("/uploadImage",uploadImage);
router.delete("/deleteImage",deleteImage);

module.exports=router;