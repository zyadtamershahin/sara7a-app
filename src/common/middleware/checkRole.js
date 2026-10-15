import { includes } from "zod"
import { user_model } from "../../connection/model/user.model.js"
import { unauthorized_exception } from "../exception/error.exception.js"



export const check_role = (roles) => {
    return async (req, res, next) => {
        let user = await user_model.findById(req.user.id)
        if(!user.role.includes(roles)){
            throw unauthorized_exception ({message : "you are not authorized to accses"})
        next()
    }
}
}