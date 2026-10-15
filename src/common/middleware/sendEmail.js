import nodemailer from "nodemailer"
import { env } from "../../config/env.service.js";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.email_user,
        pass: env.app_password 
    }
});


export const send_email = async ({ to, subject, html }) => {
    transporter.sendMail({
        from:"sara7a@gmail.com",
        to,
        subject,
        html
    });
};