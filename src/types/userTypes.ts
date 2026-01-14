export type User = {
  id: number;
  username: string;
  password: string;
  refreshToken: string;
};

export type CreateUser = Omit<User, "id" | "refreshToken">;
export type UpdateUser = Partial<Omit<User, "id">>;
export type FilterUser = Partial<User>;