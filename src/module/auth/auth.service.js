import { bad_request_exception, not_found_exception } from "../../common/exception/error.exception.js"
import { env } from "../../config/env.service.js"
import { user_model } from "../../connection/model/user.model.js"
import jwt from "jsonwebtoken"
import { generate_token, new_generate_access_token } from "../../common/services/token.service.js"
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

export const login = async (body) => {
    let { email, password } = body
    let user = await user_model.findOne({ email })
    if (user) {
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const {access_token, refresh_token} = generate_token(user)
            return { message: "login successful", user, access_token, refresh_token }
        }
            else {
               return not_found_exception({message:"Invalid password"})
            }
    }
}


export const get_by_id = async (id) => {
    let user = await user_model.findById(id)
    if (user) {
        return { message: "User found successfully", user }
    } else {
        return not_found_exception({ message: "User not found" })
    }
}


export const generate_access_token = async (body) => {
    let {refresh_token} = body
    let {access_token} = new_generate_access_token(refresh_token)
    if(access_token){
        return {access_token}
    }else{
        return bad_request_exception({message:"Invalid refresh token"})
    }
}