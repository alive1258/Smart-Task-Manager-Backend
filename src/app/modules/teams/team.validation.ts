import { z } from "zod";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  capacity: z.number().min(0).max(5, "Capacity must be 0–5"),
});

export const createTeamValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Team name is required"),
    members: z.array(teamMemberSchema).optional(),
  }),
});

export const updateTeamValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    members: z.array(teamMemberSchema).optional(),
  }),
});

export const TeamValidation = {
  createTeamValidationSchema,
  updateTeamValidationSchema,
};
