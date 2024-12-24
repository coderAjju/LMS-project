import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLectureStore from "@/zustand/useLectureStore";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CreateLecture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const {CreateLecture} = useLectureStore();

  const handleLectureUpload = async () => {
    try {
      setIsLoading(true);
      const response = await CreateLecture(lectureTitle, courseId);
      if (!response.success) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    } 
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
    </div>
  );
};

export default CreateLecture;
