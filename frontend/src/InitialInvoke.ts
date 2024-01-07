import url from "./url";
import { useDispatch } from "react-redux";
import {
  User,
  loginFailure,
  loginRequest,
  loginSuccess,
} from "./redux/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Routes/Product";
import { State, addProduct,  } from "./redux/cartSlice";

interface CartProduct {
  productId?: string;
  quantity?: number;
}

interface Change {
  cart: State;
}

const InitialInvoke = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const change = useSelector((state: Change) => state.cart.change);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const logIn = async () => {
      dispatch(loginRequest());
      try {
        const response = await axios.get(`${url}/auth/me`, { headers });
        console.log(response.data)
        dispatch(loginSuccess({ user: response.data.user }));
      } catch (err) {
        console.log(err);
        dispatch(loginFailure({ error: "login Error !" }));
      }
    };

    logIn();
  }, [dispatch]);

  const stateUser = useSelector((state: User) => state?.user?.user?.user);
  console.log(stateUser);
  let isLoggedin: boolean = false;
  if (stateUser) {
    isLoggedin = true;
  } else {
    false;
  }

  console.log(isLoggedin)

  const userId = useSelector((state: User) => state?.user?.user?.user?._id);

  console.log(userId)

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${url}/product/find`);
      setProducts(response.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const cartId = await axios.get(`${url}/cart/${userId}`, { headers });
      setCartProducts(cartId.data.products);
    };
    fetch();
  }, [userId, change, isLoggedin]);

  useEffect(() => {
    if (cartProducts && products) {
      const filteredProducts = cartProducts.flatMap((cartProduct) => {
        const matchedProduct = products.find((product) => {
          return cartProduct?.productId === product?._id;
        });

        if (matchedProduct) {
          return {
            ...matchedProduct,
            quantity: cartProduct?.quantity || 0,
          };
        } else return [];
      });

      setFilteredProducts(filteredProducts);
    }
  }, [cartProducts, products]);




  useEffect(() => {
    if (filteredProducts && filteredProducts.length >= 0) {

      let total = 0;
      filteredProducts.forEach((product) => {
        if (product.price && product.quantity) {
          total += product?.price * product?.quantity;
        }
      });
      dispatch(
        addProduct({
          product: filteredProducts,
          total: total,
          quantity: filteredProducts.length,
        })
      );
    }
  }, [filteredProducts, dispatch]);
};

export default InitialInvoke;
