import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const store = configureStore({
  reducer: rootReducer,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
