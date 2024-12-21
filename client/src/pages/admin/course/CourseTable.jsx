import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCourseStore from "@/zustand/useCourseStore";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

const CourseTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { isCreateCourse, setIsCreateCourse,getAllCreatorCourse } = useCourseStore();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchCourses = async () => {
      setIsLoading(true);
      const response = await getAllCreatorCourse();
      if (response.success) {
        setCourses(response.data.courses);
      } else {
        toast.error(response.error);
      }
      setIsLoading(false);
    };

    fetchCourses();
  }, [getAllCreatorCourse,isCreateCourse]);
  if (isLoading) {
    return <div>Loading courses...</div>;
  }

  if (courses.length === 0) {
    return <div>No courses created yet.</div>;
  }

  return (
    <div className="w-full">
      <Button className="mb-3" onClick={() => setIsCreateCourse(true)}>
        <Link to={"/admin/course/create"}>Add new course</Link>
      </Button>
      {isCreateCourse ? (
        <Outlet />
      ) : (
        <Table className="">
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {
            courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course?.price || "NA"}</TableCell>
                <TableCell><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
                <TableCell className="font-medium">{course.courseTitle}</TableCell>
                <TableCell className="text-left">
                  <Button size="sm" varient="ghost" onClick={()=>navigate(`${course._id}`)} ><Edit/></Button>
                </TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CourseTable;
