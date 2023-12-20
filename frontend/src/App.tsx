import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./Routes/Home";
import ProductList from "./Routes/ProductList";
import Product from "./Routes/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element = {<ProductList />} />
        <Route path="/product" element = {<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
