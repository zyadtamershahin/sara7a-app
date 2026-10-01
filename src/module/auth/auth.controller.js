import { Router } from "express"
import { signin, signup } from "./auth.service.js"

const router = Router()

router.post("/signup", async (req, res) => {
    let data = await signup(req.body)
    res.json(data)
})

router.post("/login", async (req, res) => {
    let data = await signin(req.body)
    res.json(data)
})





export default router