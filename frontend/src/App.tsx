import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import Home from "./Routes/Home";
import ProductList from "./Routes/ProductList";
import Product from "./Routes/Product";
import Login from "./Routes/Login";
import Cart from "./Routes/Cart";
import Register from "./Routes/Register";
import url from "./url";
import { useDispatch } from "react-redux";
import { loginFailure, loginRequest, loginSuccess } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const logIn = async () => {
      dispatch(loginRequest());
      try {
        const response = await axios.get(`${url}/auth/me`, { headers });
        dispatch(loginSuccess({ user: response.data.user }));
      } catch (err) {
        console.log(err);
        dispatch(loginFailure({ error: "login Error !" }));
      }
    };

    logIn();
  }, [dispatch]);

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
