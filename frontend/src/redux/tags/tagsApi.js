import axiosInstance from '../../app/axiosinstance';

const BASE = '/tags';

/** GET /tags */
export const fetchTagsApi = () =>
  axiosInstance.get(BASE);