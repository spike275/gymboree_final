import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState, AppThunk } from '../../app/store';
import Products from "../../models/manyProducts"
import Product from '../../models/Product';
import { getAllProducts, getNextProds } from './manyProductsAPI';

//  THIS STATE HOLDS ALL PRODUCTS AND THEIR CATEGORIES 

const initialState: Products = {
  products: [],
  categories: []
};

// Async thunk for fetching all products
export const getAllProductsAsync = createAsyncThunk(
  'products/getAllProducts',
  async (allProducts: boolean = false) => {
    const response = await getAllProducts(allProducts);
    return response.data;
  }
);

// Async thunk for fetching more products
export const getMoreProdsAsync = createAsyncThunk(
  'products/getmoreproducts',
  async (creds: string) => {
    const response = await getNextProds(creds);
    return response.data;
  }
);

// Slice for managing products and categories
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Define reducers if needed
  

  },

  extraReducers: (builder) => {
    builder
      // Fulfilled action for fetching all products
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload
        // Adding unique categories to the categories array
        state.products.results.forEach((e: Product) => { !state.categories.includes(e.category) && state.categories.push(e.category) }
        )
      })
      // Fulfilled action for fetching more products
      .addCase(getMoreProdsAsync.fulfilled, (state, action) => {
        state.products = action.payload
      })
  },
});

// Export action creators, selectors, and reducer
export const { } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.productz.products;
export const selectCategories = (state: RootState) => state.productz.categories;

export default productsSlice.reducer;
