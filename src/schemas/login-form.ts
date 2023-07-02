import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Silahkan masukkan email yang valid" }),
  password: z.string().min(5, { message: "Kata sandi minimal 5 karakter" }),
});
