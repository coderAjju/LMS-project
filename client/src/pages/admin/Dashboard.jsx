import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import MyChart from "./MyChart";

const Dashboard = () => {
  const [purchasedCourse, setPurchasedCourse] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(
          "/api/purchase/getPuchasedCourse"
        );
        setPurchasedCourse(response.data.purchasedCourses);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const totalSale = purchasedCourse?.length || 0;

  const totalRevenue = purchasedCourse.reduce(
    (acc, elem) => acc + (elem.amount || 0),
    0
  );
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSale}</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MyChart purchasedCourse={purchasedCourse} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
