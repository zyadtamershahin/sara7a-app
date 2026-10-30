import { user_model } from "../../connection/model/user.model.js"
import { unauthorized_exception } from "../exception/error.exception.js"

export const check_role = (roles) => {
    return async (req, res, next) => {
    
        let user = await user_model.findById(req.user.id).catch(next)
        
        if (!user) {
            return next(unauthorized_exception({ message: "User not found" }))
        }

        
        if (!roles.includes(user.role)) {
            return next(unauthorized_exception({ message: "you are not authorized to accses" }))
        }

        next()
    }
}