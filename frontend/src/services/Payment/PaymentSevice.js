import axios from "axios";

export const createStripePayment = async (payment) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/stripe",
    {
      tokenId: payment.token,
      amount: Number(payment?.amount),
      description: payment.description,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
