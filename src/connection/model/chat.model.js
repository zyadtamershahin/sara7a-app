import mongoose, { Types } from "mongoose";

const chat_message_schema = mongoose.Schema({
    conversation_id: {
        type: Types.ObjectId,
        required: true,
        ref: "conversation"
    },
    sender_id: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

export const chat_model = mongoose.model("chat", chat_message_schema);