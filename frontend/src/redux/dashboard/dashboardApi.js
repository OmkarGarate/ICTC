import axiosInstance from '../../app/axiosinstance';

export const fetchDashboardStatsApi = () =>
  axiosInstance.get('/dashboard/stats');
