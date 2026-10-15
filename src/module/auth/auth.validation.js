import  z  from "zod"
export const user_login_schema = z.strictObject({
    email: z.string().email(),
    password: z.string()
})