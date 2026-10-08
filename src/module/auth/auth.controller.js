import { Router } from "express"
import { generate_access_token, get_by_id, login, signup } from "./auth.service.js"
import { auth } from "../../common/middleware/auth.middleware.js"

const router = Router()

router.post("/signup", async (req, res) => {
    let data = await signup(req.body)
    res.json(data)
})

router.post("/login",auth, async (req, res) => {
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

export default router