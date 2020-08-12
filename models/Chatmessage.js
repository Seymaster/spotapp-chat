const mongoose = require("mongoose");
const Schema   = mongoose.Schema
const uuid     = require("uuid");
const uuidv4   = uuid.v4

const readByRecipientSchema = new Schema({
    id: false,
    readbyUserId: String,
    readAt: { type: Date, default: Date.now()}
    },
    {timestamps: false}
);

const chatMessageSchema = new Schema(
    {_id: {type: String, default: uuidv4},
    recipientId: String,
    message: Schema.Types.Mixed,
    type: {type: {type: String, default: ()=> 'text'},
    sentByUser: String,
    readByRecipient: [readByRecipientSchema]
    }
    },
    {timestamps: true,
    collection: "chatmessages" }
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);