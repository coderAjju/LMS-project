import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import { createCourse, getCreatorCourses,getSingleCourse,togglePublishCourse,updateCourse } from '../controllers/course.controller.js';
import upload from '../config/multer.js';

const Router = express.Router();

Router.post("/create",protectedRoute,createCourse);
Router.get("/getAllCreatorCourses",protectedRoute,getCreatorCourses);
Router.get("/:id",protectedRoute,getSingleCourse);
Router.put("/update/:id",protectedRoute,upload.single("courseThumbnail"),updateCourse);
Router.put("/:courseId",protectedRoute,togglePublishCourse);
export default Router;