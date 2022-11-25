const express = require('express');
const router = express.Router();
const {postCreatorPage,verifyInvitation} = require("../controllers/houseWarming/creator.controller");
const {getHouseWarmingCreator} = require("../controllers/houseWarming/invitation.controller")

router.post("/postCreator",postCreatorPage);
router.get("/getHouseWarmingData",getHouseWarmingCreator);

//Verify the invitation
router.get("/:invitationId/verify/:token",verifyInvitation)


module.exports = router;