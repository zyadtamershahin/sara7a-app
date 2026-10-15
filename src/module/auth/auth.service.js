import { bad_request_exception, not_found_exception } from "../../common/exception/error.exception.js"
import { env } from "../../config/env.service.js"
import { user_model } from "../../connection/model/user.model.js"
import jwt from "jsonwebtoken"
import { generate_token, new_generate_access_token } from "../../common/services/token.service.js"
import bcrypt from "bcrypt"
import { send_email } from "../../common/middleware/sendEmail.js"





export const signup = async (body) => {
    let { name, email, password, confirm_password, phone, age, gender } = body
    if (password != confirm_password) {
        return bad_request_exception({ message: "Passwords do not match" })
    }
    let existing_user = await user_model.findOne({ email })
    if (existing_user) {
        return bad_request_exception({ message: "User already exists" })
    } else {
        let hashed_password = await bcrypt.hash(password, 10)
        let otp = Math.round(Math.random() * 1000000)
        if (hashed_password) {
            let user = await user_model.create({ name, email, password: hashed_password, phone, age, gender, otp })
            await send_email({ to: email, subject: "signup", html: `<h1> your otp is ${otp}</h1> ` })
            return user
        }
        return true

    }
}
export const login = async (body) => {
    let { email, password } = body;
    let user = await user_model.findOne({ email });
    if (!user) {
        return not_found_exception({ message: "User not found" });
    }
    if(!user.is_verified){
        return bad_request_exception({message:"user not verified"})
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return not_found_exception({ message: "Invalid password" })
    }

    const { access_token, refresh_token } = generate_token(user);
    return { message:"login succsess", access_token, refresh_token };
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
    let { refresh_token } = body
    let { access_token } = new_generate_access_token(refresh_token)
    if (access_token) {
        return { access_token }
    } else {
        return bad_request_exception({ message: "Invalid refresh token" })
    }
}

export const verify_otp = async (body) => {
    let { email, otp } = body
    let user = await user_model.findOne({ email })
    if (!user) {
        return not_found_exception({ message: "User not found" })
    }
    if (user.otp == otp) {
        user.is_verified = true
        await user.save()
        return { message: "OTP verified successfully" }

    }
    if (user.is_verified) {
        return bad_request_exception({ message: "User already verified" })
    }
    if(user.otp != otp){
        return bad_request_exception({ message: "Invalid OTP" })
    }
    user.is_verified = true
    user.otp = null
    await user.save()
    return { message: "OTP verified successfully" , user}
}



export const get_all_users =async ()=>{
    let user= await user_model()
    return user

}