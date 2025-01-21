import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRoutes from "./routes/course.routes.js";
import lectureRoutes from "./routes/lecture.routes.js";
import videoUploaderRoute from "./routes/videoUploader.route.js";
import { Course } from "./models/course.model.js";
import purchaseRoute from "./routes/purchase.routes.js";
import progressRoute from "./routes/courseProgress.routes.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/api/course/publishedCourses", async (req, res) => {
  try {
    const response = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name profileImage",
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/lecture", lectureRoutes);
app.use("/api/media", videoUploaderRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/progress", progressRoute);

// handle incoming error from controller
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDB();
  console.log("Example app listening on port 3000!");
});
