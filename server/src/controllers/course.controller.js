import { Course } from "../models/course.model.js";

export const createCourse = async (req,res,next)=>{
    try {
        const {title:courseTitle,category} = req.body;
        
        if(!courseTitle || !category){
            return res.status(400).json({message:"Course title and Category are required"})
        }
        const course = await Course({
            courseTitle,
            category,
            creator:req.id
        })
        const result = await course.save()
        return res.status(200).json({
            message:"Course created successfully",
            success:true
        })
    } catch (error) {
        next(error)
    }
}

export const getCreatorCourses = async (req,res,next) => {
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId})
        if(!courses){
            return res.status(404).json({message:"No course found"})
        }
        return res.status(200).json({courses})
    } catch (error) {
        next(error)
    }
}