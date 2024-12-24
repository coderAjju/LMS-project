import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import Lecture from '../models/lecture.model.js';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';
import upload from '../config/multer.js';

const router = express.Router();

router.post("/upload-video",protectedRoute,upload.single("video"),async(req,res,next)=>{
    try {
        const video = req.file;
        if (!video) {
            return res.status(400).json({ message: "No video uploaded" });
          }
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                console.log("Upload failed error: ", error);
                return res.status(500).json({ error: "Upload failed" }); // Respond here for error
              }
          
              console.log(result);

              // Respond here with success and result
              return res.status(200).json({
                message: "Video uploaded successfully",
                success: true,
                data: result,
              });
            }
          );
          
          // Convert the buffer to a readable stream and pipe it to the upload stream
          const bufferStream = Readable.from(video.buffer);
          bufferStream.pipe(uploadStream);
          
    } catch (error) {
        next(error)
    }
})

export default router;