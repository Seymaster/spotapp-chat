const express = require("express");
const cors    = require("cors");
const logger  = require("morgan");
const mongoose = require("mongoose");
const http     = require("http");
const app      = express();
const PORT     = process.env.PORT || 8080;
const mongo    = require("./configs/mongo");
const chatmessageRouter = require("./routes/chatmessage");
const { format } = require("path");


mongoose.Promise = global.Promise;


app.set('port', PORT);


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use("/", chatmessageRouter);

mongoose.connect(mongo.dbUrl,
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(()=>{
        console.log("connected to db")
    })
    .catch(err =>{
        console.log(err)
    });

app.use('*',(req,res,next)=>{
    return res.status(404).send({
        success: false,
        message: "API endpoint doesnt exist"
    })
})


const server = http.createServer(app).listen(PORT, ()=>{
    console.log("Express server listening on port " + PORT);
});

const io    = require("socket.io").listen(server);

let users = []

// Handles socket traffic
io.on("connection", (socket) =>{
    
    socket.on('connect', ()=>{
        console.log("New connection to socket: ",socket.io)
    });
    

    socket.on("chat", data =>{
        console.log(data)
        const user = getCurrentUser(socket.id);
        io.to(user.id).emit("chatmessage", format(user.username,data))
    })
});



