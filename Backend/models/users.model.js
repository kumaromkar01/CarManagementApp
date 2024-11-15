import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cars: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Car" 
        }
    ]
});
const UserModel = mongoose.model("User", userSchema);
export default UserModel;