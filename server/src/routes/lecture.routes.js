import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { createLecture, getAllLectures, getSingleLecture } from '../controllers/lecture.controller.js';
const Router = express.Router();

Router.post("/:courseId/create",protectedRoute,createLecture);
Router.get("/allLectures",protectedRoute,getAllLectures);
Router.get("/:lectureId",protectedRoute,getSingleLecture);

export default Router;