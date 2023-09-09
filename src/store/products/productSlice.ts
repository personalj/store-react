import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Product } from '../../store/products/types.ts';
import api from '../../services/api/storeApi.ts';

interface ProductState {
  loading: boolean;
  error: string;
  products: Product[];
  product: null | Product;
}
export const fetchAsyncProducts = createAsyncThunk(
  'products/fetchAsyncProducts',
  async (categorySlug: string | null, thunkAPI) => {
    try {
      const response = categorySlug ? await api.get(`/products/category/${categorySlug}`) : await api.get(`/products`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Error api response');
    }
  },
);

export const fetchAsyncProduct = createAsyncThunk('products/fetchAsyncProduct', async (id: string, thunkAPI) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (e) {
    const err = e as AxiosError;
    return thunkAPI.rejectWithValue(err?.message);
  }
});

const initialState: ProductState = {
  loading: false,
  error: '',
  products: [],
  product: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProducts: (state) => {
      state.products = [];
    },
    removeProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncProducts.pending.type, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAsyncProducts.fulfilled.type, (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.error = '';
      state.products = action.payload;
    });
    builder.addCase(fetchAsyncProducts.rejected.type, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAsyncProduct.pending.type, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAsyncProduct.fulfilled.type, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.error = '';
      state.product = action.payload;
    });
    builder.addCase(fetchAsyncProduct.rejected.type, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { removeProducts, removeProduct } = productSlice.actions;

export default productSlice.reducer;
