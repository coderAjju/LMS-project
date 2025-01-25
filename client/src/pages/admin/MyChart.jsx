import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MyChart = ({ purchasedCourse }) => {
  const courseData = purchasedCourse.map((course) => {
    return {
      name: course.courseId.courseTitle,
      price: course.courseId.coursePrice,
    };
  });
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={courseData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            angle={-30} // Rotated labels for better visibility
            textAnchor="end"
            interval={0} // Display all labels
          />
          <YAxis stroke="#6b7280" />
          <Tooltip formatter={(price, name) => [`₹${price}`, name]} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4a90e2" // Changed color to a different shade of blue
            strokeWidth={3}
            dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
