import mongoose from "mongoose";
import { gender_enum, provider_enum, role_enum } from "../../common/index.js"



const user_schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 3,
        max :60
    },
    email : {
        type : String,
        required : true,
        Unique : true
    },
    password :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    age :{
        type : Number,
        min: [18, "Age must be at least 18"],
        max: [80, "Age cannot exceed 80"]
    },
    gender :{
        type : String,
        enum : gender_enum,
        default : gender_enum.male
    },
    role :{
        type : String,
        enum : role_enum,
        default : role_enum.user
    },
    provider :{
        type : String,
        enum : provider_enum,
        default : provider_enum.system
    },
    profile_image :{
        type : String,
    },
    cover_image :{
        type : [String]
    }
})
export const user_model = mongoose.model("user",user_schema)