import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index.ts';
import { Product } from '../../types/product.ts';
import { ProductState } from '../../types/slices/product.ts';
import movieApi from '../../services/api/storeApi.ts';

export const fetchAsyncProducts = createAsyncThunk(
  'products/fetchAsyncProducts',
  async (categorySlug: string | null, thunkAPI) => {
    try {
      const response = categorySlug
        ? await movieApi.get(`/products/category/${categorySlug}`)
        : await movieApi.get(`/products`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Error api response');
    }
  },
);

export const fetchAsyncProduct = createAsyncThunk('products/fetchAsyncProduct', async (id: string, thunkAPI) => {
  try {
    const response = await movieApi.get(`/products/${id}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Error api response');
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

// Other code such as selectors can use the imported `RootState` type
export const products = (state: RootState) => state.products.products;

export const product = (state: RootState) => state.products.product;

export const loading = (state: RootState) => state.products.loading;

export const error = (state: RootState) => state.products.error;

export default productSlice.reducer;
