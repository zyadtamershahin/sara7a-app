


export const error_response = ({
    status = 500,
    message = "Internal server error",
    extra = null,
}={})=>{
    throw new Error(message,{ cause :{ status, extra}})
}


export const bad_request_exception = ({message="bad request", extra=undefined}) => {
    return error_response({status: 400, message: message, extra: extra})
}

export const not_found_exception = ({message="not found", extra=undefined}) => {
    return error_response({status: 404, message: message, extra: extra})
}

export const conflict_exception = ({message="conflict", extra=undefined}) => {
    return error_response({status: 409, message: message, extra: extra})
}

export const unauthorized_exception = ({message="unauthorized", extra=undefined}) => {
    return error_response({status: 401, message: message, extra: extra})
}

export const forbidden_exception = ({message="forbidden", extra=undefined}) => {
    return error_response({status: 403, message: message, extra: extra})
}

