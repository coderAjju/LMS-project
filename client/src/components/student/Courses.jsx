import { useEffect, useState } from "react";
import { CourseSkeleten } from "../skeleten/CourseSkeleten";
import Course from "./Course";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const Courses = () => {
  const [Loading, setLoading] = useState(false);
  const [courses, setcourses] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/api/course/publishedCourses"
        );
        setcourses(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.message);
      } finally {
        setLoading(false);
      }
    })();
  },[]);
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="font-bold text-3xl text-center mb-10">Our Courses</h1>
        <div
          className={`flex gap-4 items-center flex-wrap lg:justify-center justify-center ${
            courses.length / 4 === 0 && "justify-center"
          }`}
        >
          {Loading
            ? Array.from({ length: 8 }).map((_, index) => {
                return <CourseSkeleten key={index} />;
              })
            : courses.map((course, index) => {
                return <Course key={index} course={course} />;
              })}
        </div>
      </div>
    </div>
  );
};
