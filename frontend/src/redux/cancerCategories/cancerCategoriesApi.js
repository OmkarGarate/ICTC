import axiosInstance from '../../app/axiosinstance';

const BASE = '/cancer-categories';

/** GET /cancer-categories */
export const fetchCancerCategoriesApi = () =>
  axiosInstance.get(BASE);

/** POST /cancer-categories */
export const createCancerCategoryApi = (data) =>
  axiosInstance.post(BASE, data);

/** PUT /cancer-categories/:id */
export const updateCancerCategoryApi = (id, data) =>
  axiosInstance.put(`${BASE}/${id}`, data);

/** DELETE /cancer-categories/:id */
export const deleteCancerCategoryApi = (id) =>
  axiosInstance.delete(`${BASE}/${id}`);    