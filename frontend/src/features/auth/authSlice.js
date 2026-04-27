import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            const userData = action.payload;
            state.user = userData ?? null;
            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
            }
        },
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("hasSession");
        }
    }
});

export const {authStart, authSuccess, authFailure, logout} = authSlice.actions;
export default authSlice.reducer;