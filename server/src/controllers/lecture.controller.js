import {Course} from "../models/course.model.js";
import lectureModel from "../models/lecture.model.js";

export const createLecture = async (req, res, next) => {
    try {
        const {lectureTitle} = req.body;
        const courseId = req.params.courseId;
        if(!lectureTitle){
            throw new Error("Lecture title is required");
        }

        //create lecture
        const lecture = await lectureModel.create({
            lectureTitle,
        })

        const course = await Course.findById(courseId);
        if(!course){
            throw new Error("Course not found");
        }
        course.lectures.push(lecture._id);
        await course.save();

        return res.status(200).json({lecture, message: "Lecture created successfully" });
    } catch (error) {
        next(error);
    }
};

export const getAllLectures = async (req, res, next) => {
    try {
        const lectures = await lectureModel.find();
        return res.status(200).json({lectures});
    } catch (error) {
        next(error);
    }
}

export const getSingleLecture = async (req,res,next) => {
    try {
        const lectureId = req.params.lectureId;
        if(!lectureId){
            throw new Error("Lecture id is required");
        }
        const lecture = await lectureModel.findById(lectureId);
        return res.status(200).json({lecture});
    } catch (error) {
        next(error)
    }
}