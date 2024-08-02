import axios from 'axios';

export const createStripePayment = async ({ token, amount, description }) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/v1/stripe',
      { tokenId: token, amount, description },
      { withCredentials: true }
    );
    console.log('Response from backend:', response.data); // Debugging statement
    if (response.status !== 200) {
      throw new Error('Failed to create payment intent');
    }
    return response.data; // Ensure this contains clientSecret
  } catch (error) {
    console.error('Error in createStripePayment:', error); // Debugging statement
    throw error;
  }
};