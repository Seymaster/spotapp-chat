const express = require("express");
const router  = express.Router();
// controller
// const chatmessageController = require("../controllers/chatmessage");

// POST /send chat message
router.post("/message", (req,res,next)=>{
    console.log("Socket is opened")
})


module.exports = router;