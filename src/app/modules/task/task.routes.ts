import { Router } from "express";
import { TaskController } from "./task.controller";
import validateRequest from "../../middleware/validateRequest";
import { TaskValidation } from "./task.validation";
import auth from "../../middleware/auth";

const router = Router();

// Protect all routes

// Create a new task
router.post(
  "/create-tast",
  auth(),
  validateRequest(TaskValidation.createTaskSchema),
  TaskController.createTask
);

// Get all tasks
router.get("/", TaskController.getTasks);

// Update a task
router.patch(
  "/:id",
  auth(),
  validateRequest(TaskValidation.updateTaskSchema),
  TaskController.updateTask
);
// **Auto-Reassign Tasks for a project**

// Delete a task
router.delete("/:id", auth(), TaskController.deleteTask);

export const TaskRoutes = router;
