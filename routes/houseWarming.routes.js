const express = require('express');
const router = express.Router();
const {postCreatorPage} = require("../controllers/houseWarming/creator.controller");
const {getHouseWarmingCreator} = require("../controllers/houseWarming/invitation.controller")

router.post("/postCreator",postCreatorPage);
router.get("/getHouseWarmingData",getHouseWarmingCreator);

module.exports = router;