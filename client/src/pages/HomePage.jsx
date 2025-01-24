import Hero from "../components/student/Hero";
import { Courses } from "../components/student/Courses";
import useAuthstore from "@/zustand/useAuthStore";

const HomePage = () => {
  let tokenExpiry = parseInt(localStorage.getItem("authUserExpireAt"));
  if (tokenExpiry < Date.now()) {
    useAuthstore.getState().setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authUserExpireAt");
  }
  return (
    <div className="container mx-auto">
      <Hero />
      <Courses />
    </div>
  );
};

export default HomePage;
