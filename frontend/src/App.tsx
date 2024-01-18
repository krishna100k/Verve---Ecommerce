import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import InitialInvoke from "./InitialInvoke";

import Home from "./Routes/Home";
import ProductList from "./Routes/ProductList";
import Product from "./Routes/Product";
import Login from "./Routes/Login";
import Cart from "./Routes/Cart";
import Register from "./Routes/Register";
import WishList from "./Routes/WishList";
import Admin from "./Routes/Admin";
import { useSelector } from "react-redux";
import OrderProducts from "./Routes/OrderProducts";
import AdminProducts from "./Routes/AdminProducts";
import AddProduct from "./Routes/AddProduct";
import EditProduct from "./Routes/EditProduct";

function App() {


    InitialInvoke();



  const user = useSelector((state : {user:{user:{user:{isAdmin:boolean}}}}) => state.user.user?.user);
  const isAdmin = user && user.isAdmin
  console.log(isAdmin)


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<WishList />} />

        {isAdmin && (
          <>
            <Route path="hpanel/orders" element={<Admin />} />
            <Route path="hpanel" element={<Navigate to="/hpanel/orders" />} />
            <Route path="/hpanel/orders/:orderId" element={<OrderProducts />} />
            <Route path="/hpanel/products" element={<AdminProducts />} />
            <Route path="/hpanel/addproduct" element={<AddProduct />} />
            <Route path="/hpanel/products/:productId" element={<EditProduct />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
