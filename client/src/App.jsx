import { Routes, Route, useNavigate } from "react-router-dom";
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
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetailPage from "./components/student/CourseDetailPage";
import PrivateRoute from "./pages/ProtectedRoute";
import CourseProgress from "./components/student/CourseProgress";
import SearchPage from "./components/student/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectRoute";
import { PurchaseCouseProtectedRoute } from "./components/PurchaseCourseProtectedRoute";

const App = () => {
  const { setUser } = useAuthstore();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/api/auth/user");
        setUser(res.data.user);
        console.log("user data fetched");
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
        <Route
          path="/signup"
          element={
            <AuthenticatedUser>
              <Signup />
            </AuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <AuthenticatedUser>
              <LoginPage />
            </AuthenticatedUser>
          }
        />
        <Route
          path="/my-learning"
          element={
            <ProtectedRoute>
              <MyLearning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/course-detail/:courseId"
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-learning/course-detail/:courseId"
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="/course/search" element={<SearchPage />} />
        <Route
          path="/course-detail/:courseId"
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course-progress/:courseId"
          element={
            <ProtectedRoute>
              <PurchaseCouseProtectedRoute>
                <CourseProgress />
              </PurchaseCouseProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* // admin routes start from here */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Sidebar />
            </AdminRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route path="course" element={<CourseTable />}>
            <Route path="create" element={<AddCourse />} />
          </Route>
          <Route path="course/:courseId" element={<EditCourse />} />
          <Route path="course/:courseId/lecture" element={<CreateLecture />} />
          <Route
            path="course/:courseId/lecture/:lectureId"
            element={<EditLecture />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
