import mongoose from "mongoose";
const carSchema = mongoose.Schema({
    tittle : {
        type : String,
        required : true,
    },
    desc: {
        type : String,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true,
    },
    images: [
        {
            type: String, 
        }
    ],
})
const carModel = mongoose.model('Car',carSchema);
export default carModel;