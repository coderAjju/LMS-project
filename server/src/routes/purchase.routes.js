import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../controllers/coursePurchase.controller.js';

const Router = express.Router();

Router.post("/checkout/create-checkout-session",protectedRoute,createCheckoutSession);
Router.post("/webhook",express.raw({type:"application/json"}),stripeWebhook);
Router.get("/:courseId/detail-with-status",protectedRoute,getCourseDetailWithPurchaseStatus)
Router.get("/getPuchasedCourse",protectedRoute,getAllPurchasedCourse)
// Router.get(`/course/:courseId/detail-with-status`);

export default Router;