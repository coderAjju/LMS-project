import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import {
  getCourseProgress,
  markAsCompleted,
  markAsInCompleted,
  updateLecutreProgress,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

router.get("/:courseId", protectedRoute, getCourseProgress);
router.post(
  "/:courseId/lecture/:lectureId/view",
  protectedRoute,
  updateLecutreProgress
);
router.post("/:courseId/complete", protectedRoute, markAsCompleted);
router.post("/:courseId/incomplete", protectedRoute, markAsInCompleted);

export default router;
