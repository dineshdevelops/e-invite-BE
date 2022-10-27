const express = require('express');
const router = express.Router();
const {uploadImage} = require("../controllers/cloudinary/cloudinary.controller")

router.post("/uploadImage",uploadImage);

module.exports=router;