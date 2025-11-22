import { z } from "zod";

// Create User Zod schema for single `name`
export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }), // single string now
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Invalid gender" }),
    }),
    email: z.string().trim().email("Invalid email format"),
  }),
});

// Update User Zod schema
export const updateUserValidationSchema = createUserValidationSchema;

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
