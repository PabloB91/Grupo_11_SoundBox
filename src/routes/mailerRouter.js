const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/mailerResetController");

router.get("/reset-password", resetPasswordController.getSendMail);
router.post("/reset-password", resetPasswordController.sendMailProcess)

module.exports = router