import { request_model } from "../../connection/model/request.model.js";
import { message_model } from "../../connection/model/message.model.js";
import { bad_request_exception, not_found_exception, unauthorized_exception } from "../../common/exception/error.exception.js";
import { conversation_model } from "../../connection/model/conversation.model.js"



export const request_sender_identity = async (body, user) => {
    let { message_id } = body;
    let message = await message_model.findById(message_id).select("+senderID");
    if (!message) {
        throw not_found_exception({ message: "Message not found" });
    }
    if (message.reciverID.toString() !== user.id) {
        throw unauthorized_exception({ message: "You are not authorized to request identity for this message" });
    }
    if (!message.senderID) {
        throw bad_request_exception({ message: "Cannot request identity for an unauthenticated guest message" });
    }
    let existing_request = await request_model.findOne({ message_id });
    if (existing_request) {
        throw bad_request_exception({ message: "Identity request already sent for this message" });
    }
    let request = await request_model.create({
        message_id,
        sender_id: message.senderID,
        receiver_id: user.id,
        status: "pending"
    });

    return { message: "Identity request sent successfully", request };
};

export const get_my_requests = async (user) => {
    let requests = await request_model.find({ sender_id: user.id })
        .populate("message_id", "content image createdAt")
        .populate("receiver_id", "name email profile_image unique_name");

    if (requests.length == 0) {
        throw not_found_exception({ message: "No requests found" });
    }

    return { message: "Requests found successfully", requests };
}

export const handle_request_status = async (user, requestId, status) => {
     
    if (!["accepted", "rejected"].includes(status)) {
        throw bad_request_exception({ message: "Invalid status. Use 'accepted' or 'rejected'." });
    }

    let request = await request_model.findById(requestId);
    if (!request) {
        throw not_found_exception({ message: "Request not found" });
    }

    if (request.sender_id.toString() !== user.id) {
        throw unauthorized_exception({ message: "You are not authorized to respond to this request" });
    }

    if (request.status !== "pending") {
        throw bad_request_exception({ message: `Request is already ${request.status}` });
    }
    request.status = status;
    await request.save();
    if (status === "accepted") {
        let existing_conv = await conversation_model.findOne({ message_id: request.message_id });
        if (!existing_conv) {
            await conversation_model.create({
                message_id: request.message_id,
                participants: [request.sender_id, request.receiver_id]
            });
        }
    }

    return { message: `Request ${status} successfully`, request };
};

