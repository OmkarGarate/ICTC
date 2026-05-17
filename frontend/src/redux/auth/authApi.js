import axiosInstance from "../../app/axiosinstance";

/* ================= LOGIN ================= */
export const loginApi = (credentials) =>
  axiosInstance.post("/auth/login", credentials);

/* ================= REGISTER ================= */
export const registerApi = (data) =>
  axiosInstance.post("/auth/register", data);

/* ================= REFRESH TOKEN ================= */
export const refreshTokenApi = (body) =>
  axiosInstance.post("/auth/refresh", body);

/* ================= GET CURRENT USER ================= */
export const getMeApi = () =>
  axiosInstance.get("/auth/me");

/* ================= LOGOUT ================= */
export const logoutApi = () =>
  axiosInstance.post("/auth/logout");