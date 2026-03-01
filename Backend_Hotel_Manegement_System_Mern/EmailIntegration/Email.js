import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const SendEmail=async(to,subject,body)=>{

let transport=nodemailer.createTransport(
    
    {
        service:"gmail",
        auth:{
            user:process.env.UserEmail,
            pass:process.env.UserPass
        }
    }
)


const mailOptions={
    from:process.env.UserEmail,
    to:to,
    subject:subject,
    html:body
}


await transport.sendMail(mailOptions)

}

export default SendEmail
