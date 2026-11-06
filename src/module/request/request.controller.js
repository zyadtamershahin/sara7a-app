import Router from 'express'
import { auth } from '../../common/middleware/auth.middleware.js'
import { request_sender_identity,get_my_requests,handle_request_status } from './request.service.js'
import { succses_response } from '../../common/exception/sucsses.response.js'


const router=Router()

router.post("/request-identity",auth,async(req,res)=>{
    let data = await request_sender_identity(req.body,req.user)
    succses_response({ res, status: 201, data });
})

router.get("/get-requests", auth, async (req, res) => {
    let data = await get_my_requests(req.user);
    succses_response({ res, data });
});

router.patch("/requests/:id", auth, async (req, res) => {
    let { status } = req.body
    let data = await handle_request_status(req.user, req.params.id, status);
    succses_response({ res, data });
});




export default router