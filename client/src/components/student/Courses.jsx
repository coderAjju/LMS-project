import { useEffect, useState } from "react";
import { CourseSkeleten } from "../skeleten/CourseSkeleten";
import Course from "./Course";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const Courses = () => {
  const [Loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([])
  useEffect(()=>{
    async function fetchPublishedCourses() { 
      try {
        setLoading(true)
        const res = await axiosInstance.get("/api/course/publishedCourses");

        setCourses(res.data)
      } catch (error) {
        console.log(error.message);
        toast.error(error.response.data.message || error.message)
      }finally{
        setLoading(false)
      }
    }
    fetchPublishedCourses()
  },[])

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="font-bold text-3xl text-center mb-10">Our Courses</h1>
        <div className={`flex gap-4 items-center flex-wrap justify-start ${courses.length / 4 === 0 && "justify-center"}`}>
          {Loading
            ? Array.from({ length: 8 }).map((_, index) => {
                return <CourseSkeleten key={index} />;
              })
            : courses.map((course, index) => {
                return <Course course={course} key={index} />
              })}
        </div>
      </div>
    </div>
  );
};
