import { z } from "zod";

const bookingSchema = z.object({
  body: z.object({
    flatId: z.string(),
    message: z.string().optional(),
  }),
});

export const updateBookingSchema = z.object({
  body: z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  }),
});

export const bookingValidationSchemas = {
  bookingSchema,
  updateBookingSchema,
};
