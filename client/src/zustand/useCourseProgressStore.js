import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { create } from "zustand";

const useCourseProgressStore = create(() => ({
  getCourseProgress: async (courseId) => {
    try {
      const res = await axiosInstance.get(`/api/progress/${courseId}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  },
  updateLectureProgress: async (courseId, lectureId) => {
    try {
      const res = await axiosInstance.post(
        `/api/progress/${courseId}/lecture/${lectureId}/view`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  },
  markAsCompleted: async (courseId) => {
    try {
      const res = await axiosInstance.post(
        `/api/progress/${courseId}/complete`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  },
  markAsInCompleted: async (courseId) => {
    try {
      const res = await axiosInstance.post(
        `/api/progress/${courseId}/incomplete`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  },
}));

export default useCourseProgressStore;
