import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, getMeApi, logoutApi } from "./authApi";
import { AUTH_INITIAL_STATE } from "./authTypes";

/* ================= LOGIN ================= */

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginApi(credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/* ================= REGISTER ================= */

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerApi(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

/* ================= GET CURRENT USER (called once on app load) ================= */

export const fetchCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMeApi();
      // /auth/me returns { userId, username } from the JWT strategy
      return res.data.data ?? res.data;
    } catch {
      return rejectWithValue(null); // no valid cookie — silent fail
    }
  }
);

/* ================= LOGOUT ================= */

export const logoutUserAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,

  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {

    /* ── Login ───────────────────────────────────────── */
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        // user details will be set by the fetchCurrentUser call
        // that AdminLogin dispatches right after loginUser succeeds
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ── Register ────────────────────────────────────── */
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ── Fetch current user (rehydrate on page refresh) ── */
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.initialized = true; // ← still mark done even if no session
        state.isAuthenticated = false;
        state.user = null;
      });

    /* ── Logout ──────────────────────────────────────── */
    builder
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
