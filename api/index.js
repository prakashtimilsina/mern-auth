import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{console.log('MongoDB is connected Successfully.')})
        .catch((err)=>{console.error('MongoDB Connection is failed.', err.message)});

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})


//API ROUTES
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

//Middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})