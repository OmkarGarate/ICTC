import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCancersApi,
  fetchCancerByIdApi,
  fetchCancerBySlugApi,
  createCancerApi,
  updateCancerApi,
  deleteCancerApi,
  restoreCancerApi,
} from './cancersApi';
import { CANCERS_INITIAL_STATE } from './cancersTypes';

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchCancers = createAsyncThunk(
  'cancers/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetchCancersApi(params);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch cancers');
    }
  },
);

export const fetchCancerById = createAsyncThunk(
  'cancers/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchCancerByIdApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Cancer not found');
    }
  },
);

export const fetchCancerBySlug = createAsyncThunk(
  'cancers/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetchCancerBySlugApi(slug);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Cancer not found');
    }
  },
);

export const createCancer = createAsyncThunk(
  'cancers/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createCancerApi(formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create cancer');
    }
  },
);

export const updateCancer = createAsyncThunk(
  'cancers/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateCancerApi(id, formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update cancer');
    }
  },
);

export const deleteCancer = createAsyncThunk(
  'cancers/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCancerApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete cancer');
    }
  },
);

export const restoreCancer = createAsyncThunk(
  'cancers/restore',
  async (id, { rejectWithValue }) => {
    try {
      const res = await restoreCancerApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to restore cancer');
    }
  },
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const cancersSlice = createSlice({
  name: 'cancers',
  initialState: CANCERS_INITIAL_STATE,

  reducers: {
    clearSelectedCancer(state) { state.selected = null; },
    clearCancersError(state) { state.error = null; },
  },

  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchCancers.pending, pending)
      .addCase(fetchCancers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchCancers.rejected, rejected);

    builder
      .addCase(fetchCancerById.pending, pending)
      .addCase(fetchCancerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchCancerById.rejected, rejected);

    builder
      .addCase(fetchCancerBySlug.pending, pending)
      .addCase(fetchCancerBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchCancerBySlug.rejected, rejected);

    builder
      .addCase(createCancer.pending, pending)
      .addCase(createCancer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(createCancer.rejected, rejected);

    builder
      .addCase(updateCancer.pending, pending)
      .addCase(updateCancer.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((c) => c.id === action.payload?.id);
        if (idx !== -1) state.list[idx] = action.payload;
        if (state.selected?.id === action.payload?.id) state.selected = action.payload;
      })
      .addCase(updateCancer.rejected, rejected);

    builder
      .addCase(deleteCancer.pending, pending)
      .addCase(deleteCancer.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCancer.rejected, rejected);

    builder
      .addCase(restoreCancer.pending, pending)
      .addCase(restoreCancer.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((c) => c.id === action.payload?.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(restoreCancer.rejected, rejected);
  },
});

export const { clearSelectedCancer, clearCancersError } = cancersSlice.actions;
export default cancersSlice.reducer;