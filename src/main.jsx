import { StrictMode } from "react";
import Cart from "./Cart";
import { createRoot } from "react-dom/client";
import "./index.css";
import Success from "./Success";

import App from "./App.jsx";
import Contact from "./contact.jsx";
import Checkout from "./Checkout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);