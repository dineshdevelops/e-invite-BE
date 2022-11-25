const express = require('express');
const asyncHandler = require('express-async-handler');
const HouseWarmingCreator = require("../../models/houseWarming/HouseWarmingCreator.model")
const {generateToken} = require("../authentication/authentication.controller")
const VerfiyToken = require('../../models/verifyToken.model');
const {sendVerificationEmail,sendInvitationApproveEmail} = require("../../controllers/authentication/nodemail.controller")

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
    let verifyToken;
    //Check the token
    try {
        verifyToken = await VerfiyToken.findOne({
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
        const verifyRes = await HouseWarmingCreator.findByIdAndUpdate({_id:invitationId,isVerified:true});
        console.log(verifyRes)
        await verifyToken.remove()
        const invitationUrl = `http://localhost:${process.env.UI_PORT}/wedding/${invitationId}`;
        const emailId = verifyRes.emailId;
        const emailRes = await sendInvitationApproveEmail(emailId,invitationUrl);
        res.redirect(invitationUrl);
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Unable to verify User"});
    }
})
module.exports = {postCreatorPage,verifyInvitation}