import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index.ts';
import movieApi from '../../services/api/storeApi.ts';
import { CategoryState } from '../../types/slices/category.ts';

export const fetchAsyncCategories = createAsyncThunk('categories/fetchAsyncCategories', async (_, thunkAPI) => {
  try {
    const response = await movieApi.get('/products/categories');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Error api response');
  }
});

const initialState: CategoryState = {
  loading: false,
  error: '',
  categories: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    removeCategories: (state) => {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncCategories.pending.type, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAsyncCategories.fulfilled.type, (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.error = '';
      state.categories = action.payload;
    });
    builder.addCase(fetchAsyncCategories.rejected.type, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { removeCategories } = categorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const categories = (state: RootState) => state.categories;

export const loading = (state: RootState) => state.categories.loading;

export const error = (state: RootState) => state.categories.error;

export default categorySlice.reducer;
