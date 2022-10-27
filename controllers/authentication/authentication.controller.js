const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userSchema.model');

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
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
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

const dummyUser = asyncHandler(async(req,res)=>{
    res.json({message:"SECURE API ACCESS"});
})

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
}

module.exports = {registerUser,loginUser,dummyUser}