import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .email()
    .trim()
    .min(3, "the minimum length is 3")
    .max(25, "the maximum length is 25"),
  password: z
    .string()
    .trim()
    .min(3, "the minimum length is 3")
    .max(25, "the maximum length is 25"),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const AddUserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "the minimum length is 3")
    .max(25, "the maximum length is 25"),
  email: z
    .email()
    .trim()
    .min(3, "the minimum length is 3")
    .max(25, "the maximum length is 25"),
  password: z
    .string()
    .trim()
    .min(3, "the minimum length is 3")
    .max(25, "the maximum length is 25"),
  role: z.string().trim(),
  status: z.boolean(),
});

export type AddUserFormSchemaType = z.infer<typeof AddUserFormSchema>;

export const AddCourseFormSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  category: z.string().trim().min(1, "Please select a category"),
  days: z.array(z.string().trim()).min(1, "Select at least one day"),
  image_url: z.url("Please enter a valid URL").trim(),
  recommended: z.boolean(),
  status: z.boolean(),
});

export type AddCourseFormSchemaType = z.infer<typeof AddCourseFormSchema>;
