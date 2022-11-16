const express = require('express');
const asyncHandler = require('express-async-handler');
const HouseWarmingCreator = require("../../models/houseWarming/HouseWarmingCreator.model")

const postCreatorPage =asyncHandler(async(req,res)=>{
    const houseWarmingRes = await HouseWarmingCreator.create(req.body);
    res.status(200).json({message:"Successfully Created your Invitation wait for approval",houseWarmingRes})
});

module.exports = {postCreatorPage}