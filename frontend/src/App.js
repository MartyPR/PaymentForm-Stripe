import "./App.css";
import CheckoutForm from "./components/payment";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/checkout/" element={<CheckoutForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
