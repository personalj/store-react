import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import api from '../../services/api/storeApi.ts';

interface CategoryState {
  loading: boolean;
  error: string;
  categories: string[];
}

export const fetchAsyncCategories = createAsyncThunk('categories/fetchAsyncCategories', async (_, thunkAPI) => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (e) {
    const err = e as AxiosError;
    return thunkAPI.rejectWithValue(err?.message);
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

export default categorySlice.reducer;
