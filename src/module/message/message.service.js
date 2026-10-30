import { bad_request_exception, not_found_exception } from "../../common/exception/error.exception.js"
import { message_model } from "../../connection/model/message.model.js"
import { user_model } from "../../connection/model/user.model.js"



export const get_all_messages = async () => {
    let data = await message_model.find()
    if (data.length == 0) {
        throw not_found_exception({ message: 'no message found' })
    }
    return { message: "message found", data }
}


export const send_message = async (body, file) => {
    let { content, reciverID } = body
    let image
    let exsisted_user = await user_model.findById(reciverID)
    if (!exsisted_user) {
        throw bad_request_exception({ message: "user not found" })
    }
    if (file) {
        image = file.path
    }
    let added_message = await message_model.insertOne({ content, reciverID, image })
    if (!added_message) {
        throw bad_request_exception({ message: "message not sent" })
    }
    return { message: "message added succsesfuly", added_message }
}


export const creat_url = async (user) => {
    let data = await user_model.findById(user.id)
    const url = `https://sara7a/${data.unique_name}`
    return url
}

export const get_user_data = async (body) => {
    let { url } = body
    let unique_name = url.split('/').at(-1)
    let user_data = await user_model.findOne({ unique_name })
    if (!user_data) {
        throw bad_request_exception({ message: "user not found" })
    }else{
        return user_data
    }
    
}

export const get_user_messages = async(user)=>{
    let messages = await message_model.find({reciverID:user.id})
    if(messages.length==0){
        throw bad_request_exception({message:"no messages found"})
    }
    return messages
}