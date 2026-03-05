/* ─── API Response envelope ─── */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

/* ─── Generic error shape ─── */
export interface ApiError {
  success: false;
  message: string;
  stack?: string;
}
