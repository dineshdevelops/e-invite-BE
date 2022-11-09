const express = require('express');
const cloudinary = require("../../config/cloudinary.config")
const asyncHandler = require('express-async-handler');

const uploadImage = asyncHandler(async(req,res)=>{
    try {
        const imageFile = req.files.photo;
        const result = await cloudinary.uploader.upload(imageFile.tempFilePath,{
            folder:"MarriageInvite"
        })
        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

const deleteImage = asyncHandler(async(req,res)=>{
    const {imgUrl}=req.body;
    //Get the public Id from the URL
    const imgArr = imgUrl.split('/').slice(-2);
    //Remove .jpg extension
    const publicId = imgArr[0]+"/"+imgArr[1].split('.')[0];
    const deleteImage = await cloudinary.uploader.destroy(publicId);
    res.status(200).json(deleteImage)
})

module.exports={uploadImage,deleteImage}