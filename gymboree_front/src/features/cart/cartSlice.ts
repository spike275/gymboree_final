import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { sendOrder } from './cartAPI';
import { Cart } from "../../models/Cart"
import Product from '../../models/Product';

// Initial state for the cart slice
const initialState: Cart = {
  products: []
};


/**
 * Async thunk to send an order.
 */
export const orderAsync = createAsyncThunk(
  'order/orderSend',
  async (creds: any) => {
    console.log(creds)
    const response = await sendOrder(creds);
    return response.data;
  }
);

/**
 * Redux slice for managing the cart state.
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Adds a product to the cart.
    addToCart: (state, action) => {
      const tmpItem: Product = action.payload
      const tmpAr: Product[] = state.products.filter(x => x.id === tmpItem.id)
      // check if item already exists in products array
      if (tmpAr.length > 0) {
        tmpAr[0].amount += 1
      } else {
        // if doesn't exist will push
        const tmp: Product = { ...action.payload, amount: 1 }
        state.products.push(tmp)
      }

    },
    remove_prod_cart: (state, action) => {
      // remove product from cart regardless amount
      const tmpItem: any = action.payload
      state.products = state.products.filter(x => x.id != tmpItem.id)

    },
    //Changes the amount of a product in the cart.
    change_amount: (state, action) => {
      const tmpAr = state.products.filter(x => x.id === action.payload.id)
      {
        action.payload.amount === 1 ? tmpAr[0].amount += 1 : tmpAr[0].amount += -1
      }

      if (tmpAr[0].amount === 0) {
        state.products = state.products.filter(x => x.id != action.payload.id)
      }

    },





  },

  extraReducers: (builder) => {
    builder

      .addCase(orderAsync.fulfilled, (state, action) => {
        console.log(action.payload)
      })
  },
});

// Export actions, selectors, and reducer from the slice
export const { addToCart, remove_prod_cart, change_amount } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.products;
export default cartSlice.reducer;