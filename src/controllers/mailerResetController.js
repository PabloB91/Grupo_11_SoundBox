const path = require("path")
const express = require("express")
const app = express();
const crypto = require('crypto');

const resetPasswordController =  {
    getSendMail: (req, res) => {
        res.render("resetPasswordForm")
    },

    sendMailProcess: async (req, res) => {
        try {

            const userEmail = req.body.userEmail;
            const storeOwnerEmail = "soundboxmusicstore@gmail.com";

            const transporter = nodemailer.createTransport({
                host: config.MAIL.HOST,
                port: config.MAIL.PORT,
                secure: config.MAIL.SECURE,
                auth: {
                    user: config.MAIL.USER,
                    pass: config.MAIL.PASS
                }
            });

            function generateResetToken() {
                return crypto.randomBytes(20).toString('hex');
            }

            const userResetLink = "http://localhost:3050/reset-password" + generateResetToken()

            const userInfo = await transporter.sendMail({
                from: `"SoundBox Music Store" <${config.MAIL.USER}>`,
                to: userEmail,
                subject: "Reset your password",
                html: `<p>Click the link below to reset your password:</p><a href="${userResetLink}">Reset Password</a>`
            });

            const storeOwnerInfo = await transporter.sendMail({
                from: `"SoundBox Music Store" <${config.MAIL.USER}>`,
                to: storeOwnerEmail,
                subject: 'Password Reset Request',
                html:  `<p>A user requested to reset their password. Here's the user's email:</p><p>${userEmail}</p><p>And here's the reset link:</p><p>${userResetLink}</p>`
            });

            console.log("User message sent", userInfo.messageId);
            console.log("Store owner message sent", storeOwnerInfo.messageId);

            res.render("resetPasswordForm")
        }
        catch(err) {
            res.render("not-found")
        }
    }
}

module.exports = resetPasswordController;
