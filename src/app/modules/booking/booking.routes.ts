import express from "express";
import auth from "../../middlewares/auth";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchemas } from "./booking.validation";

const router = express.Router();

router.post(
  "/booking-applications",
  validateRequest(bookingValidationSchemas.bookingSchema),
  auth(),
  BookingController.createBooking
);

router.get("/booking-requests", auth(), BookingController.getBookings);

router.put(
  "/booking-requests/:bookingId",
  validateRequest(bookingValidationSchemas.updateBookingSchema),
  auth(),
  BookingController.updateBookingById
);

export const BookingRoutes = router;
