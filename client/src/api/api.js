import axios from "axios";

const url =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

export const API = axios.create({
  baseURL: url,
});
