import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="lg:block lg:w-[250px] sm:w-[300px] lg:space-y-8  border-r border-gray-300 dark:border-gray-700 lg:p-5 lg:mt-4 mt-4 px-2 sticky top-0 h-screen">
        <div className="space-y-4 mt-14">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1 className="hidden lg:block">Dashboard</h1>
          </Link>
          <Link to="/admin/course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1 className="hidden lg:block">Course</h1>
          </Link>
        </div>
      </div>

      <div className="mt-24 lg:px-16 md:px-8 px-3 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
