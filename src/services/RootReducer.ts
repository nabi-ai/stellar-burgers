import { combineReducers } from '@reduxjs/toolkit';
import ingredients from './slices/ingredientsSlice';
import auth from './slices/authSlice';
import burgerConstructor from './slices/burgerConstructorSlice';
import order from './slices/orderSlice';
import feed from './slices/feedSlice';
import profileOrders from './slices/profileOrdersSlice';
import profile from './slices/profileSlice';

const rootReducer = combineReducers({
  ingredients,
  auth,
  burgerConstructor,
  order,
  feed,
  profileOrders,
  profile
});

export default rootReducer;
