import { z } from "zod";

// Zod schema for creating a user
export const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First Name is required",
      }),
      lastName: z.string({
        required_error: "Last Name is required",
      }),
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .trim()
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Invalid gender" }),
    }),
  }),
});

// Zod schema for login
export const userLoginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .trim()
      .email("Invalid email format"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

// Zod schema for refresh token
export const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  userLoginZodSchema,
  refreshTokenZodSchema,
};
