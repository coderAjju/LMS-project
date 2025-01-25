import { deleteMediaFromCloudinary } from "../config/cloudinary.js";
import { Course } from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createLecture = async (req, res, next) => {
  try {
    const { lectureTitle } = req.body;
    const courseId = req.params.courseId;
    if (!lectureTitle) {
      throw new Error("Lecture title is required");
    }

    //create lecture
    const lecture = await Lecture.create({
      lectureTitle,
    });

    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    course.lectures.push(lecture._id);
    await course.save();

    return res
      .status(200)
      .json({ lecture, message: "Lecture created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

export const getSingleLecture = async (req, res, next) => {
  try {
    const lectureId = req.params.lectureId;
    if (!lectureId) {
      throw new Error("Lecture id is required");
    }
    const lecture = await Lecture.findById(lectureId);
    return res.status(200).json({ lecture });
  } catch (error) {
    next(error);
  }
};

export const uploadLecture = async (req, res, next) => {
  try {
    const lectureId = req.params.lectureId;
    const { lectureTitle, uploadVideoInfo, isFree, courseId } = req.body;

    if (!lectureId) {
      throw new Error("Lecture id is required");
    }
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      throw new Error("Lecture not found");
    }
    if (
      !uploadVideoInfo.videoUrl ||
      !uploadVideoInfo.publicId ||
      !lectureTitle
    ) {
      throw new Error("All field are required");
    }
    lecture.videoUrl = uploadVideoInfo.videoUrl;
    lecture.publicId = uploadVideoInfo.publicId;
    lecture.lectureTitle = lectureTitle;
    lecture.isPreviewFree = isFree;
    await lecture.save();

    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    } else if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res
      .status(200)
      .json({ lecture, message: "Lecture uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

export const removeLecture = async (req, res, next) => {
  try {
    const lectureId = req.params.lectureId;
    if (!lectureId) {
      throw new Error("Lecture id is required");
    }

    let lecture = await Lecture.findByIdAndDelete(lectureId);

    // delete the lecture from the cloudinary as well
    if (lecture.publicId) {
      console.log("file public id is ", lecture.publicId);
      await deleteMediaFromCloudinary(lecture.publicId);
    }

    // delete the lecture reference from the associated course
    await Course.updateOne(
      { lectures: lectureId }, // find the course that contain the lecture
      { $pull: { lectures: lectureId } } //pull or remove the lecture id from the lectures array
    );
    return res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    next(error);
  }
};
