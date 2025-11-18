import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Phone email is required",
    }),
    password: z.string({
      required_error: "Password is required.",
    }),
  }),
});

export const AuthValidation = {
  loginSchema,
  userLoginZodSchema,
  resetPasswordSchema,
};
