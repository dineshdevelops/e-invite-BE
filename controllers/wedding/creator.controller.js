const express = require('express');
const asyncHandler = require('express-async-handler');
const WeddingCreator = require("../../models/wedding/WeddingCreator.model")
const {generateToken} = require("../authentication/authentication.controller")
const VerfiyToken = require('../../models/verifyToken.model');
const {sendVerificationEmail} = require("../../controllers/authentication/nodemail.controller")

const postCreatorPage = asyncHandler(async(req,res)=>{
    console.log("PostCreator Page")
    const weddingRes = await WeddingCreator.create(req.body);
    const invitationId = weddingRes._id;
    const emailId = weddingRes.emailId;
    //Create Verify Token
    const token = await new VerfiyToken({
        invitationId: invitationId,
        token:generateToken(invitationId)
    }).save();
    const verifyUrl = `http://localhost:${process.env.port}/api/wedding/${token.invitationId}/verify/${token.token}`
    const emailRes = await sendVerificationEmail(emailId,verifyUrl);
    res.status(200).json({message:"Successfully Created your Invitation wait for approval",weddingRes})
})

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
        const verifyRes = await WeddingCreator.updateOne({_id:invitationId,isVerified:true});
        await verifyToken.remove()
        res.status(200).json({message:"User Verified"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Unable to verify User"});
    }
})

// const approveWeddingInvitation = asyncHandler(async(req,res)=>{
//     const {invitationId,userId,emailId}=req.body;
//     const weddingCreatorRes = await WeddingCreator.updateOne({_id:invitationId , isApproved:true})
//     const invitationUrl = `http://localhost:${process.env.UI_PORT}/wedding/${invitationId}`
//     const emailRes = await sendWeddingInvitationApproveEmail(emailId,invitationUrl)
//     res.status(200).json({message:"Wedding Invitation has be Approved"})
// })
module.exports = {postCreatorPage,verifyInvitation}