import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchemas } from "./user.validations";
import { USER_ROLE } from "./user.interface";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchemas.userSchema),
  userController.createUser
);

router.get(
  "/profile",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  userController.getProfile
);

router.get("/users", auth(USER_ROLE.ADMIN), userController.getUsers);

router.put(
  "/profile",
  validateRequest(userValidationSchemas.userProfileUpdateSchema),
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  userController.updateProfile
);

router.put(
  "/user",
  validateRequest(userValidationSchemas.updateUserSchema),
  auth(USER_ROLE.ADMIN),
  userController.updateUser
);

export const userRoutes = router;
