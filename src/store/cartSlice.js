import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { cart } from '../api/cartOrder';
// Async action để lấy số lượng giỏ hàng từ API
export const fetchCartCount = createAsyncThunk(
  'cart/fetchCartCount',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const cartData = await cart.getCart(restaurantId);
      if (cartData.success) {
        return cartData.data.length;
      } else {
        return rejectWithValue('Không lấy được dữ liệu giỏ hàng');
      }
    } catch (error) {
      console.log('Lỗi lấy số lượng ', error.message);

      return rejectWithValue(error.message);
    }
  }
);
// Async action để lấy toàn bộ dữ liệu giỏ hàng từ API
export const fetchAllCartItems = createAsyncThunk(
  'cart/fetchAllCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const cartData = await cart.getAllCart();
      if (cartData.success) {
        return cartData.data.metadata;
      } else {
        return rejectWithValue('Không lấy được dữ liệu giỏ hàng');
      }
    } catch (error) {
      console.log('Lỗi lấy dữ liệu giỏ hàng: ', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartCount: 0,
    cartItems: [], // Thêm state để lưu toàn bộ dữ liệu giỏ hàng
    loading: false,
    error: null,
  },
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.cartCount = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartCount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCartItems.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const selectCartItemCount = createSelector(
  (state) => state.cart.cartItems,
  (cartItems) => cartItems.length || 0
);
export const { setCartCount } = cartSlice.actions;
export default cartSlice.reducer;
