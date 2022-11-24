const express = require('express');
const router = express.Router();
const {uploadImage,deleteImage,uploadVideo,deleteVideo} = require("../controllers/cloudinary/cloudinary.controller")
const uploader = require("../middleware/multer.middleware");


router.post("/uploadImage",uploader.single('file'),uploadImage);
router.post("/deleteImage",deleteImage);
router.post("/uploadVideo",uploader.single('file'),uploadVideo);
router.post("/deleteVideo",deleteVideo)

module.exports=router;