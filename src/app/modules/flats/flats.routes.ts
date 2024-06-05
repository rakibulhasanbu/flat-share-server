import express from "express";

import auth from "../../middlewares/auth";
import { FlatController } from "./flats.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FlatValidationSchemas } from "./flats.validation";
import { USER_ROLE } from "../user/user.interface";

const router = express.Router();

router.post(
  "/flats",
  validateRequest(FlatValidationSchemas.flatSchema),
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  FlatController.createFlat
);

router.get("/flat/:flatId", FlatController.getFlatById);

router.get(
  "/my-flats",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  FlatController.getMyFlats
);

router.get("/flats", FlatController.getFlats);

router.put(
  "/flats/:flatId",
  validateRequest(FlatValidationSchemas.updateFlatSchema),
  auth(USER_ROLE.ADMIN),
  FlatController.updateFlatById
);

router.delete(
  "/flat/:flatId",
  auth(USER_ROLE.ADMIN),
  FlatController.deleteFlatById
);

export const FlatsRoutes = router;
