import { createSlice } from "@reduxjs/toolkit";


export interface User{
    _id?:string;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    user?: User
}

export interface UserState{
    user?: User | null;
    isLoading: boolean;
    error: string | null;
}

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null,
        isLoading: false,
        error: null
    },
    reducers:{
        loginRequest: (state: UserState) => {
            state.isLoading = true
            state.error = null;
        },
        loginSuccess: (state : UserState, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state : UserState, action) => {
            state.user = null;
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state : UserState) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        }
    }
})

export const {loginRequest, loginSuccess, loginFailure, logout} = userSlice.actions;
export default userSlice.reducer