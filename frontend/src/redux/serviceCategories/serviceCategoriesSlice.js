import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchServiceCategoriesApi,
  createServiceCategoryApi,
  updateServiceCategoryApi,
  deleteServiceCategoryApi,
} from './serviceCategoriesApi';

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchServiceCategories = createAsyncThunk(
  'serviceCategories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchServiceCategoriesApi();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  },
);

export const createServiceCategory = createAsyncThunk(
  'serviceCategories/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await createServiceCategoryApi(data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create category');
    }
  },
);

export const updateServiceCategory = createAsyncThunk(
  'serviceCategories/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateServiceCategoryApi(id, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update category');
    }
  },
);

export const deleteServiceCategory = createAsyncThunk(
  'serviceCategories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteServiceCategoryApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete category');
    }
  },
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const serviceCategoriesSlice = createSlice({
  name: 'serviceCategories',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearServiceCategoriesError(state) { state.error = null; },
  },

  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchServiceCategories.pending, pending)
      .addCase(fetchServiceCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchServiceCategories.rejected, rejected);

    builder
      .addCase(createServiceCategory.pending, pending)
      .addCase(createServiceCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.push(action.payload);
        // re-sort by sequence
        state.list.sort((a, b) => a.sequence - b.sequence);
      })
      .addCase(createServiceCategory.rejected, rejected);

    builder
      .addCase(updateServiceCategory.pending, pending)
      .addCase(updateServiceCategory.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((c) => c.id === action.payload?.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.list.sort((a, b) => a.sequence - b.sequence);
      })
      .addCase(updateServiceCategory.rejected, rejected);

    builder
      .addCase(deleteServiceCategory.pending, pending)
      .addCase(deleteServiceCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteServiceCategory.rejected, rejected);
  },
});

export const { clearServiceCategoriesError } = serviceCategoriesSlice.actions;
export default serviceCategoriesSlice.reducer;