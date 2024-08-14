const express = require("express");
const handlePayUController = require("../controllers/PayUController");
const payURoute = express.Router();


payURoute.post('/', handlePayUController)

module.exports=payURoute