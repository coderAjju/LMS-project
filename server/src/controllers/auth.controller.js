import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../config/cloudinary.js";
import generateTokenAndSetCookie from "../helper/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {v2 as cloudinary} from 'cloudinary'
import { Readable } from "stream";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ user, success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Invalid credential" });
    }

    await generateTokenAndSetCookie(user._id, user.role, res);

    res.status(200).json({ message: "User logged successfully", user });
  } catch (error) {
    next(error);
  }
};

export const logout = (_, res, next) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: "true",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    return res.status(200).json({ user: user, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profileImage = req.file;
    if (!profileImage) {
      return res
        .status(400)
        .json({ message: "Profile image is required", success: false });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // extract public id from old image url if is it exist
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0];
      await deleteMediaFromCloudinary(publicId);
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.log("upload failed error: ", error);
          return res.status(500).json({ error: "Upload failed" });
        }
  });

    // Convert the buffer to a readable stream and pipe it to the upload stream
    const bufferStream = Readable.from(profileImage.buffer);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};
