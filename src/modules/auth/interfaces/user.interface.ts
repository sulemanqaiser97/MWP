export interface iUser {
  message: string;
  user: {
    user_id?: number;
    email: string;
    password: string;
    username: string;
    role: string;
    phone_number: string;
    createdAt?: string;
    updatedAt?: string;
  };
  token: string;
}
