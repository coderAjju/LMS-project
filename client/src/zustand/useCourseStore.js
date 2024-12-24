import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
const useCourseStore = create((set) => ({
  isCreateCourse: false,
  setIsCreateCourse: (isCreateCourse) => set({ isCreateCourse }),
  createCourse: async (courseTitle, category) => {
    try {
      const res = await axiosInstance.post("/api/course/create", {
        title: courseTitle,
        category: category,
      });
      toast.success(res.data.message || "Course created successfully!");
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  getAllCreatorCourse: async () => {
    try {
      const res = await axiosInstance.get("/api/course/getAllCreatorCourses");
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  updateCourse: async (input) => {
    try {
      const res = await axiosInstance.put(`/api/course/update/${input._id}`, {...input},{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message || "Course updated successfully!");
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
}));

export default useCourseStore;
