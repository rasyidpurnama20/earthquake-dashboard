import * as z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Silahkan masukkan username yang valid" }),
  password: z.string().min(5, { message: "Kata sandi minimal 5 karakter" }),
});
