import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../store/products/types.ts';
import { getStorageValue, setToLocalStorage } from '../../utils/localStorage.ts';

interface CartState {
  cartList: Product[];
}

const initialState: CartState = {
  cartList: getStorageValue('cart', []),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartList: (state) => {
      state.cartList = [];
      setToLocalStorage('cart', []);
    },
    setToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const itemFound = state.cartList.find((el) => el.id === product.id);
      itemFound && itemFound.quantity && product.quantity
        ? (itemFound.quantity += product.quantity)
        : state.cartList.unshift(product);
      setToLocalStorage('cart', state.cartList);
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.cartList = state.cartList.filter((item) => item.id !== action.payload);
      setToLocalStorage('cart', state.cartList);
    },
    incrementCartItem: (state, action: PayloadAction<number>) => {
      const item = state.cartList.find((item) => item.id === action.payload);
      if (item?.quantity) {
        item.quantity++;
      }
      setToLocalStorage('cart', state.cartList);
    },
    decrementCartItem: (state, action: PayloadAction<number>) => {
      const item = state.cartList.find((item) => item.id === action.payload);
      if (item?.quantity && item?.quantity > 1) {
        item.quantity--;
      }
      setToLocalStorage('cart', state.cartList);
    },
  },
});

export const { clearCartList, setToCart, deleteFromCart, incrementCartItem, decrementCartItem } = cartSlice.actions;

export default cartSlice.reducer;
