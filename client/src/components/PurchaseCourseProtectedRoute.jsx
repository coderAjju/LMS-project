import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export const PurchaseCouseProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Set loading to true initially
  const [data, setData] = useState(null); // Use null to differentiate between loading state and fetched data
  const { courseId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get(
          `/api/purchase/${courseId}/detail-with-status`
        );
        setData(res.data.purchased); // Update state with the purchase status
      } catch (error) {
        console.log(error.message);
        setData(false); // In case of error, set to false to prevent route protection failure
      } finally {
        setIsLoading(false); // Set loading to false after the API call is done
      }
    })();
  }, [courseId]);

  // Show loading message while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect if not purchased (data is false)
  return data ? children : <Navigate to={`/course-detail/${courseId}`} />;
};
