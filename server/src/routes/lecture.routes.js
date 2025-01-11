import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { createLecture, getAllLectures, getSingleLecture,removeLecture,uploadLecture } from '../controllers/lecture.controller.js';
const Router = express.Router();

Router.post("/:courseId/create",protectedRoute,createLecture);
Router.get("/:courseId/allLectures",protectedRoute,getAllLectures);
Router.get("/:lectureId",protectedRoute,getSingleLecture);
Router.post("/:lectureId/upload",protectedRoute,uploadLecture);
Router.delete("/:lectureId",protectedRoute,removeLecture); 
export default Router;