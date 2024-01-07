import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  _id: string;
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string;
  color: string;
  price: number;
  inStock: boolean;
  createdAt: string;
  quantity?: number;
}

export interface State {
  products: Product[];
  quantity: number;
  total: number;
  change: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    change: 0
  },
  reducers: {
    addProduct: (state: State, action) => {
      state.quantity = action.payload.quantity;
      const newProducts = action.payload.product;
      state.products = [...newProducts];
      state.total = action.payload.total;
    },
    changeHandler: (state, action) => {
        state.change = action.payload.change;
    }
  },
});

export const { addProduct, changeHandler } = cartSlice.actions;
export default cartSlice.reducer;
