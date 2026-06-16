import type { Product } from "./product";
import type { User } from "./user";

export interface AuthState {
  accessToken: string | null;
  loading: boolean;
  user: User | null;

  clearState: () => void;
  setAccessToken: (accessToken: string) => void;
  signUp: (
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
  ) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  refresh: () => Promise<void>;
  profile: () => Promise<void>;
}

export interface ProductState {
  loading: boolean;
  products: [Product] | [];
  getProduct: () => Promise<void>;
}
