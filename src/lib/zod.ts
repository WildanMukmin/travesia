import { Role } from "@prisma/client";
import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export const sighUpSchema = z
  .object({
    role: z.nativeEnum(Role).nullable(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    image: z
      .instanceof(File)
      .refine((file) => file.size > 0 || file.type.startsWith("image/"), {
        message: "Logo must be an image file",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
