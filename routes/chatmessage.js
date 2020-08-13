const express = require("express");
const router  = express.Router();
// controller
// const chatmessageController = require("../controllers/chatmessage");

// POST /send chat message
router.get("/message", (req,res,next)=>{
    console.log("Socket is opened")
    res.status(200).send({
        status: 200,
        message: "Socket is opened"
    })
})


module.exports = router;