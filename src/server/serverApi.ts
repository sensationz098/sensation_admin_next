import {
  CreateUserApiResponseType,
  GetAllTeacherResponseType,
  GetAllUserResponseType,
  GetDashboardApiReponseType,
} from "@/types/ApiResponseType";
import { axiosInstance } from "./axios";
import { AddUserFormSchemaType } from "@/schema/zod-schema";
import { cookies } from "next/headers";

const getCookieToken = async () => {
  const cookieStore = await cookies();

  const authToken = cookieStore.get("token")?.value;

  return authToken ? authToken : null;
};

export const getAllUsers = async () => {
  const authToken = await getCookieToken();
  const { data } = await axiosInstance.get<GetAllUserResponseType>(
    "/api/admin/user/all",
    {
      headers: {
        Cookie: `token=${authToken}`,
      },
    }
  );

  if (!data || data.error) {
    return null;
  }

  return data;
};

export const getAllTeachers = async () => {
  const authToken = await getCookieToken();

  const { data } = await axiosInstance.get<GetAllTeacherResponseType>(
    "/api/teacher/list",
    {
      headers: {
        Cookie: `token=${authToken}`,
      },
    }
  );

  if (!data || data.error) {
    return null;
  }

  return data;
};

export const getTeacherDetailsById = async (id: string) => {
  const authToken = await getCookieToken();

  const { data } = await axiosInstance.get(`/api/teacher/get-teacher/${id}`);

  if (!data || data.error) {
    return null;
  }

  return data;
};

export const getDashboardData = async () => {
  const authToken = await getCookieToken();

  const { data } = await axiosInstance.get<GetDashboardApiReponseType>(
    "/api/admin/dashboard",
    {
      headers: {
        Cookie: `token=${authToken}`,
      },
    }
  );

  if (!data || data.error) {
    return null;
  }

  return data;
};

export const getAllCourses = async () => {
  const authToken = await getCookieToken();

  const { data } = await axiosInstance.get<GetDashboardApiReponseType>(
    "/api/course",
    {
      headers: {
        Cookie: `token=${authToken}`,
      },
    }
  );

  if (!data || data.error) {
    return null;
  }

  return data;
};
