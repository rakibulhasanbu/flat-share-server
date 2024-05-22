import { z } from "zod";

const bookingSchema = z.object({
  body: z.object({
    flatId: z.string(),
  }),
});

export const updateBookingSchema = z.object({
  body: z.object({
    status: z.enum(["PENDING", "BOOKED", "REJECTED"]).optional(),
  }),
});

export const bookingValidationSchemas = {
  bookingSchema,
  updateBookingSchema,
};
