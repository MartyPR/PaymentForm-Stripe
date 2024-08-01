const express = require("express");
const handleStripePayment = require("../controllers/PaymentController");

const stripeRouter = express.Router();
 
stripeRouter.post('/',handleStripePayment);

module.exports= stripeRouter