const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userSchema.model');
const HouseWarmingModel = require("../../models/houseWarming/HouseWarmingCreator.model")
const VerfiyToken = require('../../models/verifyToken.model');
const {sendVerificationEmail} = require("../../controllers/authentication/nodemail.controller");


const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,mobileNumber}=req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already Exists')
    }
    // !Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    // Create User
    const user = await User.create({
        name,
        email,
        mobileNumber,
        password:hashedPassword,
        isVerified:false
    })
    if(user){
        const token = await new VerfiyToken({
            userId: user._id,
            token:generateToken(user._id)
        }).save();
        const verifyUrl = `http://localhost:${process.env.port}/api/authentication/${token.userId}/verify/${token.token}`
        const emailRes = await sendVerificationEmail(user.email,verifyUrl);
        res.status(200).json({message:"Verification Email has been sent.Please check your mail box",verifyUrl:verifyUrl,emailResponse:emailRes})
    }
    else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid Credentials')
    }
})

// const verifyUser = asyncHandler(async(req,res)=>{
//     const {userId,token} = req.params;
//     const user = await User.findOne({_id:userId});
//     const verifyToken = await VerfiyToken.findOne({
//         userId: userId,
//         token:token
//     });
//     // ! If userNot found or token is invalid / expired
//     if(!user || !token){
//         res.status(400).json({message: "Invalid SignUp Link"});
//     }
//     const userRes = await User.updateOne({_id:userId,isVerified:true});
//     await verifyToken.remove();
//     res.status(200).json({message:"User Verified"})
// })
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

const dummyUser = asyncHandler(async(req,res)=>{
    res.json({message:"SECURE API ACCESS"});
})

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
}

module.exports = {registerUser,loginUser,verifyInvitation,dummyUser,generateToken}