import { ApiResponse } from "@/types";

export const ok = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const fail = (message: string, code?: string, details?: unknown): ApiResponse<never> => ({
  success: false,
  error: {
    message,
    code,
    details,
  },
});
