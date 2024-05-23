import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidationSchemas } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidationSchemas.AuthSchema),
  AuthController.loginUser
);

router.post(
  "/change-password",
  validateRequest(AuthValidationSchemas.changePasswordSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
