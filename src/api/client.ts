import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-22xf.onrender.com/records",
});