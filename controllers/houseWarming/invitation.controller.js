const express = require('express');
const asyncHandler = require('express-async-handler');
const HouseWarmingCreator = require("../../models/houseWarming/HouseWarmingCreator.model");

const getHouseWarmingCreator = asyncHandler(async(req,res)=>{
    const invitationId = req.query.id;
    console.log(invitationId)
    const houseWarmingData = await HouseWarmingCreator.findOne({_id:invitationId});
    res.status(200).json(houseWarmingData)
})

module.exports={getHouseWarmingCreator}