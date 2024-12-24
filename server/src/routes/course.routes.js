import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import { createCourse, getCreatorCourses,getSingleCourse,updateCourse } from '../controllers/course.controller.js';
import upload from '../config/multer.js';

const Router = express.Router();

Router.post("/create",protectedRoute,createCourse);
Router.get("/getAllCreatorCourses",protectedRoute,getCreatorCourses);
Router.get("/:id",protectedRoute,getSingleCourse);
Router.put("/update/:id",protectedRoute,upload.single("courseThumbnail"),updateCourse);
export default Router;