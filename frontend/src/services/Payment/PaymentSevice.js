import axios from "axios";

export const createStripePayment = async ({ token, amount, description }) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/stripe",
    { tokenId: token, amount, description },
    { headers: { "Content-Type": "application/json" } }
  );
  if (response.status !== 200) {
    throw new Error("Failed to create payment intent");
  }
  return response.data.clientSecret;
};