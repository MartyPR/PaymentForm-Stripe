
import './App.css';
import CheckoutForm from './components/payment';
import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe('pk_test_51PWkZzRxhjnT4bkRjgfgWP8qbElFrbANhhoWUDGRiFOAQoXsFWb0P5Yjk57ZYlNsF8VCeLbJXIXn2G6exIwhWQrD00eUTCnR3s');

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App

