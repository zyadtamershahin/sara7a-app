import mongoose, { Types } from "mongoose";

const conversation_schema =  mongoose.Schema({
    message_id: {
        type: Types.ObjectId,
        required: true,
        ref: "message",
        unique: true
    },
    participants: [{
        type: Types.ObjectId,
        ref: "user",
        required: true
    }]
}, {
    timestamps: true
});

export const conversation_model = mongoose.model("conversation", conversation_schema);