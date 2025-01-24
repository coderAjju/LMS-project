import { deleteMediaFromCloudinary } from "../config/cloudinary.js";
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

export const togglePublishCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // publish course based on the query parameter of publish
    course.isPublished = publish === "true";
    course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      isPublished: course.isPublished,
      message: `Course ${statusMessage} successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const publishedCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isPublished: true });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error occurred:", error);
    next(error);
  }
};

export const searchCourse = async (req, res, next) => {
  try {
    let { query = "", categories = "", sortByPrice = "" } = req.query;

    if (categories !== "") {
      query = "";
    }

    // Parse categories into an array
    const categoryArray = categories ? categories.split(",") : [];

    // Build the base search criteria
    const searchCriteria = {
      isPublished: true,
      $and: [],
    };

    // Add query-based search
    if (query) {
      searchCriteria.$and.push({
        $or: [
          { courseTitle: { $regex: query, $options: "i" } },
          { subTitle: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      });
    }

    // Add category-based search
    if (categoryArray.length > 0) {
      searchCriteria.$and.push({
        category: { $in: categoryArray },
      });
    }

    // If no filters exist, remove $and
    if (searchCriteria.$and.length === 0) {
      delete searchCriteria.$and;
    }

    // Define sorting options
    const sortOptions =
      sortByPrice === "low"
        ? { coursePrice: 1 }
        : sortByPrice === "high"
        ? { coursePrice: -1 }
        : {};

    // Fetch courses
    const courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name profileImage" })
      .sort(sortOptions);

    // Send the response
    res.status(200).json({
      courses: courses || [],
      success: true,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    next(new Error("Internal Server Error"));
  }
};
