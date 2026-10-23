import express from "express"
import {env} from "./config/env.service.js"
import { connection } from "./connection/connection.js"
import user_router from "./module/auth/auth.controller.js"
import {fileURLToPath} from 'url'
import path from "path"
import { redis_connection } from "./connection/redis/redis.js"


const __filename=fileURLToPath(import.meta.url)
const __dirname =path.dirname(__filename)
const upload_path = path.resolve(__dirname,'../uploads')
const app=express()
app.use(express.json())
app.use("/users", user_router)
app.use("/uploads",express.static(upload_path))
export const client=await redis_connection()
connection()
app.use((err,req,res,next)=>{
    console.log(err)
    let stack=env.mood==="dev" ? err.stack: null
   const status=err.cause?err.cause.status : 500
    res.status(status).json({message:err.message ,stack:stack})
})



app.listen(env.port,()=>{
    console.log(`app is running on port ${env.port}`)
})