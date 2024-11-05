import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: {}, // { restaurantId: [{ foodId, price, quantity, toppings: [{ id, price, name }], uniqueId, ...foodDetails }] }
    totalAmount: {}, // { restaurantId: totalAmount }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { food, toppings } = action.payload;
            const quantity = food.quantity || 1;

            if (!state.carts[food.restaurant_id]) {
                state.carts[food.restaurant_id] = [];
                state.totalAmount[food.restaurant_id] = 0;
            }

            const uniqueId = `${food.id}-${toppings.map(t => t.id).sort().join('-')}`;
            const existingItem = state.carts[food.restaurant_id].find(item => item.uniqueId === uniqueId);
            const totalToppingsPrice = toppings.reduce((sum, topping) => sum + topping.price, 0);
            const pricePerUnit = food.price + totalToppingsPrice;

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.carts[food.restaurant_id].push({
                    ...food,
                    quantity: quantity,
                    toppings: toppings,
                    uniqueId: uniqueId,
                });
            }

            state.totalAmount[food.restaurant_id] += pricePerUnit * quantity;
            console.log('cart : ', state.carts[food.restaurant_id])
        },

        removeItem: (state, action) => {
            const { restaurantId, uniqueId } = action.payload;
            const cart = state.carts[restaurantId];
            const itemIndex = cart.findIndex(item => item.uniqueId === uniqueId);
            if (itemIndex !== -1) {
                const item = cart[itemIndex];
                const totalToppingsPrice = item.toppings.reduce((sum, topping) => sum + topping.price, 0);
                state.totalAmount[restaurantId] -= (item.price + totalToppingsPrice) * item.quantity;
                cart.splice(itemIndex, 1);

                if (cart.length === 0) {
                    delete state.carts[restaurantId];
                    delete state.totalAmount[restaurantId];
                }
            }
        },

        updateQuantity: (state, action) => {
            const { restaurantId, uniqueId, quantity } = action.payload;
            console.log(action.payload);
            const cart = state.carts[restaurantId];
            const item = cart.find(item => item.uniqueId === uniqueId);

            if (item) {
                const totalToppingsPrice = item.toppings.reduce((sum, topping) => sum + topping.price, 0);
                const pricePerUnit = item.price + totalToppingsPrice;
                const quantityChange = quantity - item.quantity;

                state.totalAmount[restaurantId] += quantityChange * pricePerUnit;
                item.quantity = quantity;
            }
        },
    }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
