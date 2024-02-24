const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/mailerResetController");
const token = require("../nodemailer/tokenResetPassword");


router.get("/password", resetPasswordController.getSendMail);
router.post("/password", resetPasswordController.sendMailProcess)

router.get('/reset/password/:token',(req, res) => {
   

})

module.exports = router