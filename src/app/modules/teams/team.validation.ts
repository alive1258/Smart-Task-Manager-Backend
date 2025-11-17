import { z } from "zod";

// Zod schema for Hero
const createTeamValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Title is required"),
    email: z.string().trim().min(1, "email is required"),
    linked_in_url: z.string().trim().min(1, "linked_in_url is required"),
    image: z.string(),
    position: z.string().trim().min(1, "position is required"),
  }),
});
const updateTeamValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Title is required"),
    email: z.string().trim().min(1, "Title is required"),
    linked_in_url: z.string().trim().min(1, "linked_in_url is required"),
    image: z.string(),
    position: z.string().trim().min(1, "position is required"),
  }),
});

export const TeamValidation = {
  createTeamValidationSchema,
  updateTeamValidationSchema,
};
