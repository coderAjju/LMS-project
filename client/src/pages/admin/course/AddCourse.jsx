import { Button } from "@/components/ui/button";
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
import useCourseStore from "@/zustand/useCourseStore";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddCourse = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isCreateCourse, setIsCreateCourse, createCourse } = useCourseStore();
  const [category, setCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const handleBackBtn = () => {
    setIsCreateCourse(!isCreateCourse);
    navigate(-1);
  };

  const handleCreateCourse = async () => {
    try {
      setIsLoading(true);
      const response = await createCourse(courseTitle, category);
      if (!response.success) {
        throw new Error(response.error);
      }
      setIsCreateCourse(!isCreateCourse);
      navigate("/admin/course");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  return (
    <div className="flex-1 lg:mx-10 mx-2">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic course details for your new
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
        <div className="my-4">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={courseTitle}
            placeholder="Your course name"
            onChange={(e) => setCourseTitle(e.target.value)}
          ></Input>
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="nextjs">Next JS</SelectItem>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="datascience">Data Science</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="nodejs">Node JS</SelectItem>
                <SelectItem value="mongodb">Mongo DB</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="fullstack">Fullstack development</SelectItem>
                <SelectItem value="MERNstack">
                  MERN stack development
                </SelectItem>
              </SelectGroup>{" "}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center my-4">
          <Button variant="outline" onClick={handleBackBtn}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={handleCreateCourse}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
