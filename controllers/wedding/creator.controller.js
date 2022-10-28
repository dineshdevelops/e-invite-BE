const express = require('express');
const asyncHandler = require('express-async-handler');
const WeddingCreator = require("../../models/wedding/WeddingCreator.model")

const postCreatorPage = asyncHandler(async(req,res)=>{
    const weddingRes = await WeddingCreator.create(req.body);
    console.log(weddingRes)
    res.status(200).json({message:"Successfully Created your Invitation wait for approval",weddingRes})
})

module.exports = {postCreatorPage}