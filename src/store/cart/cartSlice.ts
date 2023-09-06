import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index.ts';
import { CartState } from '../../types/slices/cart.ts';
import { Product } from '../../types/product.ts';
import { useLocalStorage, getStorageValue } from '../../hooks/useLocalStorage.ts';

const initialState: CartState = {
  cartList: getStorageValue('cart', []),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartList: (state) => {
      state.cartList = [];
      useLocalStorage('cart', []);
    },
    setToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const itemFound = state.cartList.find((el) => el.id === product.id);
      itemFound && itemFound.quantity && product.quantity
        ? (itemFound.quantity += product.quantity)
        : state.cartList.unshift(product);
      useLocalStorage('cart', state.cartList);
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.cartList = state.cartList.filter((item) => item.id !== action.payload);
      useLocalStorage('cart', state.cartList);
    },
    incrementCartItem: (state, action: PayloadAction<number>) => {
      const item = state.cartList.find((item) => item.id === action.payload);
      if (item?.quantity) {
        item.quantity++;
      }
      useLocalStorage('cart', state.cartList);
    },
    decrementCartItem: (state, action: PayloadAction<number>) => {
      const item = state.cartList.find((item) => item.id === action.payload);
      if (item?.quantity && item?.quantity > 1) {
        item.quantity--;
      }
      useLocalStorage('cart', state.cartList);
    },
  },
});

export const { clearCartList, setToCart, deleteFromCart, incrementCartItem, decrementCartItem } = cartSlice.actions;

export const cartProducts = (state: RootState) => state.cart.cartList;

export default cartSlice.reducer;
