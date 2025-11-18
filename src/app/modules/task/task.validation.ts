import { z } from "zod";

// Schema for creating a task
const createTaskSchema = z.object({
  body: z.object({
    project: z.string().min(1, "Project ID is required"),
    title: z.string().min(1, "Task title is required"),
    description: z.string().optional(),
    assignedMember: z
      .object({
        userId: z.string(),
        name: z.string(),
        role: z.string(),
      })
      .optional(),
    priority: z.enum(["Low", "Medium", "High"]),
    status: z.enum(["Pending", "In Progress", "Done"]).optional(),
  }),
});

// Schema for updating a task
const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    assignedMember: z
      .object({
        userId: z.string(),
        name: z.string(),
        role: z.string(),
      })
      .optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    status: z.enum(["Pending", "In Progress", "Done"]).optional(),
  }),
});

// Export as a single object for consistency
export const TaskValidation = {
  createTaskSchema,
  updateTaskSchema,
};
