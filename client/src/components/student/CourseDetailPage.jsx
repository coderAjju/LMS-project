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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import ReactPlayer from "react-player";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetail, setCourseDetail] = useState({});
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchDetails() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          `/api/purchase/${courseId}/detail-with-status`
        );
        console.log(res.data);
        setCourseDetail(res.data.course);
        setIsCoursePurchased(res.data.purchased);
      } catch (error) {
        console.log(error.message);
        toast.error(error.response.data.message || error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [courseId, setCourseDetail]);

  if (isLoading) {
    return <div className="mt-20">Laoding...</div>;
  }
  const handleContinueCourse = () => {
    if (isCoursePurchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };
  return (
    <div className="mt-24 space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {courseDetail?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{courseDetail?.subTitle}</p>
          <p>
            Create By{" "}
            <span className="text-[#c0c4fc] underline italic">
              {courseDetail?.creator?.name}
            </span>{" "}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last upadated {courseDetail?.updatedAt?.split("T")[0]}</p>
          </div>
          <p>Student enrolled: {courseDetail?.enrolledStudents?.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p dangerouslySetInnerHTML={{ __html: courseDetail.description }} />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {courseDetail?.lectures?.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {courseDetail?.lectures?.map((lecture, index) => {
                return (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <span>
                      {lecture.isPreviewFree ? (
                        <PlayCircle size={14} />
                      ) : (
                        <Lock size={14} />
                      )}
                    </span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full relative aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  url={courseDetail?.lectures?.[0]?.videoUrl || null}
                  controls
                />
              </div>
              <h1>Lecture title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                ₹{courseDetail.coursePrice}
              </h1>
            </CardContent>
            <CardFooter>
              {isCoursePurchased ? (
                <Button onClick={handleContinueCourse}>
                  Continue learning
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
