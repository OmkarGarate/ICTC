import axiosInstance from '../../app/axiosinstance';

const BASE = '/services';

/** GET /services */
export const fetchServicesApi = (params = {}) =>
  axiosInstance.get(BASE, { params });

/** GET /services/:id */
export const fetchServiceByIdApi = (id) =>
  axiosInstance.get(`${BASE}/${id}`);

/** GET /services/slug/:slug */
export const fetchServiceBySlugApi = (slug) =>
  axiosInstance.get(`${BASE}/slug/${slug}`);

/**
 * POST /services  (multipart: coverImage)
 * @param {FormData} formData
 */
export const createServiceApi = (formData) =>
  axiosInstance.post(BASE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/**
 * PUT /services/:id  (multipart: coverImage optional)
 * @param {number}   id
 * @param {FormData} formData
 */
export const updateServiceApi = (id, formData) =>
  axiosInstance.put(`${BASE}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/** DELETE /services/:id */
export const deleteServiceApi = (id) =>
  axiosInstance.delete(`${BASE}/${id}`);

/** PUT /services/restore/:id */
export const restoreServiceApi = (id) =>
  axiosInstance.put(`${BASE}/restore/${id}`);

/**
 * POST /services/upload-content-image
 * Used by the TipTap editor to upload inline images.
 * @param {FormData} formData — field name: "file"
 */
export const uploadContentImageApi = (formData) =>
  axiosInstance.post(`${BASE}/upload-content-image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });