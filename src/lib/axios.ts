/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosError } from "axios";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
  baseURL: BASE_URL || "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (response) => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      redirect("/login");
    }
  }
);
