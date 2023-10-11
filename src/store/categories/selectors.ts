import { RootState } from '../index.ts';

export const getCategories = (state: RootState) => state.categories.categories;

export const getLoading = (state: RootState) => state.categories.loading;

export const getError = (state: RootState) => state.categories.error;
