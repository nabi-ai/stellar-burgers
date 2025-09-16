import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type ProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null,
  lastUpdated: null
};

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch profile orders';
      return rejectWithValue(errorMessage);
    }
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    clearProfileOrders: (state) => {
      state.orders = [];
      state.lastUpdated = null;
    },
    setProfileOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
      state.lastUpdated = Date.now();
    },
    clearProfileOrdersError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.lastUpdated = Date.now();
        state.error = null;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

// export const { clearProfileOrders, setProfileOrders, clearProfileOrdersError } =
//   profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;

// export const selectProfileOrdersState = (state: RootState) =>
//   state.profileOrders;
export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;
export const selectProfileOrdersError = (state: RootState) =>
  state.profileOrders.error;
// export const selectProfileOrdersLastUpdated = (state: RootState) =>
//   state.profileOrders.lastUpdated;
