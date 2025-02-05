import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../../lib/axios";

export const teacherCrm = create((set, get) => ({
  teachers: [],
  currentTeacher:
    JSON.parse(window.localStorage.getItem("currentTeacher")) || null,
  checkingTeacher: false,
  teacherStudents: [],
  groups: [],
  teacherGroups: [],

  // GET TEACHER GROUPS
  getTeacherGroups: async (teacherId) => {
    try {
      const res = await axios.get("/group/getTeacherGroups/" + teacherId);

      set({ teacherGroups: res?.data?.groups });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },
  // GET TEACHER STUDENTS AND GROUPS

  getTeacherStudents: async (teacher_id) => {
    try {
      const res = await axios.get("/teacher/getTeacherStudents/" + teacher_id);
      set({ teacherStudents: res.data.students, groups: res.data.groups });
      console.log(res);

      return res.data.groups, res.data.students;
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      return null;
    }
  },
  // GET ONE TEACHER

  getOneTeacher: async (teacher_id) => {
    try {
      const res = await axios.get("/teacher/getOneTeacher/" + teacher_id);

      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      return null;
    }
  },
  // GET ALL TEACHERS

  getTeachers: async (user) => {
    set({ loading: true });
    try {
      if (!user) {
        toast.error("User not authenticated");
        return;
      }

      const res = await axios.get(`/teacher?center_id=${user._id}`);

      set({ teachers: res.data.teachers, loading: false });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
      set({ loading: false });
    }
  },

  // ADDING TEACHER

  addTeacher: async (teacherData, user) => {
    console.log({ teacherData, user });

    try {
      if (!user) {
        toast.error("User not authenticated");
        return;
      }

      const res = await axios.post(
        `http://localhost:4000/api/teacher?center_id=${user._id}`,
        teacherData
      );

      if (res.data.message !== "This login already exists") {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  },

  // DELETE TEACHER

  deleteTeacher: async (teacherId) => {
    set({ loading: true });
    try {
      const res = await axios.delete("/teacher/" + teacherId);
      set((prevTeachers) => ({
        teachers: prevTeachers.teachers.filter(
          (teacher) => teacher._id !== teacherId
        ),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  },

  // UPDATE TEACHER

  updateTeacher: async (teacherId, newData) => {
    set({ loading: true });
    try {
      const res = await axios.put("/teacher/" + teacherId, newData);

      set((state) => {
        const updateTeachers = state.teachers.map((teacher) =>
          teacher._id === teacherId ? res.data.teacher : teacher
        );
        return { loading: false, teachers: updateTeachers };
      });
      toast.success("Successfully updated");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  },

  // LOGIN AS A TEACHER

  teacherLogin: async (login, password) => {
    try {
      const res = await axios.post("/teacher/teacherLogin", {
        login,
        password,
      });
      if (res.data?._id) {
        set({ currentTeacher: res.data });
        window.localStorage.setItem("isLoggedInTeacher", true);
        window.localStorage.setItem("currentTeacher", JSON.stringify(res.data));
        window.location.reload();
        set({ checkingTeacher: true, currentTeacher: res.data });

        toast.success("Successfully logged in");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  },

  // LOGOUT TEACHER

  logoutTeacher: async () => {
    try {
      const res = await axios.post("/teacher/logoutTeacher");
      set({ currentTeacher: null });
      window.localStorage.removeItem("isLoggedInTeacher");
      window.localStorage.removeItem("currentTeacher");
      window.location.reload();

      set({ checkingTeacher: false, currentTeacher: null });

      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },
}));
