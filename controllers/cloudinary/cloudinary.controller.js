const express = require('express');
const cloudinary = require("../../config/cloudinary.config")
const router = express.Router();
const asyncHandler = require('express-async-handler');

const uploadImage = asyncHandler(async(req,res)=>{
    try {
        const imageFile = req.files.photo;
        const result = await cloudinary.uploader.upload(imageFile.tempFilePath,{
            folder:req.folderName
        })
        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports={uploadImage}