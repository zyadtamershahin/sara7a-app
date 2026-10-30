import { Router } from "express";
import { creat_url, get_all_messages, get_user_data, get_user_messages, send_message } from "./message.service.js";
import { succses_response } from "../../common/exception/sucsses.response.js";
import { check_role } from "../../common/middleware/checkRole.js";
import { auth } from "../../common/middleware/auth.middleware.js";
import { upload } from "../../common/middleware/multer.js";


const router=Router()



router.get("/get-all-messages",auth ,check_role(['1']), async(req,res)=>{
    const data = await get_all_messages()
    succses_response({res,data})
})

router.post("/create-message",upload().single('image'),async(req,res)=>{
    let data = await send_message(req.body,req.file)
    succses_response({res,message:"message sent",status:201,data})
})


router.get("/user-url",auth,async(req,res)=>{
    let data = await creat_url(req.user)
    succses_response({res,data})
})

router.get("/user", async(req,res)=>{
    let data = await get_user_data(req.body)
    succses_response({res,data})
})

router.get("/get-user-messages",auth,async(req,res)=>{
    let data = await get_user_messages(req.user)
    succses_response({res,message:"messages found",data})
})

export default router