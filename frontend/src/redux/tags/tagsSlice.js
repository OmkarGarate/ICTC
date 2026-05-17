import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../app/axiosinstance';

export const fetchTags = createAsyncThunk(
  'tags/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/tags');
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch tags');
    }
  },
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tagsSlice.reducer;