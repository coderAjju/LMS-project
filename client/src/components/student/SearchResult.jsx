import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const SearchResult = ({ course }) => {
  let courseID = 2;
  return (
    <div className="flex flex-col md:flow-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="w-full md:w-56 h-32 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold">{course.creator.name}</span>
          </p>
          <Badge className={"w-fit mt-2 md:mt-0 "}>{course.courseLevel}</Badge>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
