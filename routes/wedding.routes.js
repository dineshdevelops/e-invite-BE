const express = require('express');
const router = express.Router();
const {postCreatorPage,verifyInvitation} = require("../controllers/wedding/creator.controller")
const {getWeddingInvitation} = require("../controllers/wedding/invitation.controller")

router.post("/postCreator",postCreatorPage);
router.get("/getWeddingInvitation",getWeddingInvitation);
//Verify the invitation
router.get("/:invitationId/verify/:token",verifyInvitation)
//! Wedding Invitation API for ALIKA admin
// router.post('/approveInvitation',approveWeddingInvitation)

module.exports = router;