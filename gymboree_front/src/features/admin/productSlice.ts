import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { addProdFetch, getAllProducts, rmv_prod } from './productAPI';
import Product from "../../models/Product"


const initialState: Product = {
  name: "",
  description: "",
  price: 0,
  image: "",
  amount: 1,
  category: ""
};

export const addProdAsync = createAsyncThunk(
  'product/addProd',
  async (creds: any) => {
    console.log(creds.image.name)
    const response = await addProdFetch(creds);
    return response.data;
  }
);

export const removeProdAsync = createAsyncThunk(
  'product/rmvProd',
  async (creds: any) => {
    console.log(creds)
    const response = await rmv_prod(creds);
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
 
    


  },

  extraReducers: (builder) => {
    builder
      .addCase(addProdAsync.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(removeProdAsync.fulfilled, (state, action) => {
        console.log(action.payload)
      })
    
  },
});

export const { } = productSlice.actions;

export default productSlice.reducer;
