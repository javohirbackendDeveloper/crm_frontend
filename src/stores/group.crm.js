import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../../lib/axios";

export const groupCrm = create((set) => ({
  groups: [],
  loading: false,
  gettedGroup: [],
  gettedStudents: [],
  gettedTeacher: [],

  // GET STUDENT GROUP
  getStudentGroup: async (group_name) => {
    try {
      const res = await axios.get("/group/getOneGroupByName/" + group_name);

      set({ gettedGroup: res?.data?.group });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  // GET GROUP TEACHER

  getGroupTeacher: async (teacherId) => {
    try {
      const res = await axios.get("/group/getGroupTeacher/" + teacherId);

      set({ gettedTeacher: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  // GET ONE GROUP

  getOneGroup: async (id) => {
    try {
      const res = await axios.get("/group/getOneGroup/" + id);

      if (res?.data.group) {
        set({ gettedGroup: res.data.group });
      } else {
        toast.error("Bu guruhni olishda xatolik yuz berdi");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  // GET ALL STUDENTS OF THIS GROUP

  getAllStudents: async (group_id) => {
    try {
      const res = await axios.get("/group/getAllStudents/" + group_id);
      console.log(res);

      set({ gettedStudents: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  // GET ALL GROUPS
  getGroups: async (userId) => {
    set({ loading: true });

    try {
      const res = await axios.get(`/group?center_id=${userId}`);

      if (res.data && Array.isArray(res.data.groups)) {
        set({ groups: res.data.groups });
      } else {
        set({ groups: [] });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  // ADD NEW GROUP
  addGroup: async ({ ...formData }, user) => {
    set({ loading: true });

    try {
      if (!user) {
        toast.error("User not authenticated");
        return;
      }

      const res = await axios.post(`/group?center_id=${user._id}`, formData);

      console.log(res);

      if (res.data.groups) {
        set({ groups: res.data.groups });
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error adding group");
    } finally {
      set({ loading: false });
    }
  },

  // DELETE GROUP

  deleteGroup: async (groupId) => {
    set({ loading: true });
    try {
      const res = await axios.delete("/group/" + groupId);
      set((prevGroups) => ({
        groups: prevGroups.groups.filter((group) => group._id !== groupId),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  },

  // UPDATE GROUP

  updateGroup: async (groupId, newData) => {
    loading: true;
    try {
      const res = await axios.put("/group/" + groupId, newData);
      console.log(newData);

      set((state) => {
        const updatedGroups = state.groups.map((group) =>
          group._id === groupId ? res.data.group : group
        );
        return { loading: false, groups: updatedGroups };
      });
      toast.success("Successfully updated");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message);
    }
  },
}));
