/**
 * Auth State Shape
 *
 * @typedef {Object} AuthState
 * @property {{ userId: number, username: string } | null} user  - logged-in user info (shape from /auth/me)
 * @property {boolean} isAuthenticated                            - true when a valid session exists
 * @property {boolean} initialized                                - true once fetchCurrentUser has completed (used by ProtectedRoute)
 * @property {boolean} loading                                    - true during login/register calls
 * @property {string | null} error                                - last error message
 */

export const AUTH_INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  initialized: false,  // ← key: ProtectedRoute waits for this before redirecting
  loading: false,
  error: null,
};
