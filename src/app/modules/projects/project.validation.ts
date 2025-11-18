import { z } from "zod";

// Create project schema
const createProjectSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Required" }),
    team: z.string({ required_error: "Required" }),
    description: z.string().optional(),
  }),
});

// Update project schema
const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    team: z.string().optional(),
    description: z.string().optional(),
  }),
});

// Export as a single object
export const ProjectValidation = {
  createProjectSchema,
  updateProjectSchema,
};
