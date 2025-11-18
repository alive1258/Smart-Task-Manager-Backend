import express from "express";
import { ProjectController } from "./project.controller";
import validateRequest from "../../middleware/validateRequest";
import { ProjectValidation } from "./project.validation";
import auth from "../../middleware/auth";

const router = express.Router();

// Create a new project
router.post(
  "/create-project",
  auth(),
  validateRequest(ProjectValidation.createProjectSchema),
  ProjectController.createProject
);

// Get all projects
router.get("/", auth(), ProjectController.getAllProjects);

// Get a project by ID
router.get("/:id", auth(), ProjectController.getProjectById);

// Update a project
router.patch(
  "/:id",
  auth(),
  validateRequest(ProjectValidation.updateProjectSchema),
  ProjectController.updateProject
);

// Delete a project
router.delete("/:id", auth(), ProjectController.deleteProject);

export const ProjectRoutes = router;
