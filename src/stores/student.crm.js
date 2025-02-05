import toast from "react-hot-toast";
import axios from "axios";
import { create } from "zustand";

const studentCrm = create((set, get) => ({
  students: [],
  loading: false,
  gettedStudent: [],
  currentStudent:
    JSON.parse(window.localStorage.getItem("currentStudent")) || null,

  // ADD GRADE

  addGrade: async (center_id, data) => {
    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/student/addGrade/" +
          center_id,
        data
      );
      if (res.data?.student) {
        toast.success(`${data.student_grade} bahosi muvaffaqiyatli qoshildi`);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },
  // ADD STUDENT

  getStudents: async (user) => {
    try {
      const res = await axios.get(
        "https://crm-backend-1-c8se.onrender.com/api/student/" + user?._id
      );

      set({ students: res.data?.students });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  },

  // GET ONE STUDENT

  getOneStudent: async (id) => {
    try {
      const res = await axios.get(
        "https://crm-backend-1-c8se.onrender.com/api/student/getOneStudent/" +
          id
      );
      console.log(res);

      if (res?.data?.student) {
        set({ gettedStudent: res.data.student });
      } else {
        toast.error("Bu studentni olishda xatolik yuz berdi");
      }
    } catch (error) {
      console.log(id);
      console.log(error);
      toast.error(error?.message);
    }
  },
  // ADD STUDENT

  addStudent: async (formData, user) => {
    console.log(user);

    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/student/" + user._id,
        formData
      );

      console.log(res);

      if (res.data.student) {
        const studentsArray = Array.isArray(res.data.student)
          ? res.data.student
          : Object.values(res.data.student);

        set({ students: studentsArray });

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  },

  deleteStudent: async (studentId) => {
    loading: true;
    try {
      const res = await axios.delete(
        "https://crm-backend-1-c8se.onrender.com/api/student/" + studentId
      );
      set((prevStudents) => ({
        students: prevStudents.students.filter(
          (student) => student._id !== studentId
        ),
        loading: false,
      }));
      toast.success("Successfully deleted");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message);
    }
  },
  updateStudent: async (studentId, newData) => {
    loading: true;
    try {
      const res = await axios.put(
        "https://crm-backend-1-c8se.onrender.com/api/student/" + studentId,
        newData
      );
      console.log(res);

      set({ loading: false, students: res.data });

      toast.success("Successfully updated");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message);
    }
  },

  loginStudent: async (login, password) => {
    set({ loading: true });
    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/student/",
        { login, password }
      );

      if (res.data?._id) {
        set({ currentStudent: res.data, loading: false });
        window.localStorage.setItem("isLoggedInStudent", true);
        window.localStorage.setItem("currentStudent", JSON.stringify(res.data));
        window.location.reload();
        toast.success("Successfully logged in");

        set({ currentStudent: res.data });
      } else {
        toast.error("Login qilishda muammo yuz berdi");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  logoutStudent: async () => {
    set({ loading: true });

    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/student/logoutStudent/log"
      );
      console.log(res);

      set({ loading: false, currentStudent: null });
      window.localStorage.removeItem("isLoggedInStudent");
      window.localStorage.removeItem("currentStudent");
      window.location.reload();

      toast.success("successfully logged out");

      set({ currentStudent: null });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },
}));

export default studentCrm;
