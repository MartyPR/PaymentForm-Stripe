const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

function generateSignature(
  apiKey,
  merchantId,
  referenceCode,
  amount,
  currency
) {
  const stringToHash = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
  return crypto.createHash("sha256").update(stringToHash).digest("hex");
}

const handlePayUController = asyncHandler(async (req, res) => {
  const referenceCode = "payment_test_00000001";
  const amount = req.body.amount; // Formato correcto, ej. "10000.00"
  const currency = "COP";

  const signature = generateSignature(
    process.env.PAYU_API_KEY,
    process.env.PAYU_MERCHANT_ID,
    referenceCode,
    amount,
    currency
  );

  const paymentMethod = req.body.paymentMethod;
  const paymentData = {
    language: "es",
    command: "SUBMIT_TRANSACTION",
    merchant: {
      apiKey: process.env.PAYU_API_KEY,
      apiLogin: process.env.PAYU_API_LOGIN,
    },
    transaction: {
      order: {
        accountId: process.env.PAYU_ACCOUNT_ID,
        referenceCode: referenceCode,
        description: "Test Payment",
        language: "es",
        signature: signature,
        notifyUrl: "http://www.your-domain.com/notify",
        additionalValues: {
          TX_VALUE: {
            value: amount,
            currency: currency,
          },
        },
        buyer: {
          emailAddress: req.body.email,
        },
      },
      payer: {
        emailAddress: req.body.email,
      },
      type: "AUTHORIZATION_AND_CAPTURE",
      paymentCountry: "CO",
      deviceSessionId: "your_device_session_id",
      ipAddress: req.ip,
      cookie: "your_cookie",
      userAgent: req.get("User-Agent"),
    },
    test: true, // Cambia a false para producción
  };

  if (paymentMethod === "PSE") {
    paymentData.transaction.paymentMethod = "PSE";
    paymentData.transaction.payer = {
      document: req.body.payerDocument,
      documentType: req.body.payerDocumentType,
      userType: "N", // N para persona natural, J para jurídica
      contactPhone: req.body.contactPhone,
      dniNumber: req.body.payerDocument,
      billingAddress: {
        street1: req.body.billingStreet1,
        city: req.body.billingCity,
        country: "CO",
      },
    };
  } else {
    paymentData.transaction.creditCard = {
      number: req.body.cardNumber,
      securityCode: req.body.cvv,
      expirationDate: req.body.expirationDate,
      name: req.body.cardHolderName,
    };
    paymentData.transaction.paymentMethod = req.body.paymentMethod; // Visa, MasterCard, etc.
  }

  try {
    const response = await axios.post(process.env.PAYU_API_URL, paymentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports=handlePayUController