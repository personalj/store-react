import { RootState } from '../index.ts';

export const getCartProducts = (state: RootState) => state.cart.cartList;
