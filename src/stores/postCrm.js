import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

const postCrm = create((set, get) => ({
  globalPosts: [],

  addPost: async (center_id, postData) => {
    console.log({ postData, center_id });
    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/post/addPost/" + center_id,
        postData
      );
      console.log(res);

      toast.success("Muvaffaqiyatli qo'shildi");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  getPosts: async (center_id) => {
    try {
      const res = await axios.get(
        "https://crm-backend-1-c8se.onrender.com/api/post/" + center_id
      );

      set({ posts: res.data.posts });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  deletePost: async (post_id) => {
    try {
      const res = await axios.delete(
        "https://crm-backend-1-c8se.onrender.com/api/post/" + post_id
      );
      set((prevPosts) => ({
        posts: prevPosts.posts.filter((post) => post?._id !== post_id),
      }));
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  addComment: async (post_id, user_id, comment) => {
    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/post/addComent",
        {
          post_id,
          user_id,
          comment,
        }
      );
      if (res.data?.message === "Sizning camentingiz muvaffaqiyatli qoshildi") {
        toast.success(res.data?.message);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  addLike: async (post_id, user_id) => {
    console.log({ post_id, user_id });

    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/post/addLike",
        {
          post_id,
          user_id,
        }
      );
      console.log(res);

      toast.success(res.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  getGlobalPosts: async () => {
    try {
      const res = await axios.get(
        "https://crm-backend-1-c8se.onrender.com/api/post/"
      );

      set({ globalPosts: res.data.sortedPosts });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },
}));

export default postCrm;
