/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
  baseURL: BASE_URL || "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL || "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
