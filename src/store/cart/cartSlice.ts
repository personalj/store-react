import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../products/types.ts';
import { getStorageValue, setToLocalStorage } from '../../utils/localStorage.ts';
import { CART_STORAGE_KEY } from "../../consts";

interface CartState {
  cartList: Product[];
}

const initialState: CartState = {
  cartList: getStorageValue(CART_STORAGE_KEY, []),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartList: (state) => {
      state.cartList = [];
      setToLocalStorage(CART_STORAGE_KEY, []);
    },
    setToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const itemFound = state.cartList.find((el) => el.id === product.id);
      itemFound && itemFound.quantity && product.quantity
        ? (itemFound.quantity += product.quantity)
        : state.cartList.unshift(product);
      setToLocalStorage(CART_STORAGE_KEY, state.cartList);
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.cartList = state.cartList.filter((item) => item.id !== action.payload);
      setToLocalStorage(CART_STORAGE_KEY, state.cartList);
    },
    incrementCartItem: (state, action: PayloadAction<number>) => {
      const item = state.cartList.find((item) => item.id === action.payload);
      if (item?.quantity) {
        item.quantity++;
      }
      setToLocalStorage(CART_STORAGE_KEY, state.cartList);
    },
    decrementCartItem: (state, action: PayloadAction<number>) => {
      const item = state.cartList.find((item) => item.id === action.payload);
      if (item?.quantity && item?.quantity > 1) {
        item.quantity--;
      }
      setToLocalStorage(CART_STORAGE_KEY, state.cartList);
    },
  },
});

export const { clearCartList, setToCart, deleteFromCart, incrementCartItem, decrementCartItem } = cartSlice.actions;

export default cartSlice.reducer;
