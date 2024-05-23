import { z } from "zod";

const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: z.string().min(1, { message: "User Name is required." }),
    email: z.string().email({ message: "Email address is required." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
  }),
});

const userProfileUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
  }),
});

const userProfileSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export const userValidationSchemas = {
  userSchema,
  userProfileSchema,
  userProfileUpdateSchema,
};
