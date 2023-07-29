import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Review from '../../models/Review';
import { getReviews, sendNewReview } from './reviewAPI';

//  THIS STATE HOLDS ALL THE ORDERS THE USER MADE

const initialState: Review = {
  all_reviews: {}
};

export const getReviewsAsync = createAsyncThunk(
  'Reviews/Reviews',
  async () => {
    const response = await getReviews();
    return response.data;
  }
);

export const sendReview = createAsyncThunk(
  "Reviews/sendreview",
  async ({ productId, rating, title, text}: { productId: string, rating: number, title: string, text: string,}) => {
    const response = await sendNewReview({ productId, title, text, rating});
    return response.data;
  }
);


export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getReviewsAsync.fulfilled, (state, action) => {
        // creates an object with all product ratings
        // Use reduce to calculate the sum and count of ratings for each product
        const tmpAr = [...action.payload]
        const productRatings = tmpAr.reduce((acc: any, curr: any) => {
          const { product, rating } = curr;
          acc[product] = acc[product] || { product, ratingSum: 0, ratingCount: 0 };
          acc[product].ratingSum += rating;
          acc[product].ratingCount++;
          return acc;
        }, {});

        // Use map to calculate the average rating for each product
        const avgRatings = Object.values(productRatings).map((product: any) => ({
          product: product.product,
          avgRating: product.ratingSum / product.ratingCount,
        }));

        // Output the final list of objects containing the average rating for each product
        state.all_reviews = avgRatings


      })

  },
});



export const { } = reviewSlice.actions;
export const selectAllReviews = (state: RootState) => state.review.all_reviews;

export default reviewSlice.reducer;
