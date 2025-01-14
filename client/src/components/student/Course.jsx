/* eslint-disable react/prop-types */
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Badge from "../SmallComponent/Badge";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  function capitalizeWords(str="") {
    return str
      .split(" ") // Split string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
      .join(" "); // Join words back
  }
  
  return (
    <Link to={`course-detail/${course?._id}`}>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white  shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-[330px] sm:w-[310px] md:w-[290px] ">
      <div className="relative">
        <img
          src={course?.courseThumbnail}
          alt="course"
          className="w-full h-42 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className=" space-y-2 px-3 py-3 ">
        <h1 className="hover:underline truncate  font-bold text-lg">
          {course?.courseTitle}
        </h1>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={course?.creator?.profileImage || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{capitalizeWords(course?.creator?.name)}</h1>
          </div>
          <Badge level={course?.courseLevel}/>
        </div>
          <div className="text-lg font-bold">
            <span>₹{course?.coursePrice}</span>
          </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default Course;
