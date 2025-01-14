import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { createCheckoutSession, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../controllers/coursePurchase.controller.js';

const Router = express.Router();

Router.post("/checkout/create-checkout-session",protectedRoute,createCheckoutSession);
Router.post("/webhook",express.raw({type:"application/json"}),stripeWebhook);
Router.get("/detail-with-status",getCourseDetailWithPurchaseStatus)
// Router.get(`/course/:courseId/detail-with-status`);

export default Router;