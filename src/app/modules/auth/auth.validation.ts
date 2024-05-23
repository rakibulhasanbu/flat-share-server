import { z } from "zod";

const AuthSchema = z.object({
  body: z.object({
    usernameOrEmail: z.string({
      required_error: "username Or Email is required!",
    }),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required!",
    }),
    currentPassword: z.string({
      required_error: "Current Password is required!",
    }),
    newPassword: z.string({ required_error: "New Password is required!" }),
  }),
});

export const AuthValidationSchemas = {
  AuthSchema,
  changePasswordSchema,
};
