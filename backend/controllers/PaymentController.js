const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//stripe Payment
const handleStripePayment = asyncHandler(async (req, res) => {
  const { tokenId, amount, description } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
    //   source: tokenId,
      description,
    });
    console.log(paymentIntent);

    const payment = new Payment({
      stripeChargeId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      description: paymentIntent.description,
      status: paymentIntent.status,
    });

    await payment.save();

    res.json({ clientSecret: paymentIntent.client_secret });
    // res.json({
    //   success: true,
    //   payment,
    // });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

module.exports= handleStripePayment