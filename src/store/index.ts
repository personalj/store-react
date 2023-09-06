import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice.ts';
import productReducer from './products/productSlice.ts';
import cartReducer from './cart/cartSlice.ts';

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
