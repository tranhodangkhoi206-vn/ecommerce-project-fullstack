import api from "../lib/axios.ts";

const authService = {
  signUp: async (
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
  ) => {
    const res = await api.post(
      "/auth/signup",
      { username, password, email, firstname, lastname },
      { withCredentials: true },
    );
    console.log(res.data);
    return res.data;
  },
  signIn: async (username: string, password: string) => {
    const res = await api.post(
      "/auth/signin",
      { username, password },
      { withCredentials: true },
    );
    return res.data.accessToken;
  },
  signOut: async () => {
    return api.post("/auth/signout", {}, { withCredentials: true });
  },
  refresh: async () => {
    const res = await api.post("/auth/refresh", {}, { withCredentials: true });
    return res.data.accessToken;
  },
  profile: async () => {
    const res = await api.get("/users/profile", { withCredentials: true });
    return res.data.user;
  },
};

export default authService;
