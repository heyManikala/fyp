import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../backend/routes/auth.routes.js';
import blogRoutes from '../backend/routes/blog.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO)
    .then(() => console.log("Database connected to mongodb"))
    .catch(err => console.log(err));

// Use routes:
app.use("/api/auth", authRoutes);
app.use('/api/blogs', blogRoutes);

//start server
app.listen(3000, () => {
    console.log("backend is running on port 3000!!");
});


