const express = require('express');
const asyncHandler = require('express-async-handler');
const WeddingCreator = require("../../models/wedding/WeddingCreator.model")
const InvitationHomePage = require("../../models/homePage/InvitationHomePage.model");

const getWeddingHomePage = asyncHandler(async(req,res)=>{
    const homePageData = await InvitationHomePage.findOne({homePageName:"weddingHomePage"})
    res.status(200).json(homePageData)
})

const getHouseWarmingHomePage = asyncHandler(async(req,res)=>{
    const homePageData = await InvitationHomePage.findOne({homePageName:"houseWarmingHomePage"})
    res.status(200).json(homePageData);
})

module.exports = {getWeddingHomePage,getHouseWarmingHomePage}