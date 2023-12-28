import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Home from "./Routes/Home";
import ProductList from "./Routes/ProductList";
import Product from "./Routes/Product";
import Login from "./Routes/Login";
import Cart from "./Routes/Cart";
import Register from "./Routes/Register";

const user:boolean = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element = {<ProductList />} />
        <Route path="/product/:id" element = {<Product />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element = {user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
