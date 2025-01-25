/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const SearchResult = ({ course }) => {
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
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 items-start justify-center">
            <h1 className="font-bold text-lg md:text-xl">
              {course.courseTitle}
            </h1>
            <h1 className="text-sm text-gray-600">{course.subTitle}</h1>
            <p className="text-sm text-gray-700">
              Instructor:{" "}
              <span className="font-bold">{course.creator.name}</span>
            </p>
            <Badge className={"w-fit mt-2 md:mt-0 "}>
              {course.courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold flex justify-end items-end pr-4">
            <span>₹{course.coursePrice}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
