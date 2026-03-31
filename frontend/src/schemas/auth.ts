import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error appears under confirm password field
  });

export const LoginSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z
    .string()
    .min(8, "Incorrect Passsword")
    .max(15, "Incorrect Passsword")
    .regex(/[A-Z]/, "Incorrect Passsword")
    .regex(/[a-z]/, "Incorrect Passsword")
    .regex(/[0-9]/, "Incorrect Passsword")
    .regex(/[\W_]/, "Incorrect Passsword"),
});

export const VerifyCodeSchema = z.object({
  verifyCode: z.string(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export type VerifyCodeInput = z.infer<typeof VerifyCodeSchema>;

export type RegisterInput = z.infer<typeof RegisterSchema>;
