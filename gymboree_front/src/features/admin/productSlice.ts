import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { addProdFetch, getAllProducts, rmv_prod } from './productAPI';
import Product from "../../models/Product"

// Initial state for the product slice
const initialState: Product = {
  name: "",
  description: "",
  price: 0,
  image: "",
  amount: 1,
  category: ""
};

/**
 * Async thunk to add a product to the store.
 */
export const addProdAsync = createAsyncThunk(
  'product/addProd',
  async (creds: any) => {
    console.log(creds.image.name)
    const response = await addProdFetch(creds);
    return response.data;
  }
);

/**
 * Async thunk to remove a product from the store.
 */
export const removeProdAsync = createAsyncThunk(
  'product/rmvProd',
  async (creds: any) => {
    console.log(creds)
    const response = await rmv_prod(creds);
    return response.data;
  }
);

/**
 * Redux slice for managing product state.
 */
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // You can add any additional reducer actions here if needed
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(addProdAsync.fulfilled, (state, action) => { // Handle fulfillment of add product async thunk
        console.log(action.payload)
      })
      .addCase(removeProdAsync.fulfilled, (state, action) => { // Handle fulfillment of remove product async thunk
        console.log(action.payload)
      })
    
  },
});


// Export actions and reducer from the slice
export const { } = productSlice.actions;
export default productSlice.reducer;
