import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import type { RootState } from '../store';

export type OrderState = {
  currentOrder: TOrder | null;
  viewedOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  currentOrder: null,
  viewedOrder: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      return response.order;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create order';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      const order = response.orders?.[0];
      if (!order) throw new Error('Order not found');
      return order;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch order';
      return rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearViewedOrder: (state) => {
      state.viewedOrder = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.viewedOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

// export const { clearCurrentOrder, clearViewedOrder, clearOrderError } =
//   orderSlice.actions;
export default orderSlice.reducer;

export const selectOrderState = (state: RootState) => state.order;
export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
export const selectViewedOrder = (state: RootState) => state.order.viewedOrder;
export const selectOrderLoading = (state: RootState) => state.order.isLoading;
export const selectOrderError = (state: RootState) => state.order.error;
