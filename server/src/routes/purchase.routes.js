import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../controllers/coursePurchase.controller.js';
import { CoursePurchase } from '../models/purchaseCourse.model.js';

const Router = express.Router();

Router.post("/checkout/create-checkout-session",protectedRoute,createCheckoutSession);
Router.post("/webhook",express.raw({type:"application/json"}),stripeWebhook);
Router.get("/:courseId/detail-with-status",protectedRoute,getCourseDetailWithPurchaseStatus)
Router.get("/getPuchasedCourse",protectedRoute,getAllPurchasedCourse)
// Router.get(`/course/:courseId/detail-with-status`);


// testing routes
Router.get("/test", protectedRoute, async(req, res) => {
    const course = await CoursePurchase.find().populate({ path: "courseId" });
          if (!course) {
            return res.status(404).json({ message: "Course not found" });
          }
            res.status(200).json({ course });
})
export default Router;