import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

export const axiosClientInstance = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

export async function serverGet(path: string) {
  try {
    const res = await axiosInstance.get(path, { withCredentials: true });
    return { data: res.data, error: null };
  } catch (err: Error | unknown) {
    return {
      data: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
