const express = require("express");
const router = express.Router();
const aController = require("../controllers/adminController");


router.get('/listUsers', aController.listUsers);

module.exports = router;