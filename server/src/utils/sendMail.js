import nodemailer from "nodemailer"
import { apiError } from "./apiError.js"

const sendMail = async (mailTo, mailSubject, mailText = "", mailHtml = "") => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mrsaran786@gmail.com',
            pass: 'kbkb xcwm rglm gypi'
        }
    });

    //2.configure email content.
    const mailOptions = {
        from: 'mrsaran786@gmail.com',
        to: mailTo,
        subject: mailSubject,//heading
        text: mailText,//body
        html: mailHtml,
    }

    //3. send email
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Eamil sent successfully')
        return result

    } catch (error) {
        throw new apiError(500, "An Error Occured while sending Email");
    }
}

export { sendMail }