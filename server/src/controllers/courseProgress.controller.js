import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    const courseDetails = await Course.findById(courseId).populate("lectures");

    if (!courseDetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLecutreProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    //fetch or create course Progress
    let courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    // find the lecture progress in the course progress
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      // if lecture already exist, update it's status
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      //add new lecture
      courseProgress.lectureProgress.push({ lectureId, viewed: true });
    }
    let lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    );
    // console.log("total viewed lecture ", lectureProgressLength.length);
    const course = await Course.findById(courseId);

    console.log(
      "total lecture in course ",
      course.lectures.length,
      "and total viewed lecture ",
      lectureProgressLength.length
    );
    if (course.lectures.length === lectureProgressLength.length) {
      courseProgress.completed = true;
    }
    await courseProgress.save();

    return res.status(200).json({
      message: "Lecture progress updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    courseProgress.lectureProgress.map((lecture) => (lecture.viewed = true));
    courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({
      message: "Course marked as completed",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    courseProgress.lectureProgress.map((lecture) => (lecture.viewed = false));
    courseProgress.completed = false;
    await courseProgress.save();
    return res.status(200).json({
      message: "Course marked as incompleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
