import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import useCourseProgressStore from "@/zustand/useCourseProgressStore";
import { useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const CourseProgress = () => {
  const [courseDetail, setCourseDetail] = useState({});
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const { courseId } = useParams();
  const {
    getCourseProgress,
    updateLectureProgress,
    markAsCompleted,
    markAsInCompleted,
  } = useCourseProgressStore();

  useEffect(() => {
    // fetch course progress
    fetchCourseProgress(courseId);
  }, [courseId]);

  const fetchCourseProgress = async (courseId) => {
    const courseProgress = await getCourseProgress(courseId);
    setCourseDetail(courseProgress.courseDetails);
    setProgress(courseProgress.progress);
    setCompleted(courseProgress.completed);
  };

  let initialLecture =
    currentLecture || (courseDetail.lectures && courseDetail.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((lec) => lec.lectureId === lectureId && lec.viewed);
  };

  const handleLectureUpdate = async (lectureId) => {
    await updateLectureProgress(courseId, lectureId);
    setProgress([...progress, { lectureId, viewed: true }]);
    fetchCourseProgress(courseId);
  };

  const handleCompleteCourse = async () => {
    let res = await markAsCompleted(courseId);
    console.log(res);
    fetchCourseProgress(courseId);
  };

  const handleInCompleteCourse = async () => {
    let res = await markAsInCompleted(courseId);
    console.log(res);
    fetchCourseProgress(courseId);
  };
  return (
    <div className="max-w-7xl mx-auto p-4 mt-16">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetail.courseTitle}</h1>
        <Button
          className={`${
            completed ? "bg-green-500 hover:bg-green-600" : ""
          } text-white dark:bg-gray-900 hover:dark:bg-gray-950`}
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
        >
          {completed ? (
            <div className="flex items-center gap-1">
              <CheckCircle /> <span>Completed</span>
            </div>
          ) : (
            <span>Incompleted yet</span>
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div className="relative h-[300px] md:h-[400px]">
            <video
              className="w-full h-full object-contain rounded-lg"
              controls
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              onPlay={() =>
                handleLectureUpdate(currentLecture?._id || initialLecture._id)
              }
            ></video>
          </div>
          {/* display current watching lecture title */}
          <div className="mt-2">
            <h3 className=" font-medium text-lg ">{`Lecture ${
              courseDetail?.lectures?.findIndex(
                (lec) => lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
            } : ${
              currentLecture?.lectureTitle || initialLecture?.lectureTitle
            }`}</h3>
          </div>
        </div>
        {/* lecture sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h1 className=" font-semibold text-xl mb-4">Course Lecture </h1>
          {courseDetail?.lectures?.map((lecture, index) => (
            <Card
              key={index}
              className={`mb-3 hover:cursor-pointer transition transform ${
                currentLecture?._id === lecture?._id ? "bg-gray-200" : ""
              }`}
              onClick={() => setCurrentLecture(lecture)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  {isLectureCompleted(lecture._id) ? (
                    <CheckCircle2 size={24} className="text-green-600 mr-2" />
                  ) : (
                    <CirclePlay size={24} className="text-gray-600 mr-2" />
                  )}
                  <div>
                    <CardTitle className={`font-medium text-lg `}>
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>
                </div>
                {isLectureCompleted(lecture._id) && (
                  <Badge
                    variant={"outline"}
                    className={"bg-green-200 text-green-600"}
                  >
                    Completed
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
