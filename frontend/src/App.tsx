import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import InitialInvoke from "./InitialInvoke";


import Home from "./Routes/Home";
import ProductList from "./Routes/ProductList";
import Product from "./Routes/Product";
import Login from "./Routes/Login";
import Cart from "./Routes/Cart";
import Register from "./Routes/Register";


function App() {

  InitialInvoke();


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
