import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import MyOrders, { Order } from "../../models/myOrders"
import Product from '../../models/Product';
import { getOrders } from './myOrderAPI';

//  THIS STATE HOLDS ALL THE ORDERS THE USER MADE

// The initial state of the MyOrders slice
const initialState: MyOrders = {
  orders: [],
  productsOrderd: []
};

// Async thunk to fetch user's orders
export const userOrdersAsync = createAsyncThunk(
  'myorder/usersOrders',
  async () => {
    const response = await getOrders();
    return response.data;
  }
);

// Slice for managing user's orders
export const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {
    // Reducers if needed in the future
  
  },

  // Reducers for handling async actions
  extraReducers: (builder) => {
    builder
      .addCase(userOrdersAsync.fulfilled, (state, action) => {
        // Update the orders array with fetched orders
        state.orders = [...action.payload]
        // Loop through orders and their order items
        state.orders.forEach((order: any) => {
          order.orderItems.forEach((product: any) => {
              // Check if the product isn't already included in the productsOrderd array
              { !state.productsOrderd.includes(product.product) && state.productsOrderd.push(product.product) }
          });
        });
      })
  },
});

// Export actions, selectors, and reducer
export const { } = myOrdersSlice.actions;
export const selectOrders = (state: RootState) => state.myOrders.orders;
export const selectProdctsOrderd = (state: RootState) => state.myOrders.productsOrderd;

export default myOrdersSlice.reducer;
