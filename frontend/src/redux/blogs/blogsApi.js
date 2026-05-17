import axiosInstance from '../../app/axiosinstance';

const BASE = '/blogs';

export const fetchBlogsApi = (params = {}) =>
  axiosInstance.get(`${BASE}?t=${Date.now()}`, { params });

export const fetchBlogByIdApi = (id) =>
  axiosInstance.get(`${BASE}/${id}`);

export const fetchBlogBySlugApi = (slug) =>
  axiosInstance.get(`${BASE}/slug/${slug}`);

/**
 * Fetch blogs in the same category as the given blog id.
 * GET /blogs/:id/similar?limit=3
 */
export const fetchSimilarBlogsApi = (id, limit = 3) =>
  axiosInstance.get(`${BASE}/${id}/similar?limit=${limit}`);

/**
 * Fetch distinct category strings from all active blogs.
 * GET /blogs/categories
 */
export const fetchBlogCategoriesApi = () =>
  axiosInstance.get(`${BASE}/categories`);

export const createBlogApi = (formData) =>
  axiosInstance.post(BASE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateBlogApi = (id, formData) =>
  axiosInstance.put(`${BASE}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteBlogApi = (id) =>
  axiosInstance.delete(`${BASE}/${id}`);

export const restoreBlogApi = (id) =>
  axiosInstance.put(`${BASE}/restore/${id}`);