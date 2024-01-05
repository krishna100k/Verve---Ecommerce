import {createSlice} from "@reduxjs/toolkit"

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

export interface State{
    products: Product[];
    quantity: number;
    total: number;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products:[],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state: State, action) => {
            state.quantity += 1;
            state.products.push(action.payload.product);
            state.total += action.payload.total;
        }
    }
})

export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;