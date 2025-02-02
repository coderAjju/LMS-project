import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/lib/axios";
import useCourseStore from "@/zustand/useCourseStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CourseTab = () => {
  const [isPublished, setIsPublished] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const { updateCourse, publishCourse } = useCourseStore();
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
    isPublished: false,
    lectures: [],
  });

  const param = useParams();
  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`/api/course/${param.courseId}`);
      setInput(response.data.course);
      
      if (response.data.course.isPublished) {
        setIsPublished(true);
      } else {
        setIsPublished(false);
      }
      
      if (response.data.course.courseThumbnail) {
        setPreviewThumbnail(response.data.course.courseThumbnail);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (value) => {
    const file = value.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        return setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const updateCourseMethod = async () => {
    try {
      setIsLoading(true);
      const response = await updateCourse(input);
      if (!response.success) {
        throw new Error(response.error);
      }
      console.log(response);
      navigate("/admin/course");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const handlePublishMethod = async () => {
    try {
      const courseId = param.courseId;
      const response = await publishCourse(courseId, !isPublished);
      if (!response.success) {
        throw new Error(response.error);
      }
      if (response.success) {
        setIsPublished(!isPublished);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={input.lectures.length === 0}
            variant="outline"
            onClick={handlePublishMethod}
            className={`${
              input.lectures.length === 0 ? "cursor-not-allowed" : ""
            }`}
          >
            {!isPublished ? "Publish" : "Unpublish"}
          </Button>

          <Button>Remove Courses</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={handleChange}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="nextjs">Next JS</SelectItem>
                    <SelectItem value="datascience">Data Science</SelectItem>
                    <SelectItem value="docker">Docker</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="nodejs">Node JS</SelectItem>
                    <SelectItem value="mongodb">Mongo DB</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Fullstack development</SelectItem>
                    <SelectItem value="java">MERN stack development</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select value={input.courseLevel} onValueChange={selectLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                placeholder="Ex. 1000"
                onChange={handleChange}
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className=" w-64 my-2"
                alt="course thumbnail"
              />
            )}
          </div>
          <div>
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseMethod}>
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
