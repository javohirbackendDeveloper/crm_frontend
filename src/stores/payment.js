import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

const paymentCrm = create((set, get) => ({
  payments: [],

  addPayment: async (center_id, data) => {
    try {
      const res = await axios.post(
        "https://crm-backend-xiqj.onrender.com/api/payment/addPayment/" +
          center_id,
        data
      );
      console.log(data);

      if (res.data?.payment) {
        toast.success("Sizning to'lovingiz muvaffaqiyatli qo'shildi 😊");
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  // GET STUDENT PAYMENTS

  getStudentPayments: async (student_id) => {
    try {
      const res = await axios(
        "https://crm-backend-xiqj.onrender.com/api/payment/" + student_id
      );
      console.log(res);

      set({ payments: [...res.data] });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },
}));

export default paymentCrm;
