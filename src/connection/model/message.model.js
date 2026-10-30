import mongoose, { Types } from "mongoose";





const message_schema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    reciverID: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    image: {
        type: String,
        required: false
    }

}, {
    timestamps: true
})

export const message_model = mongoose.model('message', message_schema)