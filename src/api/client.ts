import axios from "axios";

export const api = axios.create({
  // Vite bakes the Render URL here during build. It falls back to localhost for local testing.
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
});
