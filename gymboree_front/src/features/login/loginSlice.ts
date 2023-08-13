import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { refreshUser, userFetch, userRegister } from './loginAPI';
import jwt_decode from "jwt-decode"
import { toast } from 'react-toastify';


// Define the initial state for the login slice
export interface LoginSlice {
  userLogged: string
  isAdmin: boolean
}

const initialState: LoginSlice = {
  userLogged: "",
  isAdmin: false,

};

// Define an asynchronous thunk to handle user login
export const loginAsync = createAsyncThunk(
  'login/userFetch',
  async (creds: any) => {
    const response = await userFetch(creds);
    return response.data;

  }
);

// Define an asynchronous thunk to handle user registration
export const registerAsync = createAsyncThunk(
  'register/regUser',
  async (creds: any) => {
    const response = await userRegister(creds);
    return response.data;
  }
);

// Define an asynchronous thunk to refresh a user's token
export const refreshAsync = createAsyncThunk(
  'refresh/irefresh',
  async (refresh: any) => {
    const response = await refreshUser(refresh);
    return response.data;
  }
);

// Define an asynchronous thunk to handle user logout
export const logoutAsync = createAsyncThunk(
  'logout/logout',
  async (token: any) => {
    const response = await refreshUser(token);
    return response.data;
  }
);

// Create a slice for the login state
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Define a reducer to load user information into the state
    load_user: (state, action) => {
      state.userLogged = action.payload.username
      { action.payload.username == "admin" ? state.isAdmin = true : state.isAdmin = false }

    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        // Handle successful login, update state, and show a success toast
        localStorage.setItem('refresh', action.payload.refresh)
        localStorage.setItem('axx', action.payload.access)
        const tmp: any = jwt_decode(action.payload.access)
        state.userLogged = tmp.username
        { tmp.username == "admin" ? state.isAdmin = true : state.isAdmin = false }
        toast.success(`Welcome ${tmp.username}`, {
          position: toast.POSITION.TOP_CENTER
        })
      })
      .addCase(loginAsync.rejected, (state, action) => {
        // Handle login failure and show an error toast
        toast.error('Password or Username Incorrect', {
          position: toast.POSITION.TOP_CENTER
        })

      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        // Handle successful registration, update state, and show a success toast
        localStorage.setItem('refresh', action.payload.tokens.refresh)
        localStorage.setItem('axx', action.payload.tokens.access)
        state.userLogged = action.payload.user.username
        toast.success(`Registerd Successfully`, {
          position: toast.POSITION.TOP_CENTER
        })

      })
      .addCase(registerAsync.rejected, (state, action) => {
        // Handle registration failure and show an error toast
        console.log(action)
        toast.error(action.error.message, {
          position: toast.POSITION.TOP_CENTER
        })

      })


      .addCase(refreshAsync.fulfilled, (state, action) => {
        // Handle token refresh, update state
        localStorage.setItem('refresh', action.payload.refresh)
        localStorage.setItem('axx', action.payload.access)
        const tmp: any = jwt_decode(action.payload.access)
        state.userLogged = tmp.username

        { tmp.username == "admin" ? state.isAdmin = true : state.isAdmin = false }
      })

      .addCase(logoutAsync.fulfilled, (state, action) => {
        // Handle logout, update state
        const tmp: any = jwt_decode(action.payload.access)
        state.userLogged = ""
        { tmp.username == "admin" ? state.isAdmin = true : state.isAdmin = false }
      })
  },
});

// Export actions, selectors, and reducer from the slice
export const { load_user } = loginSlice.actions;
export const selectUser = (state: RootState) => state.login.userLogged;

export default loginSlice.reducer;
