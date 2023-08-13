import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/admin/productSlice';
import cartReducer, { orderAsync } from '../features/cart/cartSlice';
import loginReducer from '../features/login/loginSlice';
import productsReducer from '../features/Home/manyProductsSlice';
import myOrdersReducer from '../features/MyOrders/myOrdersSlice';
import reviewReducer from '../features/review/reviewSlice';

/**
 * The root store configuration.
 */
export const store = configureStore({
  reducer: {
    login: loginReducer,
    product: productReducer,
    cart: cartReducer,
    productz: productsReducer,
    myOrders: myOrdersReducer,
    review:reviewReducer
  },
});

//The dispatch function type derived from the store.
export type AppDispatch = typeof store.dispatch;

//The root state type derived from the store.
export type RootState = ReturnType<typeof store.getState>;

/**
 * A thunk action type that encapsulates asynchronous logic.
 */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
