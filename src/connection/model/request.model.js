import mongoose, { Types } from 'mongoose';

const request_schema = mongoose.Schema({
    message_id: {
        type: Types.ObjectId,
        required: true,
        ref: "message"
    },
    sender_id: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    receiver_id: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true
});

export const request_model = mongoose.model('request', request_schema);