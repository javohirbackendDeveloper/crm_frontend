import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

const attendanceCrm = create((set, get) => ({
  attendance: {},

  saveAttendance: async (student_id, group_id) => {
    console.log(student_id, group_id);

    try {
      const res = await axios.post(
        "https://crm-backend-xiqj.onrender.com/api/attendance/saveAttendance",
        {
          student_id,
          group_id,
        }
      );

      if (res?.message) {
        toast.error(res?.message);
      } else {
        set((state) => ({
          attendance: {
            ...state.attendance,
            [student_id]: true,
          },
        }));
        toast.success("Attendance saved successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Siz keyingi darsgacha bu o'quvchini davomat qila olmaysiz");
    }
  },

  getAttendanceForGroup: async (group_id) => {
    try {
      const res = await axios.get(
        `https://crm-backend-xiqj.onrender.com/api/attendance/getAttendanceForGroup/${group_id}`
      );
      const attendanceData = res.data?.attendance || {};

      set({ attendance: attendanceData });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default attendanceCrm;
