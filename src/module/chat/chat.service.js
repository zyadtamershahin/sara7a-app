import { conversation_model } from "../../connection/model/conversation.model.js";
import { chat_model } from "../../connection/model/chat.model.js";
import { bad_request_exception, not_found_exception, unauthorized_exception } from "../../common/exception/error.exception.js";

export const send_chat_message = async (user, conversation_id, body, file) => {
    let { content } = body;

    let conversation = await conversation_model.findById(conversation_id);
    if (!conversation) {
        throw not_found_exception({ message: "Conversation not found" });
    }

    if (!conversation.participants.map(p => p.toString()).includes(user.id)) {
        throw unauthorized_exception({ message: "You are not a participant in this conversation" });
    }

    let image = file ? file.path : undefined;

    let chat_message = await chat_model.create({
        conversation_id,
        sender_id: user.id,
        content,
        image
    });

    return { message: "Message sent successfully", chat_message };
};

export const get_chat_messages = async (user, conversation_id) => {
    let conversation = await conversation_model.findById(conversation_id);
    if (!conversation) {
        throw not_found_exception({ message: "Conversation not found" });
    }

    if (!conversation.participants.map(p => p.toString()).includes(user.id)) {
        throw unauthorized_exception({ message: "You are not a participant in this conversation" });
    }

    let messages = await chat_model.find({ conversation_id })
        .populate("sender_id", "name email profile_image unique_name")
        .sort({ createdAt: 1 });

    return { message: "Messages retrieved successfully", messages };
};