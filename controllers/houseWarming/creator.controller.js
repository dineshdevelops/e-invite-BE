const express = require('express');
const asyncHandler = require('express-async-handler');
const HouseWarmingCreator = require("../../models/houseWarming/HouseWarmingCreator.model")
const {generateToken} = require("../authentication/authentication.controller")
const VerfiyToken = require('../../models/verifyToken.model');
const {sendVerificationEmail} = require("../../controllers/authentication/nodemail.controller")

const postCreatorPage =asyncHandler(async(req,res)=>{
        const houseWarmingRes = await HouseWarmingCreator.create(req.body);
        // console.log(houseWarmingRes)
        const invitationId = houseWarmingRes._id;
        const emailId = houseWarmingRes.emailId;

        //Create Verify Token
        const token = await new VerfiyToken({
            invitationId: invitationId,
            token:generateToken(invitationId)
        }).save();
        console.log(token)
        const verifyUrl = `http://localhost:${process.env.port}/api/houseWarming/${token.invitationId}/verify/${token.token}`
        const emailRes = await sendVerificationEmail(emailId,verifyUrl);
        res.status(200).json({message:"Successfully Created your Invitation wait for approval",houseWarmingRes});    
});

const verifyInvitation = asyncHandler(async(req,res)=>{
    const {invitationId,token} = req.params;
    //Check the token
    try {
        const verifyToken = await VerfiyToken.findOne({
            invitationId: invitationId,
            token:token
        });
        // ! If token is invalid / expired
        if(!verifyToken){
            res.status(400).json({message: "Invalid Link"});
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Invalid Link"});
    }
    //update isVerified
    try {
        const verifyRes = await HouseWarmingModel.updateOne({_id:invitationId,isVerified:true});
        await verifyToken.remove()
        res.status(200).json({message:"User Verified"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Unable to verify User"});
    }
})
module.exports = {postCreatorPage,verifyInvitation}