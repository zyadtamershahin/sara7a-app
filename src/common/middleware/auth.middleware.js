import jwt from "jsonwebtoken"
import { env } from "../../config/env.service.js"
import { bad_request_exception } from "../exception/error.exception.js"


export const auth = (req, res, next) => {
    let [flag, token] = req.headers.authorization.split(" ")
    switch (flag) {
        case "basic":
            const basic_data = Buffer.from(token, "base64").toString()
            let [email, password] = basic_data.split(":")

            break;
        case "Bearer":
            let decoded = jwt.decode(token)
            let signiture
            switch (decoded.aud) {
                case "admin":
                    signiture = env.access_signiture_admin
                    break;
                case "user":
                    signiture = env.access_signiture_user
                    break;
            }
            let decoded_data = jwt.verify(token, signiture)
            console.log(decoded_data)
            if (decoded_data) {
                req.user = decoded_data
                next()
            } else {
                throw bad_request_exception({ message: "Invalid token" })
            }
    }
}