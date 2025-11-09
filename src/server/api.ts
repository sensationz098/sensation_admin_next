import {
  CreateUserApiResponseType,
  GetAllUserResponseType,
} from "@/types/ApiResponseType";
import { axiosInstance } from "./axios";
import { AddUserFormSchemaType } from "@/schema/zod-schema";
import { cookies } from "next/headers";

const getCookieToken = async () => {
  const cookieStore = await cookies();

  const authToken = cookieStore.get("token")?.value;

  return authToken ? authToken : null;
};

export const getLoginQuery = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:3000/api/admin/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();
  return data;
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
