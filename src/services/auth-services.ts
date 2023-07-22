import axios from "@/lib/axios";
import { type loginSchema } from "@/lib/validations";

import type * as z from "zod";

export const authService = {
  login({ username, password }: z.infer<typeof loginSchema>) {
    return axios.post(`/auth/token/login`, {
      username,
      password,
    });
  },
};
