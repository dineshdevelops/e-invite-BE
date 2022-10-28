const express = require('express');
const router = express.Router();
const {postCreatorPage} = require("../controllers/wedding/creator.controller")
const {getWeddingInvitation} = require("../controllers/wedding/invitation.controller")

router.post("/postCreator",postCreatorPage);
router.get("/getWeddingInvitation",getWeddingInvitation);

module.exports = router;