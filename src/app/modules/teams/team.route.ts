import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { TeamValidation } from "./team.validation";
import { TeamControllers } from "./team.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-team",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(TeamValidation.createTeamValidationSchema),
  TeamControllers.createTeam
);

// Route to get all trustUs
router.get("/", TeamControllers.getAllTeam);

// Route to get a single trustUs by ID
router.get("/:teamId", TeamControllers.getSingleTeam);

// Route to update a trustUs by ID
router.patch(
  "/:teamId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  TeamControllers.updateTeam
);

// Route to delete a trustUs by ID
router.delete(
  "/:teamId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  TeamControllers.deleteTeam
);

export const TeamRoutes = router;
