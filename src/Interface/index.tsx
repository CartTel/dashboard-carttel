

import { z } from "zod";

export const createUserSchema = z.object({
        firstname: z.string()
            .trim()
            .min(1, "First name is required")
            .nonempty("First name is required"),
        lastname: z.string()
            .trim()
            .min(1, "Last name is required")
            .nonempty("Last name is required"),
        password: z.string()
            .trim()
            .nonempty("Password is required") // Shortcut for `min(1)`
            .min(8, "Password must be at least 8 characters") // Enforce a minimum length
            .regex(/[A-Z]/, "Password must include at least one uppercase letter") // Require uppercase letters
            .regex(/[a-z]/, "Password must include at least one lowercase letter") // Require lowercase letters
            .regex(/\d/, "Password must include at least one number") // Require numbers
            .regex(/[@$!%*?&#]/, "Password must include at least one special character"),
        confirmPassword: z.string()
            .min(6, "Confirm password must be at least 6 characters long"),
        email: z.string()
            .trim()
            .email("Invalid email format") // Customize error for invalid email
            .nonempty("Email is required"),
        phone: z.string()
            .trim()
            .nonempty("Phone number is required"), // Assuming phone is optional
        roles: z.string().array().min(1, "Roles are required"),
        country: z.string().min(1, "Country is required"),
        hearAboutUs: z.string().min(1, "Please let us know how you heard about us"),
    })
    .refine((val) => val.password === val.confirmPassword, {
        message: "Password does not match",
        path: ["confirmPassword"],
    });
;