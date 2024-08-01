const mongoose = require("mongoose");

//!Schema Payment
const paymentSchema = new mongoose.Schema({
  stripeChargeId: String,
  amount: Number,
  currency: String,
  description: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});


const Payment =  mongoose.model("Payment", paymentSchema);

module.exports = Payment;
