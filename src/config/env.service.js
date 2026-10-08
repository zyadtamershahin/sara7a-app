import dotenv from "dotenv"
import path from "path"
dotenv.config({path:path.resolve('./.env.dev')})


const port= process.env.PORT
const database_uri= process.env.URI
const salt_rounds= process.env.SALT_ROUNDS
const mood= process.env.MOOD
const access_signiture_user= process.env.ACCESS_SIGNITURE_USER
const refresh_signiture_user= process.env.REFRESH_SIGNITURE_USER
const access_signiture_admin= process.env.ACCESS_SIGNITURE_ADMIN
const refresh_signiture_admin= process.env.REFRESH_SIGNITURE_ADMIN
export const env = {
    port,
    database_uri,
    salt_rounds,
    mood,
    access_signiture_user,
    refresh_signiture_user,
    access_signiture_admin,
    refresh_signiture_admin
}