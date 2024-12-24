import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { createLecture } from '../controllers/lecture.controller.js';
const Router = express.Router();

Router.post("/:courseId/create",protectedRoute,createLecture);

export default Router;