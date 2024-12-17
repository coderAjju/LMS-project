import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.get("/", (req, res) => {    
    res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

// handle incoming error from controller 
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({message:"Internal server error"});
});

app.listen(3000, () => {
    connectDB();
    console.log("Example app listening on port 3000!");
});