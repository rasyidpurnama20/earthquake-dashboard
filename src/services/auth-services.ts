import axios from "@/lib/axios";
import {
  type AuthUserDataResponse,
  type AuthUserLoginResponse,
} from "@/lib/dto/auth";
import { type loginSchema } from "@/lib/validations";
import { type AxiosResponse } from "axios";

import type * as z from "zod";

export const authService = {
  async login({ username, password }: z.infer<typeof loginSchema>) {
    const response: AxiosResponse<AuthUserLoginResponse> = await axios.post(
      `/auth/token/login`,
      {
        username,
        password,
      }
    );

    return response;
  },
  async getUserDetail({ token }: { token: string }) {
    const response: AxiosResponse<AuthUserDataResponse> = await axios.get(
      `/auth/users/me/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
};
