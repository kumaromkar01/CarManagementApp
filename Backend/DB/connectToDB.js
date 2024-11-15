import mongoose from "mongoose";
export const connectToDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error in connecting to DB:", error.message);
        res.status(500).send('Internal Server Error');
    }
};