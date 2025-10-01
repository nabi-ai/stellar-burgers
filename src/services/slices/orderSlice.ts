import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import type { RootState } from '../store';
import { reset, setShowOrderPreparingStarted } from './burgerConstructorSlice';

export type OrderState = {
  created: TOrder | null;
  current: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const orderSliceInitialState: OrderState = {
  created: null,
  current: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredientIds, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setShowOrderPreparingStarted(true));
      const res = await orderBurgerApi(ingredientIds);
      dispatch(reset());
      return res.order as TOrder;
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed create order';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchByNumber',
  async (number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number);
      const order = res.orders?.[0] as TOrder | undefined;
      if (!order) throw new Error('Order not found');
      return order;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed get order';
      return rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: orderSliceInitialState,
  reducers: {
    clearCreated(state) {
      state.created = null;
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
        state.created = action.payload;
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
        state.current = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearCreated } = orderSlice.actions;
export default orderSlice.reducer;

export const selectOrderState = (state: RootState) => state.order;
export const selectCreatedOrder = (state: RootState) => state.order.created;
export const selectCurrentOrder = (state: RootState) => state.order.current;
export const selectOrderLoading = (state: RootState) => state.order.isLoading;
export const selectOrderError = (state: RootState) => state.order.error;
export const selectOrderData = (state: RootState) => state.order.created;
