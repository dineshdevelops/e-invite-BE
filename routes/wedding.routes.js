const express = require('express');
const router = express.Router();
const {postCreatorPage} = require("../controllers/wedding/creator.controller")

router.post("/postCreator",postCreatorPage);

module.exports = router;