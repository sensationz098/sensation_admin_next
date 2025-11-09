import {
  AddCourseFormSchemaType,
  AddUserFormSchemaType,
} from "@/schema/zod-schema";
import { axiosClientInstance } from "./axios";
import {
  CreateCourseApiResponseType,
  CreateUserApiResponseType,
} from "@/types/ApiResponseType";

export const createUser = async ({
  name,
  email,
  password,
  role,
  status,
}: AddUserFormSchemaType) => {
  const { data } = await axiosClientInstance.post<CreateUserApiResponseType>(
    "/api/admin/user/create",
    { name, email, password, role, status }
  );

  return data.status ? data : null;
};

export const createCourse = async ({
  title,
  description,
  category,
  days,
  image_url,
  recommended,
  status,
}: AddCourseFormSchemaType) => {
  const { data } = await axiosClientInstance.post<CreateCourseApiResponseType>(
    "/api/course/create-course",
    {
      title,
      description,
      category,
      days,
      image_url,
      recommended,
      status,
    }
  );

  return data.status ? data : null;
};
