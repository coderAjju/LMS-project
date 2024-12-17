import express from "express";
import { login, logout, signup,getUser, updateProfile } from "../controllers/auth.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
import upload from "../config/multer.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user",protectedRoute, getUser);
router.put("/updateProfile",protectedRoute,upload.single("profileImage"),updateProfile)

export default router;