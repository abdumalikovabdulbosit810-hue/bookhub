import { z } from "zod";
import { sanitizeText } from "@/shared/lib/utils";

export type ApiResult<T> = {
  data: T;
  meta?: {
    page: number;
    pageSize: number;
    total: number;
    hasMore?: boolean;
  };
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(24),
  search: z.string().transform(sanitizeText).default("")
});

export async function secureRequest<T>(factory: () => Promise<T>): Promise<T> {
  try {
    return await factory();
  } catch (error) {
    throw error instanceof ApiError ? error : new ApiError("Unexpected API failure");
  }
}
