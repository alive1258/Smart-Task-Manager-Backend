import express from "express";
import { TeamControllers } from "./team.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { TeamValidation } from "./team.validation";

const router = express.Router();

router.post(
  "/create-team",
  auth(),
  validateRequest(TeamValidation.createTeamValidationSchema),
  TeamControllers.createTeam
);

router.get("/", auth(), TeamControllers.getAllTeams);
router.get("/:id", auth(), TeamControllers.getSingleTeam);

router.patch(
  "/:id",
  auth(),
  validateRequest(TeamValidation.updateTeamValidationSchema),
  TeamControllers.updateTeam
);

router.delete("/:id", auth(), TeamControllers.deleteTeam);

export const TeamRoutes = router;
