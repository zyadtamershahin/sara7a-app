import jwt from "jsonwebtoken"
import { env } from "../../config/env.service.js"


export const new_generate_access_token = (refresh_token) => {
    let data = jwt.decode(refresh_token)
    let signiture
    let aud
    let refresh_signiture
    switch (data.aud) {
        case "admin":
            signiture = env.access_signiture_admin
            refresh_signiture = env.refresh_signiture_admin
            aud = "admin"
            break;
        default:
            signiture = env.access_signiture_user
            refresh_signiture = env.refresh_signiture_user
            aud = "user"
            break;
    }
    let decoded_refresh_token = jwt.verify(refresh_token, refresh_signiture)
    let access_token = jwt.sign({ id: decoded_refresh_token._id }, signiture, { expiresIn: "30min", audience: aud })
    // let refresh_token = jwt.sign({ id: user._id }, refresh_signiture, { expiresIn: "1y", audience: aud })
    return { access_token }
}
export const generate_token = (user) => {
    let signiture
    let aud
    let refresh_signiture
    switch (user.role) {
        case "1":
            signiture = env.access_signiture_admin
            refresh_signiture = env.refresh_signiture_admin
            aud = "admin"
            break;
        default:
            signiture = env.access_signiture_user
            refresh_signiture = env.refresh_signiture_user
            aud = "user"
            break;
    }
    let access_token = jwt.sign({ id: user._id }, signiture, { expiresIn: "30min", audience: aud })
    let refresh_token = jwt.sign({ id: user._id }, refresh_signiture, { expiresIn: "1y", audience: aud })
    return { access_token, refresh_token }
}