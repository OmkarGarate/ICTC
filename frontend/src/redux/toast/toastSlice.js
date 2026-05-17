import { createSlice } from '@reduxjs/toolkit';

/**
 * Toast State Shape
 *
 * @typedef {Object} Toast
 * @property {string}  id       - unique id (auto-generated)
 * @property {string}  message  - text to display
 * @property {'success'|'error'|'info'|'warning'} type
 * @property {number}  duration - ms before auto-dismiss (default 3500)
 */

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toasts: [], // Toast[]
  },

  reducers: {
    /**
     * Push a toast onto the queue.
     *
     * Payload: { message, type?, duration? }
     *   type     – 'success' | 'error' | 'info' | 'warning'  (default: 'info')
     *   duration – milliseconds                                (default: 3500)
     */
    addToast(state, action) {
      state.toasts.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type: 'info',
        duration: 3500,
        ...action.payload,
      });
    },

    /** Remove a toast by id (called by the UI after animation ends). */
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;

// ─── Convenience action creators ──────────────────────────────────────────────

/** dispatch(showToast.success('Saved!')) */
export const showToast = {
  success: (message, duration) => addToast({ message, type: 'success', duration }),
  error:   (message, duration) => addToast({ message, type: 'error',   duration }),
  info:    (message, duration) => addToast({ message, type: 'info',    duration }),
  warning: (message, duration) => addToast({ message, type: 'warning', duration }),
};