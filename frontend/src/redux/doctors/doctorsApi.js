import axiosInstance from '../../app/axiosinstance';

const BASE = '/doctors';

/** GET /doctors */
export const fetchDoctorsApi = (params = {}) =>
  axiosInstance.get(BASE, { params });

/** GET /doctors/:id */
export const fetchDoctorByIdApi = (id) =>
  axiosInstance.get(`${BASE}/${id}`);

/** GET /doctors/slug/:slug */
export const fetchDoctorBySlugApi = (slug) =>
  axiosInstance.get(`${BASE}/slug/${slug}`);

/**
 * POST /doctors
 * @param {FormData} formData — multipart (includes image file if any)
 */
export const createDoctorApi = (formData) =>
  axiosInstance.post(BASE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/**
 * PUT /doctors/:id
 * @param {number} id
 * @param {FormData} formData
 */
export const updateDoctorApi = (id, formData) =>
  axiosInstance.put(`${BASE}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

/** DELETE /doctors/:id (soft delete) */
export const deleteDoctorApi = (id) =>
  axiosInstance.delete(`${BASE}/${id}`);

/** PUT /doctors/restore/:id */
export const restoreDoctorApi = (id) =>
  axiosInstance.put(`${BASE}/restore/${id}`);