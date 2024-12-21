import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import { createCourse, getCreatorCourses } from '../controllers/course.controller.js';

const Router = express.Router();

Router.post("/create",protectedRoute,createCourse);
Router.get("/getAllCreatorCourses",protectedRoute,getCreatorCourses);

export default Router;