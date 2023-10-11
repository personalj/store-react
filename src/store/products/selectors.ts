import { RootState } from '../index.ts';

export const getProducts = (state: RootState) => state.products.products;

export const getProduct = (state: RootState) => state.products.product;

export const getLoading = (state: RootState) => state.products.loading;

export const getError = (state: RootState) => state.products.error;
