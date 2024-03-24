import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import axios from "axios";
import { API_URL } from "../../http";

export const fetchSignUp = createAsyncThunk(
  "api/fetchSignUp",
  async ({ email, password }) => {
    try {
      const response = await AuthService.signup(email, password);
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSignIn = createAsyncThunk(
  "api/fetchSignIn",
  async ({ email, password }) => {
    try {
      const response = await AuthService.signin(email, password);
      localStorage.setItem("token", response.data.accessToken);
      return response.data.isActivate;
    } catch (error) {
      throw error;
    }
  }
);

export const UserLogout = createAsyncThunk("api/UserLogout", async () => {
  try {
    localStorage.removeItem("token");
    const response = await AuthService.logout();
  } catch (e) {
    console.log(e.response?.data?.message);
  }
});

export const UserChekAuth = createAsyncThunk("api/UserChekAuth ", async () => {
  try {
    const response = await axios.get(`${API_URL}/user/refresh`, {
      withCredentials: true,
    });
    console.log(response);
    localStorage.setItem("token", response.data);
  } catch (e) {
    console.log(e.response?.data?.message);
  }
});

export const ActiveOTP = createAsyncThunk(
  "api/ActiveOTP",
  async ({ email, password, otpPassword }) => {
    try {
      const response = await AuthService.activate(email, password, otpPassword);
      localStorage.setItem("token", response.data.accessToken);
      return response.data.isActivate;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    isLoading: false,
    isAuth: false,
    isActivate: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.userData = action.payload;
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSignIn.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(UserLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isActivate = false;
      })
      .addCase(UserLogout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(UserChekAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserChekAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(UserChekAuth.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(ActiveOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ActiveOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isActivate = action.payload;
      })
      .addCase(ActiveOTP.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
