import express from "express";
import auth from "../../middlewares/auth";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchemas } from "./booking.validation";
import { USER_ROLE } from "../user/user.interface";

const router = express.Router();

router.post(
  "/booking-applications",
  validateRequest(bookingValidationSchemas.bookingSchema),
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  BookingController.createBooking
);

router.get(
  "/booking-requests-my",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  BookingController.getMyBookings
);

router.get(
  "/booking-requests",
  auth(USER_ROLE.ADMIN),
  BookingController.getBookings
);

router.put(
  "/booking-requests/:bookingId",
  validateRequest(bookingValidationSchemas.updateBookingSchema),
  auth(USER_ROLE.ADMIN),
  BookingController.updateBookingById
);

export const BookingRoutes = router;
