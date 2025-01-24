import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import { createCourse, getCreatorCourses,getSingleCourse,publishedCourses,searchCourse,togglePublishCourse,updateCourse } from '../controllers/course.controller.js';
import upload from '../config/multer.js';

const Router = express.Router();

Router.post("/create",protectedRoute,createCourse);
Router.get("/search",protectedRoute,searchCourse);
Router.get("/getAllCreatorCourses",protectedRoute,getCreatorCourses);
Router.get("/:id",protectedRoute,getSingleCourse);
Router.put("/update/:id",protectedRoute,upload.single("courseThumbnail"),updateCourse);
Router.put("/:courseId",protectedRoute,togglePublishCourse);
//published course ko get karne ka code index.js file mein likha hai

// Router.delete("/:courseId",protectedRoute);
export default Router;