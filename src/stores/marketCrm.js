import { create } from "zustand";
import axios from "axios"; // axios instance
import toast from "react-hot-toast";

const useMarketStore = create((set) => ({
  products: [],
  orders: [],
  gettedProduct: [],
  studentOrders: [],

  createProduct: async (center_id, productData) => {
    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/product/addProduct/" +
          center_id,
        productData
      );

      if (res.data?.product) {
        toast.success("Mahsulot yaratildi!");
      } else {
        toast.error(res.data?.message);
      }
      return res.data;
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Mahsulot yaratishda xatolik yuz berdi!");
    }
  },

  getAllProducts: async (center_id) => {
    try {
      const res = await axios.get(
        "https://crm-backend-1-c8se.onrender.com/api/product/" + center_id
      );
      console.log(res);

      if (res.data) {
        set({ products: res.data });
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  deleteProduct: async (product_id) => {
    try {
      const res = await axios.delete(
        "https://crm-backend-1-c8se.onrender.com/api/product/" + product_id
      );
      console.log(res);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== product_id
        ),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  updateProduct: async (product_id, newData) => {
    try {
      const res = await axios.put(
        "https://crm-backend-1-c8se.onrender.com/api/product/" + product_id,
        newData
      );
      set({ products: res.data.product });
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  addToPurchased: async (student_id, product_id) => {
    try {
      const res = await axios.post(
        "https://crm-backend-1-c8se.onrender.com/api/product/purchase",
        {
          student_id,
          product_id,
        }
      );
      console.log(res);

      if (res.data?.updatedStudent) {
        window.localStorage.setItem(
          "currentStudent",
          JSON.stringify(res.data?.updatedStudent)
        );
        toast.success("Sizning xaridingiz muvaffaqiyatli amalga oshirildi!");
      } else {
        toast.error(res.data.message || "Xaridni amalga oshirishda xato");
      }
    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi");
    }
  },

  getAllOrders: async (center_id) => {
    try {
      const res = await axios.get(
        "https://crm-backend-1-c8se.onrender.com/api/product/getAllOrders/" +
          center_id
      );

      set({ orders: res?.data?.orders });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  getOneProduct: async (product_id) => {
    try {
      const res = await axios.get(
        "https://crm-backend-1-c8se.onrender.com/api/product/getOneProduct/" +
          product_id
      );
      console.log(res);

      set({ gettedProduct: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  deleteOrder: async (orderId) => {
    console.log(orderId);
    try {
      const res = await axios.delete(
        "https://crm-backend-1-c8se.onrender.com/api/product/deleteOrder/" +
          orderId
      );
      set((prevOrder) => ({
        orders: prevOrder.orders.filter((order) => order?._id !== orderId),
      }));
      toast.success("Buyurtma yetkazildi");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },

  getAllOrdersOfStudent: async (student_id) => {
    try {
      const res = await axios.get(
        "https://crm-backend-1-c8se.onrender.com/api/product/getAllOrdersOfStudent/" +
          student_id
      );
      console.log(res);

      set({ studentOrders: res.data?.orders });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  },
}));

export default useMarketStore;
