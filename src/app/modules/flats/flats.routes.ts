import express from "express";

import auth from "../../middlewares/auth";
import { FlatController } from "./flats.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FlatValidationSchemas } from "./flats.validation";

const router = express.Router();

router.post(
  "/flats",
  validateRequest(FlatValidationSchemas.flatSchema),
  auth(),
  FlatController.createFlat
);

router.get("/flats", FlatController.getFlats);

router.put(
  "/flats/:flatId",
  validateRequest(FlatValidationSchemas.updateFlatSchema),
  auth(),
  FlatController.updateFlatById
);

export const FlatsRoutes = router;
