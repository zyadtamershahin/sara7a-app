import { bad_request_exception, not_found_exception } from "../../common/exception/error.exception.js"
import { env } from "../../config/env.service.js"
import { user_model } from "../../connection/model/user.model.js"
import bcrypt from "bcrypt"




export const signup = async (body) => {
    let { name, email, password, phone, age, gender, role } = body
    let existing_user = await user_model.findOne({ email })
    if (existing_user) {
        return bad_request_exception({ message: "User already exists" })
    } else {
        let hashed_password = await bcrypt.hash(password, env.salt_rounds)
        let user = await user_model.create({ name, email, password: hashed_password, phone, age, gender, role })
        return { message: "User created successfully", user }
    }

}

export const signin = async (body) => {
    let { email, password } = body
    let user = await user_model.findOne({ email })
    if (user) {
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            return { message: "User logged in successfully", user }
        }
            else {
               return not_found_exception({message:"Invalid password"})
            }
    }
}