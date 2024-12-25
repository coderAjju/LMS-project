import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useLectureStore = create((set,get) => ({
  CreateLecture: async (lectureTitle, courseId) => {
    try {
      const res = await axiosInstance.post(`/api/lecture/${courseId}/create`, {
        lectureTitle,
      });
      toast.success(res.data.message || "Lecture created successfully!");
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  GetAllLectures: async () => {
    try {
      const res = await axiosInstance.get("/api/lecture/allLectures");
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  UploadLecture : async (lectureId,uploadVideoInfo,lectureTitle,isFree) => {
    try {
      const res = await axiosInstance.post(`/api/lecture/${lectureId}/upload`, {uploadVideoInfo,lectureTitle,isFree});
      
      toast.success(res.data.message || "Lecture updated successfully!");
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }
}));

export default useLectureStore;
