import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL:
    //   Biến môi trường của vite
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  //  Config là cấu hình header mà axios sẽ tự gán vào
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    // Nếu có lỗi thì trả về lỗi và config của request đã gửi đi
    const originalRequest = error.config;

    if (
      originalRequest.url.includes("/auth/signin") ||
      originalRequest.url.includes("/auth/signup") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (error.response?.status === 403 && originalRequest._retryCount < 4) {
      originalRequest._retryCount += 1;

      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );
        const accessToken = res.data.accessToken;

        useAuthStore.getState().setAccessToken(accessToken);

        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        useAuthStore.getState().clearState();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
