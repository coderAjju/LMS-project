import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import MyLearning from "./components/student/MyLearning";
import Profile from "./components/student/Profile";
import { useEffect } from "react";
import axiosInstance from "./lib/axios";
import useAuthstore from "./zustand/useAuthStore";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "./store/slice/authSlice";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetailPage from "./components/student/CourseDetailPage";

const App = () => {
  const { setUser } = useAuthstore();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/api/auth/user");
        setUser(res.data.user);
        console.log(res)
        if (!res.data.success) {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error.message);
        // toast.error(error.response.data.message || error.message)
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/course-detail/:courseId" element={<CourseDetailPage />} />

        {/* // admin routes start from here */}
        <Route path="/admin" element={<Sidebar/>} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course" element={<CourseTable />} >
            <Route path="create" element={<AddCourse/>} />
          </Route>
          <Route path="course/:courseId" element={<EditCourse/>}/>
          <Route path="course/:courseId/lecture" element={<CreateLecture/>}/>
          <Route path="course/:courseId/lecture/:lectureId" element={<EditLecture/>}/>

        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
