const express = require('express');
const router = express.Router();
const {registerUser,loginUser, dummyUser} = require("../controllers/authentication/authentication.controller");
const protectAPI = require('../middleware/auth.middleware');

router.post("/signUp",registerUser);
router.post("/login",loginUser);
router.get("/dummyUser",protectAPI,dummyUser)
module.exports=router