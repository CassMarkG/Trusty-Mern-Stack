import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
// import userRoute from './routes/userRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use('/api/users',userRoute);


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB Connected'))
.catch((error) => console.log(error.message));

app.listen(port,() => console.log(`Server running on port: ${port}`))

