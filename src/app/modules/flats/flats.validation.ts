import { z } from "zod";

const flatSchema = z.object({
  body: z.object({
    location: z.string(),
    description: z.string(),
    amount: z.number().int().positive(),
    squareFeet: z.number().int().positive(),
    totalBedrooms: z.number().int().positive().min(1),
    totalRooms: z.number().int().positive().min(1),
    amenities: z.string().array(),
    photos: z.string().array(),
    advanceAmount: z.number().int().positive(),
  }),
});

export const updateFlatSchema = z.object({
  body: z.object({
    squareFeet: z.number().int().positive().optional(),
    totalBedrooms: z.number().int().positive().min(1).max(4).optional(),
    totalRooms: z.number().int().positive().min(1).max(6).optional(),
    utilitiesDescription: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    rent: z.number().int().positive().optional(),
    availability: z.boolean().optional(),
    advanceAmount: z.number().int().positive().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const FlatValidationSchemas = {
  flatSchema,
  updateFlatSchema,
};
