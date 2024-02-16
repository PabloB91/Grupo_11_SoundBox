const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: config.MAIL.HOST,
    port: config.MAIL.PORT,
    secure: config.MAIL,SECURE,
    auth: {
        user: config.MAIL.USER,
        pass: config.MAIL.PASS
    }
})
//jsonwebtoken
module.exports = transporter