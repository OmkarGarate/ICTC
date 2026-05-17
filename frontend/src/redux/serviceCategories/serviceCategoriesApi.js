import axiosInstance from '../../app/axiosinstance';

const BASE = '/service-categories';

/** GET /service-categories */
export const fetchServiceCategoriesApi = () =>
  axiosInstance.get(BASE);

/** POST /service-categories */
export const createServiceCategoryApi = (data) =>
  axiosInstance.post(BASE, data);

/** PUT /service-categories/:id */
export const updateServiceCategoryApi = (id, data) =>
  axiosInstance.put(`${BASE}/${id}`, data);

/** DELETE /service-categories/:id */
export const deleteServiceCategoryApi = (id) =>
  axiosInstance.delete(`${BASE}/${id}`);