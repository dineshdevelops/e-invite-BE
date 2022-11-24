const express = require('express');
const cloudinary = require("../../config/cloudinary.config")
const asyncHandler = require('express-async-handler');
const uploader = require("../../middleware/multer.middleware");

const uploadImage = asyncHandler(async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
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

const uploadVideo = asyncHandler(async(req,res)=>{
    console.log(req.file)
    const videoRes = await cloudinary.uploader.upload(req.file.path,{
        resource_type: "video",
        folder: "video",
      })
    console.log(videoRes)
    res.status(200).json(videoRes);
})

const deleteVideo = asyncHandler(async(req,res)=>{
    const {videoUrl}=req.body;
    //Get the public Id from the URL
    const videoArr = videoUrl.split('/').slice(-2);
    //Remove .mp4 extension
    const publicId = videoArr[0]+"/"+videoArr[1].split('.')[0];
    console.log(publicId)
    const deleteVideo = await cloudinary.uploader.destroy(publicId,{invalidate: true, resource_type: "video"});
    res.status(200).json(deleteVideo)
})

module.exports={uploadImage,deleteImage,uploadVideo,deleteVideo}