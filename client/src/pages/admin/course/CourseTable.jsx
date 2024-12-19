import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCourseStore from "@/zustand/useCourseStore";
import { Link, Outlet } from "react-router-dom";
const CourseTable = () => {
  const { isCreateCourse, setIsCreateCourse } = useCourseStore();
  return (
    <div className="w-full">
      <Button className="mb-3" onClick={() => setIsCreateCourse(true)}>
        <Link to={"/admin/course/create"}>Add new course</Link>
      </Button>
      {isCreateCourse ? (
        <Outlet />
      ) : (
        <Table className="">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default CourseTable;
