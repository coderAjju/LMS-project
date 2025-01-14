import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import BuyCourseButton from "../BuyCourseButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

const CourseDetailPage = () => {
  const {courseId} = useParams();
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=>{
    async function fetchDetails(){
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(`/api/course/detail-with-status`);
        console.log(res.data)
      } catch (error) {
        console.log(error.message)
        toast.error(error.response.data.message || error.message);
      }finally{
        setIsLoading(false);
      }
    }
    fetchDetails();
  },[])
  let purchasedCourse = false;
  return (
    <div className="mt-24 space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">Course SubTitle</p>
          <p>
            Create By{" "}
            <span className="text-[#c0c4fc] underline italic">
              Ajay Upadhyay
            </span>{" "}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last upadated 11-11-2024</p>
          </div>
          <p>Student enrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p>
            This comperhensive course is designed for developers who want to
            learn how to build robust, production ready web applications using
            Next.js. You will master server-side rendering, static site
            generation, API routes, dynamic routing, and much more. By the end
            of this course, you will be able to create SEO-friendly, scalable,
            and fast web applications with ease.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((lecture, index) => {
                return (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <span>
                      {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                    </span>
                    <p>Lecture title</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
            <Card>
              <CardContent>
                <div className="w-full aspect-video mb-4">
                React player Video ayega
                </div>
                <h1>Lecture title</h1>
                <Separator className="my-2"/>
                <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
              </CardContent>
              <CardFooter>
                {
                  purchasedCourse ? (
                    <Button>Continue learning</Button>
                  ):
                  <BuyCourseButton courseId={courseId}/>
                }
              </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
