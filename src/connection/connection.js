import {env} from "../config/env.service.js"
import mongoose from "mongoose"





export const connection = () => {
    mongoose.connect(env.database_uri).then(() => {
        console.log("database connected")
    }).catch((err) => {
        console.log(err)
    })
}