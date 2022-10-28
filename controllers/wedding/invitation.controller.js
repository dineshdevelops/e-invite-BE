const express = require('express');
const asyncHandler = require('express-async-handler');
const WeddingCreator = require("../../models/wedding/WeddingCreator.model")

const getWeddingInvitation=asyncHandler(async(req,res)=>{
    const invitationId = req.query.id
    const weddingData = await WeddingCreator.findOne({_id:invitationId});
    res.status(200).json(weddingData);
})

module.exports = {getWeddingInvitation}