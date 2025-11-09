"use client";

import { useState } from "react";
import { axiosInstance } from "./axios";

export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const get = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : String(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const post = async (url: string, data?: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.post(url, data);
      return res.data;
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : String(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { get, post, loading, error };
};
