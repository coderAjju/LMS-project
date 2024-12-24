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

const App = () => {
  const { setUser } = useAuthstore();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/api/auth/user");
        setUser(res.data.user);
        dispatch(userLoggedIn(res.data.user));
        if (!res.data.success) {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
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

        {/* // admin routes start from here */}
        <Route path="/admin" element={<Sidebar/>} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course" element={<CourseTable />} >
            <Route path="create" element={<AddCourse/>} />
          </Route>
          <Route path="course/:courseId" element={<EditCourse/>}/>
          <Route path="course/:courseId/lecture" element={<CreateLecture/>}/>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
