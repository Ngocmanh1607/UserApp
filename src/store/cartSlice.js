import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartCount: 0,
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
      });
  },
});

export const { setCartCount } = cartSlice.actions;
export default cartSlice.reducer;
