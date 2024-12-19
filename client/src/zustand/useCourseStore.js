import {create} from "zustand"
const useCourseStore = create((set)=>(
    {
        isCreateCourse:false,
        setIsCreateCourse: (isCreateCourse) => set({ isCreateCourse })
    }
))

export default useCourseStore;