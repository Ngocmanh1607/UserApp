import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    carts: {}, // { restaurantId: [{ foodId, price, quantity, toppings: [{ id, price, name }], uniqueId, ...foodDetails }] }
    totalAmount: {}, // { restaurantId: { amount: totalAmount, name: "Restaurant Name", image: "image.jpg" } }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
            loadCartFromStorage(state.userId);
            saveCartToStorage(state);
        },

        addItem: (state, action) => {
            const { food, toppings, restaurantInfo } = action.payload;
            const quantity = food.quantity || 1;

            if (!state.carts[food.restaurant_id]) {
                state.carts[food.restaurant_id] = [];
                state.totalAmount[food.restaurant_id] = {
                    amount: 0,
                    name: restaurantInfo.name,
                    image: restaurantInfo.image
                };
                console.log(state.totalAmount[food.restaurant_id]);
            }

            const uniqueId = `${food.id}-${toppings.map(t => t.id).sort().join('-')}`;
            const existingItem = state.carts[food.restaurant_id].find(item => item.uniqueId === uniqueId);
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

            state.totalAmount[food.restaurant_id].amount += food.price * quantity;
            saveCartToStorage(state);
        },

        removeItem: (state, action) => {
            const { restaurantId, uniqueId } = action.payload;
            const cart = state.carts[restaurantId];
            const itemIndex = cart.findIndex(item => item.uniqueId === uniqueId);
            if (itemIndex !== -1) {
                const item = cart[itemIndex];
                state.totalAmount[restaurantId].amount -= (item.price) * item.quantity;
                cart.splice(itemIndex, 1);

                if (cart.length === 0) {
                    delete state.carts[restaurantId];
                    delete state.totalAmount[restaurantId];
                }
                saveCartToStorage(state);
            }
        },

        updateQuantity: (state, action) => {
            const { restaurantId, uniqueId, quantity } = action.payload;
            const cart = state.carts[restaurantId];
            const item = cart.find(item => item.uniqueId === uniqueId);

            if (item) {
                const pricePerUnit = item.price;
                const quantityChange = quantity - item.quantity;

                state.totalAmount[restaurantId].amount += quantityChange * pricePerUnit;
                item.quantity = quantity;
            }
            saveCartToStorage(state);
        },

        loadCart: (state, action) => {
            return action.payload;
        },
        clearCart: (state, action) => {
            const { restaurantId } = action.payload;
            if (restaurantId) {
                delete state.carts[restaurantId];
                delete state.totalAmount[restaurantId];
            }
            saveCartToStorage(state);
        }
    }
});

const saveCartToStorage = async (state) => {
    try {
        if (state.userId) {
            const userCartKey = `cart-${state.userId}`;

            await AsyncStorage.setItem(userCartKey, JSON.stringify(state));
        }
    } catch (error) {
        console.error("Failed to save cart:", error);
    }
};

export const loadCartFromStorage = () => async (dispatch) => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
            console.log("User not logged in or userId missing.");
            return;
        }

        const cartData = await AsyncStorage.getItem(`cart-${userId}`);
        if (cartData) {
            dispatch(cartSlice.actions.loadCart(JSON.parse(cartData)));
        }
    } catch (error) {
        console.error("Failed to load cart:", error);
    }
};

export const { addItem, removeItem, updateQuantity, setUserId, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
