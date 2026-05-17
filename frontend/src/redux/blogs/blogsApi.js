import axiosInstance from '../../app/axiosinstance';

const BASE = '/blogs';

export const fetchBlogsApi = (params = {}) =>
  axiosInstance.get(`${BASE}?t=${Date.now()}`, { params });

export const fetchBlogByIdApi = (id) =>
  axiosInstance.get(`${BASE}/${id}`);

export const fetchBlogBySlugApi = (slug) =>
  axiosInstance.get(`${BASE}/slug/${slug}`);

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