import { addToast } from "../redux/toast/toastSlice";

// ─── Import thunks directly — no hardcoded strings ───────────────────────────
import { loginUser, registerUser, fetchCurrentUser, logoutUserAsync } from "../redux/auth/authSlice";
import { createBlog, updateBlog, deleteBlog, restoreBlog, fetchBlogs, fetchBlogById, fetchBlogBySlug } from "../redux/blogs/blogsSlice";
import { createCancer, updateCancer, deleteCancer, restoreCancer, fetchCancers, fetchCancerById, fetchCancerBySlug } from "../redux/cancers/cancersSlice";
import { fetchCancerCategories, createCancerCategory, updateCancerCategory, deleteCancerCategory } from "../redux/cancerCategories/cancerCategoriesSlice";
import { createCenter, updateCenter, deleteCenter, restoreCenter, fetchCenters, fetchActiveCenters, fetchCenterById } from "../redux/centers/centersSlice";
import { createDoctor, updateDoctor, deleteDoctor, restoreDoctor, fetchDoctors, fetchDoctorById, fetchDoctorBySlug } from "../redux/doctors/doctorsSlice";
import { createService, updateService, deleteService, restoreService, fetchServices, fetchServiceById, fetchServiceBySlug } from "../redux/services/servicesSlice";
import { fetchTags } from "../redux/tags/tagsSlice";

// ─── Mutations: show a success toast on fulfilled ─────────────────────────────
const SUCCESS_MESSAGES = new Map([
  // Auth
  [loginUser,    'Logged in successfully!'],
  [registerUser, 'Registered successfully!'],

  // Blogs
  [createBlog,  'Blog published successfully!'],
  [updateBlog,  'Blog updated successfully!'],
  [deleteBlog,  'Blog deleted.'],
  [restoreBlog, 'Blog restored.'],

  // Cancers
  [createCancer,  'Cancer type created successfully!'],
  [updateCancer,  'Cancer type updated successfully!'],
  [deleteCancer,  'Cancer type deleted.'],
  [restoreCancer, 'Cancer type restored.'],

  // Cancer Categories
  [createCancerCategory,  'Cancer category created successfully!'],
  [updateCancerCategory,  'Cancer category updated successfully!'],
  [deleteCancerCategory,  'Cancer category deleted.'],

  // Centers
  [createCenter,  'Center created successfully!'],
  [updateCenter,  'Center updated successfully!'],
  [deleteCenter,  'Center deleted.'],
  [restoreCenter, 'Center restored.'],

  // Doctors
  [createDoctor,  'Doctor created successfully!'],
  [updateDoctor,  'Doctor updated successfully!'],
  [deleteDoctor,  'Doctor deleted.'],
  [restoreDoctor, 'Doctor restored.'],

  // Services
  [createService,  'Service created successfully!'],
  [updateService,  'Service updated successfully!'],
  [deleteService,  'Service deleted.'],
  [restoreService, 'Service restored.'],
]);

// ─── Silent: no toast at all (background fetches, session checks) ─────────────
const SILENT_THUNKS = new Set([
  fetchCurrentUser,
  logoutUserAsync,
  fetchBlogs, fetchBlogById, fetchBlogBySlug,
  fetchCancers, fetchCancerById, fetchCancerBySlug,
  fetchCancerCategories,
  fetchCenters, fetchActiveCenters, fetchCenterById,
  fetchDoctors, fetchDoctorById, fetchDoctorBySlug,
  fetchServices, fetchServiceById, fetchServiceBySlug,
  fetchTags,
]);

// ─── Build lookup sets from thunk objects at startup (cheap, runs once) ───────
const silentTypes          = new Set([...SILENT_THUNKS].flatMap((t) => [t.fulfilled.type, t.rejected.type]));
const successTypes         = new Map([...SUCCESS_MESSAGES].map(([t, msg]) => [t.fulfilled.type, msg]));
const mutationRejectedTypes = new Set([...SUCCESS_MESSAGES.keys()].map((t) => t.rejected.type));

// ─── Middleware ───────────────────────────────────────────────────────────────
export const toastMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const type = action?.type ?? '';

  // Fully silent — do nothing
  if (silentTypes.has(type)) return result;

  // Success toast for mutations
  if (successTypes.has(type)) {
    store.dispatch(addToast({ message: successTypes.get(type), type: 'success' }));
    return result;
  }

  // Error toast for mutation rejections — uses the backend message from rejectWithValue
  if (mutationRejectedTypes.has(type)) {
    const message =
      typeof action.payload === 'string'
        ? action.payload
        : action.error?.message ?? 'Something went wrong.';
    store.dispatch(addToast({ message, type: 'error' }));
  }

  return result;
};