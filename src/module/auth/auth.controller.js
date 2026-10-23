import { Router } from "express"
import { generate_access_token, get_all_users, get_by_id, login, signup, verify_otp } from "./auth.service.js"
import { auth } from "../../common/middleware/auth.middleware.js"
import { user_login_schema } from "./auth.validation.js"
import { validation } from "../../common/services/validation.js"
import { check_role } from "../../common/middleware/checkRole.js"
import { upload } from "../../common/middleware/multer.js"
const router = Router()

router.post("/signup",upload().single('image'), async (req, res) => {
    let data = await signup(req.body,req.file)
    res.json(data)
})

router.post("/login", validation(user_login_schema), async (req, res) => {
    let data = await login(req.body)
    res.json(data)
})


router.get("/get-user-by-id", auth, async (req, res) => {
    let data = await get_by_id(req.params.id)
    res.json(data)
})

router.post("/generate-access-token", async (req, res) => {
    let data = await generate_access_token(req.body)
    res.json(data)
})
router.put("/verify-otp", async (req, res) => {
    let data = await verify_otp(req.body)
    res.json(data)
})

router.get("/get-all-users",auth,check_role(['1']), async (req,res)=>{
    let data =await get_all_users()
    res.json(data)
})
export default router