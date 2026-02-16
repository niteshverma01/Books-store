import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
});
