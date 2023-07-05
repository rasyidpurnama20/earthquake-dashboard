import { axiosAuth } from "@/lib/axios";
import { type loginSchema } from "@/lib/validations";

import type * as z from "zod";

export const authService = {
  login({ username, password }: z.infer<typeof loginSchema>) {
    return axiosAuth.post(`/auth/token/login`, {
      username,
      password,
    });
  },
};
