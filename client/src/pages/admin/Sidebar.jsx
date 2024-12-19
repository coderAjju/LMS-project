import { ChartNoAxesColumn, SquareLibrary } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="flex">
    <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r broder-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen">
        <div className="space-y-4 mt-14">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
                <ChartNoAxesColumn size={22}/>
                <h1>Dashboard</h1>
            </Link>
            <Link to={"/admin/course"} className="flex items-center gap-2">
                <SquareLibrary size={22}/>
                <h1>Course</h1>
            </Link>
        </div>
    </div>
    <div className="mt-24 lg:px-16 md:px-8 px-3 w-full">
        <Outlet/>
    </div>
    </div>
  )
}

export default Sidebar