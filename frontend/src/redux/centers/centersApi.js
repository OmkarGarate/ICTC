import axiosInstance from '../../app/axiosinstance';

const BASE = '/centers';

/**
 * GET /centers
 * Pass { activeOnly: true } to fetch only non-deleted centers (e.g. for doctor assignment dropdowns).
 * Pass no params (or {}) to get all centers (e.g. for the admin Manage Centers table).
 */
export const fetchCentersApi = (params = {}) =>
  axiosInstance.get(BASE, { params });

/** GET /centers/:id */
export const fetchCenterByIdApi = (id) =>
  axiosInstance.get(`${BASE}/${id}`);

/**
 * POST /centers  (multipart: heroImage, centerImage, gallery[])
 * @param {FormData} formData
 */
export const createCenterApi = (formData) =>
  axiosInstance.post(BASE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/**
 * PUT /centers/:id  (multipart: heroImage?, centerImage?, gallery[]?)
 * @param {number}   id
 * @param {FormData} formData
 */
export const updateCenterApi = (id, formData) =>
  axiosInstance.put(`${BASE}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/** DELETE /centers/:id */
export const deleteCenterApi = (id) =>
  axiosInstance.delete(`${BASE}/${id}`);

/** PUT /centers/restore/:id */
export const restoreCenterApi = (id) =>
  axiosInstance.put(`${BASE}/restore/${id}`);