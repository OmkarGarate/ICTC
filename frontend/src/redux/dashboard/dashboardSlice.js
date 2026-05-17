import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDashboardStatsApi } from './dashboardApi';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchDashboardStatsApi();
      return res.data?.data || res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load dashboard stats',
      );
    }
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      totalCenters: null,
      totalDoctors: null,
      totalBlogs: null,
      cancerTypes: null,
      services: null,
      appointments: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearDashboardError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload || state.stats;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
