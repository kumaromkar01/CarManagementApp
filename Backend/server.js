import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDB } from './DB/connectToDB.js';
import userroutes from './routes/users.route.js';
import carroutes from './routes/car.routes.js';
dotenv.config();
const app = express();
app.use(cors({
    origin: ['http://localhost:5173','https://username.github.io'] ,// Replace with your frontend URL
    credentials: true,               // Enable credentials (cookies)
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userroutes);
app.use('/cars', carroutes);
app.get('/', (req, res) => {
    res.send("started");
});
app.listen(process.env.PORT, () => {
    connectToDB();
    console.log('Server listening at ', process.env.PORT);
});