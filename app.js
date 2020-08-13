const express = require("express");
const cors    = require("cors");
const logger  = require("morgan");
const mongoose = require("mongoose");
const http     = require("http");
const app      = express();
const mongo    = require("./configs/mongo");
const chatmessageRouter = require("./routes/chatmessage");
const path = require("path");


mongoose.Promise = global.Promise;



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
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


const server = http.createServer(app)
const io    = require("socket.io").listen(server);


let users = []
// Handles socket traffic
io.on("connection", (socket) =>{
    console.log("New Connection")
    socket.on('connect', ()=>{
        console.log("New connection to socket: ", socket.id)
    });

    socket.on('welcome', (data)=>{
        chatModel.save(data)
        console.log("Welcome", data, socket.id)
    });
    

    socket.on("chat", data =>{

        console.log(data)
        socket.emit("new-message", )
    })
});


const PORT     = process.env.PORT || 8080;

server.listen(PORT, ()=>{
    console.log("Express server listening on port " + PORT);
});

