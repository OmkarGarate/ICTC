/**
 * ToastContainer.jsx
 * ──────────────────
 * Drop-in replacement using react-hot-toast.
 *
 * Install once:
 *   npm install react-hot-toast
 *
 * Mount this component once at the app root (App.jsx) — same as before.
 * Your existing Redux toastSlice + addToast / removeToast actions are
 * unchanged. This component simply bridges them to react-hot-toast so you
 * get beautiful toasts for free.
 *
 * Usage anywhere in the app (unchanged):
 *   dispatch(addToast({ type: 'success', message: 'Saved!' }))
 *   dispatch(addToast({ type: 'error',   message: 'Something went wrong.' }))
 *   dispatch(addToast({ type: 'info',    message: 'FYI...' }))
 *   dispatch(addToast({ type: 'warning', message: 'Watch out!' }))
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { removeToast } from '../../redux/toast/toastSlice';

/* Map your toast types → react-hot-toast methods */
const TOAST_FN = {
  success: toast.success,
  error:   toast.error,
  info:    toast,          // react-hot-toast has no built-in "info"; use default
  warning: toast,          // same for warning — styled via custom icon below
};

const ICONS = {
  info:    'ℹ️',
  warning: '⚠️',
};

const ToastBridge = () => {
  const dispatch = useDispatch();
  const toasts   = useSelector((s) => s.toast.toasts);

  useEffect(() => {
    toasts.forEach((t) => {
      const duration = t.duration ?? 3500;
      const fn       = TOAST_FN[t.type] ?? toast;

      const options = {
        id:       String(t.id),   // deduplicates; react-hot-toast won't re-fire same id
        duration,
        ...(ICONS[t.type] ? { icon: ICONS[t.type] } : {}),
      };

      fn(t.message, options);

      // Keep Redux slice clean after handing off to react-hot-toast
      setTimeout(() => dispatch(removeToast(t.id)), duration + 500);
    });
  }, [toasts, dispatch]);

  return null;   // rendering is handled by <Toaster /> below
};

const ToastContainer = () => (
  <>
    {/* Bridge: fires react-hot-toast whenever Redux slice has new toasts */}
    <ToastBridge />

    {/*
      Toaster: the actual DOM portal that renders toasts.
      Customise position, gutter, toastOptions as needed.
    */}
    <Toaster
      position="top-right"
      gutter={10}
      containerStyle={{ top: 70, zIndex: 999999 }}   /* nudge below your navbar */
      toastOptions={{
        /* Shared defaults */
        style: {
          borderRadius: '10px',
          fontFamily: 'inherit',
          fontSize: '0.9rem',
          fontWeight: 500,
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          padding: '12px 16px',
          maxWidth: '380px',
        },

        /* Per-type overrides */
        success: {
          iconTheme: { primary: '#22c55e', secondary: '#fff' },
          style: { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#fff' },
          style: { background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' },
          duration: 5000,
        },
      }}
    />
  </>
);

export default ToastContainer;