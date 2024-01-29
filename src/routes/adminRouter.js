const express = require("express");
const router = express.Router();
const aController = require("../controllers/adminController");


router.get('/usersList', aController.listUsers);

module.exports = router;