import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '@utils-types';
import type { RootState } from '../store';

export type ConstructorState = {
  bun: TIngredient | null;
  items: TConstructorIngredient[];
  showOrderPreparingStarted: boolean;
};

export const burgerSliceInitialState: ConstructorState = {
  bun: null,
  items: [],
  showOrderPreparingStarted: false
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: burgerSliceInitialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    setShowOrderPreparingStarted(state, action: PayloadAction<boolean>) {
      state.showOrderPreparingStarted = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (!state.items) {
        state.items = [];
      }
      const constructorIngredient: TConstructorIngredient = {
        ...action.payload,
        id: `${action.payload._id}_${Date.now()}`
      };
      state.items.push(constructorIngredient);
    },
    removeIngredient(state, action: PayloadAction<number>) {
      if (!state.items) {
        state.items = [];
        return;
      }
      state.items.splice(action.payload, 1);
    },
    reorderItems(state, action: PayloadAction<{ from: number; to: number }>) {
      if (!state.items) {
        state.items = [];
        return;
      }
      const { from, to } = action.payload;
      const [moved] = state.items.splice(from, 1);
      state.items.splice(to, 0, moved);
    },
    reset(state) {
      state.bun = null;
      state.items = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  reorderItems,
  setShowOrderPreparingStarted,
  reset
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

export const selectConstructor = (state: RootState) => state.burgerConstructor;
export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.items;
export const selectShowOrderPreparingStarted = (state: RootState) =>
  state.burgerConstructor.showOrderPreparingStarted;
