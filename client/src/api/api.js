import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});

// process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000",
