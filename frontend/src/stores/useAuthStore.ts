import authService from "@/services/authService";
import { create } from "zustand";
import { toast } from "sonner";
import type { AuthState } from "@/types/store";

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  loading: false,
  user: null,

  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  signUp: async (username, password, email, firstname, lastname) => {
    try {
      set({ loading: true });
      await authService.signUp(username, password, email, firstname, lastname);
      toast.success("Đăng ký thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký không thành công, có lỗi xảy ra!");
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (username, password) => {
    try {
      set({ loading: true });
      const accessToken = await authService.signIn(username, password);

      get().setAccessToken(accessToken);

      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập không thành công, có lỗi xảy ra!");
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      set({ loading: true });

      await authService.signOut();
      get().clearState();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng xuất không thành công");
    } finally {
      set({ loading: false });
    }
  },
  refresh: async () => {
    try {
      set({ loading: true });
      // const { user, profile } = get();
      const accessToken = await authService.refresh();

      // if (!user) {
      //   await profile();
      // }
      get().setAccessToken(accessToken);
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  profile: async () => {
    try {
      set({ loading: true });

      const user = await authService.profile();

      set({ user });

      toast.success("Lấy thông tin người dùng thành công");
    } catch (error) {
      console.error(error);
      toast.error("Lấy thông tin người dùng không thành công");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
