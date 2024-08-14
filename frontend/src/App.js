import "./App.css";
import CheckoutForm from "./components/payment";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentForm from "./components/Payment/PaymentForm";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/checkout/" element={<CheckoutForm />} />
          <Route path="/payment/" element={<PaymentForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
