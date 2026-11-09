export type ApiListResponse<T> = {
  status: boolean;
  message: string;
  code: number;
  data: {
    total_pages: number;
    current_page: number;
    count: number;
    rows: { count: number; rows: T[] };
  };
};

export type LoginResponse = {
  status: boolean;
  message: string;
  code: number;
  is_logged_in: number;
  token: string;
};
