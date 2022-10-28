const express = require('express');
const router = express.Router();
const {postCreatorPage,approveWeddingInvitation} = require("../controllers/wedding/creator.controller")
const {getWeddingInvitation} = require("../controllers/wedding/invitation.controller")

router.post("/postCreator",postCreatorPage);
router.get("/getWeddingInvitation",getWeddingInvitation);

//! Wedding Invitation API for ALIKA admin
router.post('/approveInvitation',approveWeddingInvitation)

module.exports = router;