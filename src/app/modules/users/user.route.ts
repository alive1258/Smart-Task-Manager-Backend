import express from "express";
import { UserControllers } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
// import auth from "../../middleware/auth";

const router = express.Router();

// Create user
router.post(
  "/create-user",
  validateRequest(userValidation.createUserValidationSchema),
  UserControllers.createUser
);
// Get logged-in user
router.get("/get-me", auth(), UserControllers.getMe);

// Get all users
router.get("/", UserControllers.getAllUsers);

// Get single user
router.get("/:userId", UserControllers.getSingleUser);

// Update user
// router.patch(
//   "/:userId",
//   auth,
//   validateRequest(userValidation.updateUserValidationSchema),
//   UserControllers.updateUser
// );

// Delete user
router.delete("/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
 