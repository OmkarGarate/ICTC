import axiosInstance from '../../app/axiosinstance';

const BASE = '/cancers';

/** GET /cancers */
export const fetchCancersApi = (params = {}) =>
  axiosInstance.get(BASE, { params });

/** GET /cancers/:id */
export const fetchCancerByIdApi = (id) =>
  axiosInstance.get(`${BASE}/${id}`);

/** GET /cancers/slug/:slug */
export const fetchCancerBySlugApi = (slug) =>
  axiosInstance.get(`${BASE}/slug/${slug}`);

/**
 * POST /cancers  (multipart: coverImage)
 * @param {FormData} formData
 */
export const createCancerApi = (formData) =>
  axiosInstance.post(BASE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/**
 * PUT /cancers/:id  (multipart: coverImage optional)
 * @param {number}   id
 * @param {FormData} formData
 */
export const updateCancerApi = (id, formData) =>
  axiosInstance.put(`${BASE}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/** DELETE /cancers/:id */
export const deleteCancerApi = (id) =>
  axiosInstance.delete(`${BASE}/${id}`);

/** PUT /cancers/restore/:id */
export const restoreCancerApi = (id) =>
  axiosInstance.put(`${BASE}/restore/${id}`);

/**
 * POST /cancers/upload-content-image
 * Used by the TipTap editor to upload inline images.
 * @param {FormData} formData — field name: "file"
 */
export const uploadCancerContentImageApi = (formData) =>
  axiosInstance.post(`${BASE}/upload-content-image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });