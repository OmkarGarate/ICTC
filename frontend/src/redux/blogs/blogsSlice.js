import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchBlogsApi,
  fetchBlogByIdApi,
  fetchBlogBySlugApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  restoreBlogApi,
} from './blogsApi';
import { BLOGS_INITIAL_STATE } from './blogsTypes';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetchBlogsApi(params);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch blogs');
    }
  },
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchBlogByIdApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Blog not found');
    }
  },
);

export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetchBlogBySlugApi(slug);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Blog not found');
    }
  },
);

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createBlogApi(formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create blog');
    }
  },
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateBlogApi(id, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update blog');
    }
  },
);

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteBlogApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete blog');
    }
  },
);

export const restoreBlog = createAsyncThunk(
  'blogs/restore',
  async (id, { rejectWithValue }) => {
    try {
      const res = await restoreBlogApi(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to restore blog');
    }
  },
);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: BLOGS_INITIAL_STATE,

  reducers: {
    clearSelectedBlog(state)  { state.selected = null; },
    clearBlogsError(state)    { state.error = null; },
  },

  extraReducers: (builder) => {
    const pending  = (state)         => { state.loading = true;  state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchBlogs.pending, pending)
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchBlogs.rejected, rejected);

    builder
      .addCase(fetchBlogById.pending, pending)
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchBlogById.rejected, rejected);

    builder
      .addCase(fetchBlogBySlug.pending, pending)
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, rejected);

    builder
      .addCase(createBlog.pending, pending)
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(createBlog.rejected, rejected);

    builder
      .addCase(updateBlog.pending, pending)
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (!updated) return;
        const idx = state.list.findIndex((b) => b.id === updated.id);
        if (idx !== -1) {
          state.list = state.list.map((b) =>
            b.id === updated.id ? updated : b
          );
        }
        if (state.selected?.id === updated.id) state.selected = updated;
      })
      .addCase(updateBlog.rejected, rejected);

    builder
      .addCase(deleteBlog.pending, pending)
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((b) => b.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, rejected);

    builder
      .addCase(restoreBlog.pending, pending)
      .addCase(restoreBlog.fulfilled, (state, action) => {
        state.loading = false;
        const restored = action.payload;
        if (!restored) return;
        const idx = state.list.findIndex((b) => b.id === restored.id);
        if (idx !== -1) {
          state.list = state.list.map((b) =>
            b.id === restored.id ? restored : b
          );
        }
      })
      .addCase(restoreBlog.rejected, rejected);
  },
});

export const { clearSelectedBlog, clearBlogsError } = blogsSlice.actions;
export default blogsSlice.reducer;