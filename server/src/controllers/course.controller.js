import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../config/cloudinary.js";
import { Course } from "../models/course.model.js";

import { Readable } from "stream";

import { v2 as cloudinary } from "cloudinary";

export const createCourse = async (req, res, next) => {
  try {
    const { title: courseTitle, category } = req.body;

    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ message: "Course title and Category are required" });
    }
    const course = await Course({
      courseTitle,
      category,
      creator: req.id,
    });
    const result = await course.save();
    return res.status(200).json({
      course,
      message: "Course created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getCreatorCourses = async (req, res, next) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ message: "No course found" });
    }
    return res.status(200).json({ courses });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "No course found" });
    }
    return res.status(200).json({ course });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail,
    } = req.body;
    const thumbnail = req.file;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "No course found" });
    }
    course.courseTitle = courseTitle;
    course.subTitle = subTitle;
    course.description = description;
    course.category = category;
    course.courseLevel = courseLevel;
    course.coursePrice = coursePrice;
    if (thumbnail) {
      if (course.courseThumbnail) {
        deleteMediaFromCloudinary(
          course.courseThumbnail.split("/").pop().split(".")[0]
        );
      }
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.log("upload failed error: ", error);
            return res.status(500).json({ error: "Upload failed" });
          }
          course.courseThumbnail = result.secure_url;
          course.save();
        }
      );
      // Convert the buffer to a readable stream and pipe it to the upload stream
      const bufferStream = Readable.from(thumbnail.buffer);
      bufferStream.pipe(uploadStream);
    }

    await course.save();
    return res.status(200).json({
      message: "Course updated successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};


export const togglePublishCourse = async (req,res,next)=>{
  try {
      const {courseId} = req.params;
      const {publish} = req.query;
      const course = await Course.findById(courseId);
      if(!course){
        return res.status(404).json({message:"Course not found"}  )
      }

      // publish course based on the query parameter of publish
      course.isPublished = publish === "true";
      course.save();

      const statusMessage = course.isPublished ? "Published" : "Unpublished";
      return res.status(200).json({isPublished:course.isPublished,message:`Course ${statusMessage} successfully`});
  } catch (error) {
    next(error);
  }
}