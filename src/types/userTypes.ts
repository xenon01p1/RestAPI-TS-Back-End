export type User = {
  id: number;
  email: string;
  password: string;
  refreshToken: string;
};

export type CreateUser = Omit<User, "id" | "refreshToken">;
export type UpdateUser = Omit<User, "refreshToken">;
export type FilterUser = Partial<User>;