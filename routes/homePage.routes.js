const express = require('express');
const router = express.Router();
const {getWeddingHomePage,getHouseWarmingHomePage} = require("../controllers/homepage/homePage.controller")

router.get("/getWeddingHomePage",getWeddingHomePage);
router.get("/getHouseWarmingPage",getHouseWarmingHomePage)

module.exports = router;