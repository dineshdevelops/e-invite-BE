const express = require('express');
const asyncHandler = require('express-async-handler');
const WeddingCreator = require("../../models/wedding/WeddingCreator.model")
const {sendWeddingInvitationApproveEmail} = require("../../controllers/authentication/nodemail.controller")
const postCreatorPage = asyncHandler(async(req,res)=>{
    const weddingRes = await WeddingCreator.create(req.body);
    console.log(weddingRes)
    res.status(200).json({message:"Successfully Created your Invitation wait for approval",weddingRes})
})

const approveWeddingInvitation = asyncHandler(async(req,res)=>{
    const {invitationId,userId,emailId}=req.body;
    const weddingCreatorRes = await WeddingCreator.updateOne({_id:invitationId , isApproved:true})
    const invitationUrl = `http://localhost:${process.env.UI_PORT}/wedding/${invitationId}`
    const emailRes = await sendWeddingInvitationApproveEmail(emailId,invitationUrl)
    res.status(200).json({message:"Wedding Invitation has be Approved"})
})
module.exports = {postCreatorPage,approveWeddingInvitation}