import { useState } from "react";
import Course from "./Course";
import useAuthstore from "@/zustand/useAuthStore";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const [profileFile, setProfileFile] = useState(null)
  const [files, setFiles] = useState(null)
  // Mock user data
  const {user,updateUser} = useAuthstore();
  const [userName, setUserName] = useState(user.name)
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
       setLoading(true);
    await updateUser(userName,files);
    setLoading(false);
    setEditMode(false);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFiles(file);
    if (file) {
      setProfileFile(URL.createObjectURL(file));
    }
    user.profileImage = profileFile;
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen mt-24">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {/* Profile Section */}
        <div className="border-b pb-6 mb-6">
          {editMode ? (
            <div className="grid gap-4">
              {/* User Image */}
              <div className="flex items-center flex-col sm:flex-row gap-4">
                <img
                  src={user.profileImage ? user.profileImage : profileFile}
                  alt="User"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow"
                />
                <div>
                  <label className="block font-medium">Profile Picture</label>
                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    onChange={handleFile}
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
                  className="w-full py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              <button
                onClick={handleSave}
                className={`px-4 py-2 flex justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 ${loading?"opacity-70 cursor-not-allowed":"opacity-100 cursor-pointer"}`}
                disabled={loading}
              >
                {
                  loading ? <Loader2 className=" animate-spin"/> :"Save"
                }
              </button>
            </div>
          ) : (
            <div>
              {/* User Image */}
              <div className="flex items-center flex-col sm:flex-row gap-4 mb-4">
                <img
                  src={user.profileImage ? user.profileImage : profileFile}
                  alt="User"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow"
                />
                <div className="flex flex-col gap-[1px]">
                  <p className="text-lg font-bold">{userName}</p>
                  <p className="text-gray-500">Email: {user.email}</p>
                  <p className="text-gray-500 uppercase">Role: {user.role}</p>
                </div>
              </div>

              <button
                onClick={toggleEditMode}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Enrolled Courses Section */}
        <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
        <div
          className={`flex gap-4 flex-wrap lg:justify-normal justify-center ${
            courses.length / 4 === 0 && "justify-center"
          }`}
        >
          {user.enrolledCourses
.length === 0 ? <p>You are not enrolled in any course</p> : courses.map((course) => (
            <Course course={course} key={course.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
