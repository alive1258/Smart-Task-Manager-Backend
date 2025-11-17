import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middleware/auth";

const router = express.Router();

// User login route
router.post(
  "/login",
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.loginUser
);

// Refresh token route
router.post("/refresh-token", AuthController.refreshToken);

// Forget password route
// router.post("/forget-password", AuthController.forgetPassword);

// Reset password route (no role verification)
router.post("/reset-password", auth, AuthController.resetPassword);

export const AuthRoutes = router;
