import { Router } from "express";
import { auth } from "../../common/middleware/auth.middleware.js";
import { send_chat_message, get_chat_messages } from "./chat.service.js";
import { succses_response } from "../../common/exception/sucsses.response.js";
import { upload } from "../../common/middleware/multer.js";

const router = Router();

router.post("/:conversation_id/messages", auth, upload().single("image"), async (req, res) => {
    let data = await send_chat_message(req.user, req.params.conversation_id, req.body, req.file);
    succses_response({ res, status: 201, data });
});

router.get("/:conversation_id/messages", auth, async (req, res) => {
    let data = await get_chat_messages(req.user, req.params.conversation_id);
    succses_response({ res, data });
});

export default router;