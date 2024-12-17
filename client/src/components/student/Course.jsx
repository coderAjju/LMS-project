import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Badge from "../SmallComponent/Badge";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white  shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-[330px] sm:w-[310px] md:w-[290px] ">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          alt="course"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className=" space-y-2 px-3 py-3 ">
        <h1 className="hover:underline truncate  font-bold text-lg">
          Nextjs 14 Complete Course
        </h1>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Hitesh Choudhary</h1>
          </div>
          <Badge/>
        </div>
          <div className="text-lg font-bold">
            <span>₹499</span>
          </div>
      </CardContent>
    </Card>
  );
};

export default Course;
