// utils
const ChatMessageModel = require("../models/Chatmessage");

exports.postMessage = (req,res,next) =>{
    const recipientId = req.params;
    const message     = req.body.message
    const user        = req.userId
    const post = ChatMessageModel.create({recipientId, message, user})
    .then((data)=>{
        console.log(data);
        socket.emit('chat', data);
        res.status(200).send({
            status: 200,
            message: data
        })
    })
    .catch(err =>{
        console.log(err)
    });
};