import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { create } from "zustand";

const useAuthstore = create((set, get) => ({
  user: localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser"))
    : null,
  setUser: (user) => {
    // Update Zustand state
    set({ user });

    // Save user info to localStorage
    localStorage.setItem("authUser", JSON.stringify(user));
  },
  isSignUp: false,
  isLogin: false,

  Signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axiosInstance.post("/api/auth/signup", data);
      get().setUser(res.data.user);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    } finally {
      set({ isSignUp: false });
    }
  },
  login: async (user, navigate) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", user);
      get().setUser(res.data.user);
      localStorage.setItem("authUser", JSON.stringify(res.data.user));
      localStorage.setItem(
        "authUserExpireAt",
        Date.now() + 24 * 60 * 60 * 1000
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      navigate("/login");
    } finally {
      set({ isLogin: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/api/auth/logout");
      localStorage.setItem("authUser", "");
      localStorage.setItem("authUserExpireAt", "");
      toast.success(res.data.message);
      set({ user: null });
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
      return false;
    }
  },

  checkUser: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/user");
      get().setUser(res.data.user);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  },
  updateUser: async (name, profileImage) => {
    try {
      if (name.length === 0) {
        name = get().user.name;
      }
      const res = await axiosInstance.put(
        "/api/auth/updateProfile",
        { name, profileImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.user);
      get().setUser(res.data.user);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  },
}));

export default useAuthstore;
