import { configureStore } from '@reduxjs/toolkit';
import authReducer             from '../redux/auth/authSlice';
import doctorsReducer          from '../redux/doctors/doctorsSlice';
import centersReducer          from '../redux/centers/centersSlice';
import servicesReducer         from '../redux/services/servicesSlice';
import serviceCategoriesReducer from '../redux/serviceCategories/serviceCategoriesSlice';
import cancersReducer          from '../redux/cancers/cancersSlice';
import cancerCategoriesReducer from '../redux/cancerCategories/cancerCategoriesSlice';
import toastReducer            from '../redux/toast/toastSlice';
import blogsReducer            from '../redux/blogs/blogsSlice';
import tagsReducer             from '../redux/tags/tagsSlice';
import dashboardReducer        from '../redux/dashboard/dashboardSlice';

import { toastMiddleware } from '../middleware/Toastmiddleware';

const store = configureStore({
  reducer: {
    auth:               authReducer,
    doctors:            doctorsReducer,
    centers:            centersReducer,
    services:           servicesReducer,
    serviceCategories:  serviceCategoriesReducer,
    cancers:            cancersReducer,
    cancerCategories:   cancerCategoriesReducer,
    toast:              toastReducer,
    blogs:              blogsReducer,
    tags:               tagsReducer,
    dashboard:          dashboardReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toastMiddleware),
});

export default store;