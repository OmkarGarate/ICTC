import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchServicesApi,
  fetchServiceByIdApi,
  fetchServiceBySlugApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi,
  restoreServiceApi,
} from './servicesApi';
import { SERVICES_INITIAL_STATE } from './servicesTypes';

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchServices = createAsyncThunk(
  'services/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetchServicesApi(params);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch services');
    }
  },
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchServiceByIdApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Service not found');
    }
  },
);

export const fetchServiceBySlug = createAsyncThunk(
  'services/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetchServiceBySlugApi(slug);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Service not found');
    }
  },
);

export const createService = createAsyncThunk(
  'services/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createServiceApi(formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create service');
    }
  },
);

export const updateService = createAsyncThunk(
  'services/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateServiceApi(id, formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update service');
    }
  },
);

export const deleteService = createAsyncThunk(
  'services/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteServiceApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete service');
    }
  },
);

export const restoreService = createAsyncThunk(
  'services/restore',
  async (id, { rejectWithValue }) => {
    try {
      const res = await restoreServiceApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to restore service');
    }
  },
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const servicesSlice = createSlice({
  name: 'services',
  initialState: SERVICES_INITIAL_STATE,

  reducers: {
    clearSelectedService(state) { state.selected = null; },
    clearServicesError(state) { state.error = null; },
  },

  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchServices.pending, pending)
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchServices.rejected, rejected);

    builder
      .addCase(fetchServiceById.pending, pending)
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchServiceById.rejected, rejected);

    builder
      .addCase(fetchServiceBySlug.pending, pending)
      .addCase(fetchServiceBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchServiceBySlug.rejected, rejected);

    builder
      .addCase(createService.pending, pending)
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(createService.rejected, rejected);

    builder
      .addCase(updateService.pending, pending)
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((s) => s.id === action.payload?.id);
        if (idx !== -1) state.list[idx] = action.payload;
        if (state.selected?.id === action.payload?.id) state.selected = action.payload;
      })
      .addCase(updateService.rejected, rejected);

    builder
      .addCase(deleteService.pending, pending)
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteService.rejected, rejected);

    builder
      .addCase(restoreService.pending, pending)
      .addCase(restoreService.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((s) => s.id === action.payload?.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(restoreService.rejected, rejected);
  },
});

export const { clearSelectedService, clearServicesError } = servicesSlice.actions;
export default servicesSlice.reducer;