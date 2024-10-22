import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    currentOrder: null
}
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.order = action.payload
        },
        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload
            const order = state.orders.find(order => order.id === orderId)
            if (order) {
                order.status = status
            }
        }
    }
})
export const { setOrders, setCurrentOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;