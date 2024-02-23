const config = require("../nodemailer/config");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const token = require("../nodemailer/tokenResetPassword")

const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs")

const resetPasswordController =  {
    getSendMail: (req, res) => {
        res.render("resetPasswordForm")
    },
    sendMailProcess: async (req, res) => {
        try {
            const userEmail = req.body.email;
            const storeOwnerEmail = "soundboxmusicstore@gmail.com";

            const transporter = nodemailer.createTransport({
                host: config.MAIL_HOST,
                port: config.MAIL_PORT,
                secure: true,
                auth: {
                    user: config.MAIL_USER,
                    pass: config.MAIL_PASS
                }
            });

            const userResetLink = "http://localhost:3020/reset/password/" + token;

            const userInfo = await transporter.sendMail({
                from: `"SoundBox Music Store" <${config.MAIL_USER}>`,
                to: userEmail,
                subject: "Reset your password",
                html: `<p>Click the link below to reset your password:</p><a href="${userResetLink}">Reset Password</a>`
            });

            const storeOwnerInfo = await transporter.sendMail({
                from: `"SoundBox Music Store" <${config.MAIL_USER}>`,
                to: storeOwnerEmail,
                subject: 'Password Reset Request',
                html:  `<p>A user requested to reset their password. Here's the user's email:</p><p>${userEmail}</p><p>And here's the reset link:</p><p>${userResetLink}</p>`
            });

            console.log("User message sent", userInfo.messageId);
            console.log("Store owner message sent", storeOwnerInfo.messageId);

            res.redirect("/")
        }
        catch(err) {
            res.render("not-found")
            console.log(err)
        }
    }, 
    validateStoreDeleteToken : (req, res) => {
            function storeResetToken(token, expiresAt){
                const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
                tokens.push({ token, expiresAt });
                fs.writeFileSync('tokens.json', JSON.stringify(tokens), 'utf8');
            }
        
            function isValidResetToken (token) {
                const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
                const tokenIndex = tokens.findIndex(t => t.token === token);
            
                if (tokenIndex === -1) {
                return false;
                }
            
                const tokenData = tokens[tokenIndex];
                const isExpired = tokenData.expiresAt < new Date();
                return !isExpired;
            }
        
            function removeResetToken (token) {
                const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
                const newTokens = tokens.filter(t => t.token !== token);
                fs.writeFileSync('tokens.json', JSON.stringify(newTokens), 'utf8');
            }

    }
}

module.exports = resetPasswordController

