import {client} from "../../main.js"




export const get = (key) => {
    return client.get(key)
}

export const set = (key, value,EX) => {
    return client.set(key, value, {EX:EX})
}

export const del = (key) => {
    return client.del(key)
}

export const exists = (key) => {
    return client.exists(key)
}

export const ttl = (key) => {
    return client.ttl(key)
}

export const inc = (key) => {
    return client.inc(key)
}