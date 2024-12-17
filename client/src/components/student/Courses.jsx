import React, { useState } from "react";
import { CourseSkeleten } from "../skeleten/CourseSkeleten";
import Course from "./Course";

export const Courses = () => {
  const [Loading, setLoading] = useState(false);
  const courses = [1, 2, 3, 4, 5, 6];
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="font-bold text-3xl text-center mb-10">Our Courses</h1>
        <div className={`flex gap-4 items-center flex-wrap lg:justify-center justify-center ${courses.length / 4 === 0 && "justify-center"}`}>
          {Loading
            ? Array.from({ length: 8 }).map((_, index) => {
                return <CourseSkeleten key={index} />;
              })
            : courses.map((_, index) => {
                return <Course key={index} />
              })}
        </div>
      </div>
    </div>
  );
};
