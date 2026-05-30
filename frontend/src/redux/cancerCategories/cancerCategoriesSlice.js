import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCancerCategoriesApi,
  createCancerCategoryApi,
  updateCancerCategoryApi,
  deleteCancerCategoryApi,
} from './cancerCategoriesApi';

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchCancerCategories = createAsyncThunk(
  'cancerCategories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCancerCategoriesApi();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  },
);

export const createCancerCategory = createAsyncThunk(
  'cancerCategories/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await createCancerCategoryApi(data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create category');
    }
  },
);

export const updateCancerCategory = createAsyncThunk(
  'cancerCategories/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCancerCategoryApi(id, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update category');
    }
  },
);

export const deleteCancerCategory = createAsyncThunk(
  'cancerCategories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCancerCategoryApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete category');
    }
  },
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const cancerCategoriesSlice = createSlice({
  name: 'cancerCategories',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearCancerCategoriesError(state) { state.error = null; },
  },

  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchCancerCategories.pending, pending)
      .addCase(fetchCancerCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchCancerCategories.rejected, rejected);

    builder
      .addCase(createCancerCategory.pending, pending)
      .addCase(createCancerCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.push(action.payload);
        state.list.sort((a, b) => a.sequence - b.sequence);
      })
      .addCase(createCancerCategory.rejected, rejected);

    builder
      .addCase(updateCancerCategory.pending, pending)
      .addCase(updateCancerCategory.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((c) => c.id === action.payload?.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.list.sort((a, b) => a.sequence - b.sequence);
      })
      .addCase(updateCancerCategory.rejected, rejected);

    builder
      .addCase(deleteCancerCategory.pending, pending)
      .addCase(deleteCancerCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCancerCategory.rejected, rejected);
  },
});

export const { clearCancerCategoriesError } = cancerCategoriesSlice.actions;
export default cancerCategoriesSlice.reducer;