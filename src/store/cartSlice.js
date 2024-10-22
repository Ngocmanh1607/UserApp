import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const itemExits = state.cart.find(item => { item.id = action.payload.id })
            itemExits ? itemExits.quantity += action.payload.quantity : state.cart.push(action.payload)
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
        updateQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        addTopping: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.itemId);
            if (item) {
                item.toppings.push(action.payload.topping);
            }
        },
        removeTopping: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.itemId);
            if (item) {
                item.toppings = item.toppings.filter(
                    topping => topping.id !== action.payload.toppingId
                );
            }
        },
    }
})