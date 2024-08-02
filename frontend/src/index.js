import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise=loadStripe('pk_test_51PWkZzRxhjnT4bkRjgfgWP8qbElFrbANhhoWUDGRiFOAQoXsFWb0P5Yjk57ZYlNsF8VCeLbJXIXn2G6exIwhWQrD00eUTCnR3s')

const option ={
  mode:'payment',
  currency:'usd',
  amount:1099,
}

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise} options={option}>
      <App />
    </Elements>
  </React.StrictMode>
);
