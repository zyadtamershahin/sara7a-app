import { bad_request_exception } from "../exception/error.exception.js"



export const validation = (schema) => {
    return(req,res,next)=>{

        let {success,error} = schema.safeParse(req.body);
        if(!success){
            throw bad_request_exception({message:"Invalid request data", extra:error.issues})
        }
        next()
    }
}