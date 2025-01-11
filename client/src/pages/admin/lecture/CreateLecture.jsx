import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLectureStore from "@/zustand/useLectureStore";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CreateLecture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectures, setLectures] = useState([])
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const {CreateLecture,GetAllLectures} = useLectureStore();

  const handleLectureUpload = async () => {
    try {
      setIsLoading(true);
      if(lectureTitle === "") return toast.error("Lecture title is required");
      const response = await CreateLecture(lectureTitle, courseId);
      if (!response.success) {
        throw new Error(response.error);  
      }
      setLectures((prev)=>[...prev, response.data.lecture])
      setLectureTitle("");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    } 
  }

  useEffect(() => {
    (async()=>{
      try {
        setLoading(true);
        const response = await GetAllLectures(courseId);
        if (!response.success) {
          throw new Error(response.error);
        }
        setLectures(response.data.lectures)
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  if(loading){
    return <div className="flex items-center justify-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </div>
  }

  const gotoUpdateLecture = (lectureId) => {
    navigate(`/admin/course/${courseId}/lecture/${lectureId}`)
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="font-bold text-2xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
          molestiae?
        </p>
      </div>
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="Your title name"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate("/admin/course")}>
          Back to course
        </Button>
        <Button disabled={isLoading} onClick={handleLectureUpload}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </>
          ) : (
            "Create Lecture"
          )}
        </Button>
      </div>

      {/* previous lecture */}
      <div>
        {
          lectures.length > 0 && lectures.map((lecture,index)=>{
            return <div key={lecture._id} className="flex items-center justify-between bg-[#f9f7fa] dark:bg-[#1f1f1f] px-4 rounded-md my-2 ">
              <h1 className="font-bold text-gray-800 dark:text-gray-100">
               Lecture - {index + 1 +": "}{lecture.lectureTitle}
              </h1>
              <Edit size={20} onClick={()=>gotoUpdateLecture(lecture._id)} className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
            </div>
          })
        }
      </div>
    </div>
  );
};

export default CreateLecture;
