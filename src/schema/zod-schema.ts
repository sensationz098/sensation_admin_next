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
  // teacher: z.string().trim().min(1, "Please select a teacher"),
mrp: z
  .string()
  .min(1, "MRP is required"),
  // .transform((val) => Number(val)),

discount: z
  .string()
  .optional(),
  // .transform((val) => Number(val || 0)),

  days: z.array(z.string().trim()).min(1, "Select at least one day"),
  image_url: z.url("Please enter a valid URL").trim(),
  recommended: z.boolean(),
  status: z.boolean(),
});

export type AddCourseFormSchemaType = z.infer<typeof AddCourseFormSchema>;




export const AddCounsellorFormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  employee_id: z.string().min(1, "Employee ID is required"),
  contact: z.string().min(10, "Enter valid contact number"),
  incentive: z
    .number()
    .min(1, "Incentive required")
    .transform((val) => Number(val)),
  status: z.boolean().optional(),
});

export type AddCounsellorFormSchemaType = z.infer<typeof AddCounsellorFormSchema>;






export const AddTeacherFormSchema = z.object({
  full_name: z.string().min(3, "Name is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  image_url: z.string().url("Valid image URL required"),
  biography: z.string().min(10, "Biography too short"),
  country: z.string().min(2),
  language: z.string().min(2),
  status: z.boolean().optional(),
  // status:z.boolean().optional().default(true)
});

export type AddTeacherFormSchemaType = z.infer<typeof AddTeacherFormSchema>;
