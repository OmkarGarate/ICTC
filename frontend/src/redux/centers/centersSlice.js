import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCentersApi,
  fetchCenterByIdApi,
  createCenterApi,
  updateCenterApi,
  deleteCenterApi,
  restoreCenterApi,
} from './centersApi';
import { CENTERS_INITIAL_STATE } from './centersTypes';

// ─── Thunks ──────────────────────────────────────────────────────────────────

/** Fetch ALL centers — used by the admin Manage Centers table */
export const fetchCenters = createAsyncThunk(
  'centers/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetchCentersApi(params);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch centers');
    }
  },
);

/**
 * Fetch only ACTIVE (non-deleted) centers.
 * Used in doctor assignment dropdowns so deleted centers never appear.
 * Pass { isDeleted: false } — adjust the key to match your backend query param.
 */
export const fetchActiveCenters = createAsyncThunk(
  'centers/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCentersApi({ isDeleted: false });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch active centers');
    }
  },
);

export const fetchCenterById = createAsyncThunk(
  'centers/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchCenterByIdApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Center not found');
    }
  },
);

export const createCenter = createAsyncThunk(
  'centers/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createCenterApi(formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create center');
    }
  },
);

export const updateCenter = createAsyncThunk(
  'centers/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCenterApi(id, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update center');
    }
  },
);

export const deleteCenter = createAsyncThunk(
  'centers/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCenterApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete center');
    }
  },
);

export const restoreCenter = createAsyncThunk(
  'centers/restore',
  async (id, { rejectWithValue }) => {
    try {
      const res = await restoreCenterApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to restore center');
    }
  },
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const centersSlice = createSlice({
  name: 'centers',
  initialState: CENTERS_INITIAL_STATE,

  reducers: {
    clearSelectedCenter(state) { state.selected = null; },
    clearCentersError(state)   { state.error = null; },
  },

  extraReducers: (builder) => {
    const pending  = (state)          => { state.loading = true;  state.error = null; };
    const rejected = (state, action)  => { state.loading = false; state.error = action.payload; };

    // fetchCenters (admin table — all records)
    builder
      .addCase(fetchCenters.pending, pending)
      .addCase(fetchCenters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchCenters.rejected, rejected);

    // fetchActiveCenters (doctor assignment — non-deleted only)
    builder
      .addCase(fetchActiveCenters.pending, pending)
      .addCase(fetchActiveCenters.fulfilled, (state, action) => {
        state.loading = false;
        state.activeCenters = action.payload || [];
      })
      .addCase(fetchActiveCenters.rejected, rejected);

    // fetchCenterById
    builder
      .addCase(fetchCenterById.pending, pending)
      .addCase(fetchCenterById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchCenterById.rejected, rejected);

    // createCenter
    builder
      .addCase(createCenter.pending, pending)
      .addCase(createCenter.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.list.unshift(action.payload);
          // A newly created center is active, so add it there too
          state.activeCenters.unshift(action.payload);
        }
      })
      .addCase(createCenter.rejected, rejected);

    // updateCenter
    builder
      .addCase(updateCenter.pending, pending)
      .addCase(updateCenter.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (!updated) return;

        // Patch in both lists
        const listIdx = state.list.findIndex((c) => c.id === updated.id);
        if (listIdx !== -1) state.list[listIdx] = updated;

        const activeIdx = state.activeCenters.findIndex((c) => c.id === updated.id);
        if (activeIdx !== -1) state.activeCenters[activeIdx] = updated;

        if (state.selected?.id === updated.id) state.selected = updated;
      })
      .addCase(updateCenter.rejected, rejected);

    // deleteCenter — remove from BOTH lists so doctor dropdowns update instantly
    builder
      .addCase(deleteCenter.pending, pending)
      .addCase(deleteCenter.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.list          = state.list.filter((c) => c.id !== deletedId);
        state.activeCenters = state.activeCenters.filter((c) => c.id !== deletedId);
      })
      .addCase(deleteCenter.rejected, rejected);

    // restoreCenter — add back to activeCenters
    builder
      .addCase(restoreCenter.pending, pending)
      .addCase(restoreCenter.fulfilled, (state, action) => {
        state.loading = false;
        const restored = action.payload;
        if (!restored) return;

        const listIdx = state.list.findIndex((c) => c.id === restored.id);
        if (listIdx !== -1) state.list[listIdx] = restored;

        // Add back to active list if not already there
        const alreadyActive = state.activeCenters.some((c) => c.id === restored.id);
        if (!alreadyActive) state.activeCenters.push(restored);
      })
      .addCase(restoreCenter.rejected, rejected);
  },
});

export const { clearSelectedCenter, clearCentersError } = centersSlice.actions;
export default centersSlice.reducer;