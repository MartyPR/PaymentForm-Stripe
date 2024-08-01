// App.js
import React, { useState, useEffect } from 'react';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Cargar Stripe
const stripePromise = loadStripe('pk_test_51PWkZzRxhjnT4bkRjgfgWP8qbElFrbANhhoWUDGRiFOAQoXsFWb0P5Yjk57ZYlNsF8VCeLbJXIXn2G6exIwhWQrD00eUTCnR3s'); // Reemplaza con tu clave pública de Stripe

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Llamar al backend para obtener el clientSecret
    const fetchClientSecret = async () => {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Monto en centavos
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://tu-sitio.com/checkout-success', // URL a la que se redirigirá después del pago
      },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setSuccess('Pago exitoso');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </form>
  );
};


export default CheckoutForm;
