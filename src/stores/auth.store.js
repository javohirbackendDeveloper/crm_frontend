import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";
// import axios from "../../lib/axios";

const authStore = create((set, get) => ({
  user: JSON.parse(window.localStorage.getItem("user")) || null,
  loading: false,
  checkingAuth: true,
  statistic: {},

  register: async ({ username, email, password, confirmPassword }) => {
    set({ loading: true });

    if (confirmPassword !== password) {
      set({ loading: false });
      return toast.error("Ikkala parol ham bir xil bo'lishi kerak");
    }
    try {
      const res = await axios.post(`/auth/register`, {
        email,
        password,
        username,
      });

      if (res.status === 201) {
        window.localStorage.setItem("isLoggedInUser", true);
        window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
        toast.success("Ro'yxatdan o'tish muvaffaqiyatli!");
        set({ user: res.data, loading: false });
      } else {
        toast.error("Bu foydalanuvchi allaqachon mavjud");
        set({ user: null, loading: false });
      }
    } catch (error) {
      set({ loading: false });
      const errorMessage = error.message || "Biror xatolik yuz berdi!";
      console.log(error);
      toast.error(errorMessage);
    }
  },

  login: async ({ ...data }) => {
    console.log(data);

    try {
      const res = await axios.post(
        `https://crm-backend-xiqj.onrender.com/api/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log(res);

      if (res.data?.foundedUser) {
        toast.success(res.statusText);
        set({ user: res.data?.foundedUser });
        window.localStorage.setItem("isLoggedInUser", true);
        window.localStorage.setItem(
          "user",
          JSON.stringify(res.data?.foundedUser)
        );
        window.location.reload();
        set({ user: res.data?.foundedUser, loading: false });
      } else {
        toast.error(res.data.error);
        set({ user: null, loading: false });
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);

      toast.error(error.message || "An error occurred");
    }
  },

  logout: async () => {
    try {
      const res = await axios.post(`/auth/logout`);

      set({ user: null });
      window.localStorage.removeItem("isLoggedInUser");
      window.localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  // checkAuth: async () => {
  //   set({ checkingAuth: true });
  //   try {
  //     const response = await axiosInstance.get("/auth/profile");

  //     set({ user: response.data, checkingAuth: false });
  //   } catch (error) {
  //     console.log(error.message);
  //     set({ checkingAuth: false, user: null });
  //   }
  // },

  getStatistics: async (center_id) => {
    try {
      const res = await axios.get(`/auth/getStatistics/` + center_id);

      set({ statistic: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },
}));

export default authStore;
