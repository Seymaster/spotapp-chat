const express = require("express");
const router  = express.Router();
// controller
const chatmessageController = require("../controllers/chatmessage");

// POST /send chat message
router.post("/message", chatmessageController.postMessage) 


module.exports = router;