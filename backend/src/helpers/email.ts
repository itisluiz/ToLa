import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({path: "./src/config/email.env"});

const trasporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
});

function testmail() : Promise<boolean>
{
    return trasporter.verify();
}

function sendmail(to : string, subject : string, text : string, html : string | undefined = undefined)
{
    trasporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: to,
        subject: subject,
        text: text,
        html: html
    });
}

export { testmail, sendmail };
