import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchDoctorsApi,
  fetchDoctorByIdApi,
  fetchDoctorBySlugApi,
  createDoctorApi,
  updateDoctorApi,
  deleteDoctorApi,
  restoreDoctorApi,
} from './doctorsApi';
import { DOCTORS_INITIAL_STATE } from './doctorsTypes';

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchAll',
  async (params, { rejectWithValue }) => {
    try {

      const res = await fetchDoctorsApi(params);

      console.log("FETCH DOCTORS RESPONSE:", res.data);

      return res.data.data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch doctors'
      );
    }
  },
);

export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchDoctorByIdApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Doctor not found');
    }
  },
);

export const fetchDoctorBySlug = createAsyncThunk(
  'doctors/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetchDoctorBySlugApi(slug);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Doctor not found');
    }
  },
);

export const createDoctor = createAsyncThunk(
  'doctors/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createDoctorApi(formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create doctor');
    }
  },
);

export const updateDoctor = createAsyncThunk(
  'doctors/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateDoctorApi(id, formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update doctor');
    }
  },
);

export const deleteDoctor = createAsyncThunk(
  'doctors/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoctorApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete doctor');
    }
  },
);

export const restoreDoctor = createAsyncThunk(
  'doctors/restore',
  async (id, { rejectWithValue }) => {
    try {
      const res = await restoreDoctorApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to restore doctor');
    }
  },
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: DOCTORS_INITIAL_STATE,

  reducers: {
    clearSelectedDoctor(state) {
      state.selected = null;
    },
    clearDoctorsError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    // fetchAll
    builder
      .addCase(fetchDoctors.pending, pending)
      .addCase(fetchDoctors.fulfilled, (state, action) => {
  state.loading = false;

  state.list = Array.isArray(action.payload)
    ? action.payload
    : [];
})
      .addCase(fetchDoctors.rejected, rejected);

    // fetchById / fetchBySlug
    builder
      .addCase(fetchDoctorById.pending, pending)
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchDoctorById.rejected, rejected);

    builder
      .addCase(fetchDoctorBySlug.pending, pending)
      .addCase(fetchDoctorBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchDoctorBySlug.rejected, rejected);

    // create
    builder
      .addCase(createDoctor.pending, pending)
      .addCase(createDoctor.fulfilled, (state, action) => {
  state.loading = false;

  if (!Array.isArray(state.list)) {
    state.list = [];
  }

  if (action.payload) {
    state.list.unshift(action.payload);
  }
})
      .addCase(createDoctor.rejected, rejected);

    // update
    builder
      .addCase(updateDoctor.pending, pending)
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((d) => d.id === action.payload?.id);
        if (idx !== -1) state.list[idx] = action.payload;
        if (state.selected?.id === action.payload?.id) state.selected = action.payload;
      })
      .addCase(updateDoctor.rejected, rejected);

    // delete (soft)
    builder
      .addCase(deleteDoctor.pending, pending)
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((d) => d.id !== action.payload);
      })
      .addCase(deleteDoctor.rejected, rejected);

    // restore
    builder
      .addCase(restoreDoctor.pending, pending)
      .addCase(restoreDoctor.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((d) => d.id === action.payload?.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(restoreDoctor.rejected, rejected);
  },
});

export const { clearSelectedDoctor, clearDoctorsError } = doctorsSlice.actions;
export default doctorsSlice.reducer;