import jwt from 'jsonwebtoken';
import carModel from "../models/cars.model.js";
import UserModel from "../models/users.model.js";
export const list = async(req,res)=>{
    let token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET); 
            let { id } = decoded; 
            let user = await UserModel.findOne({ _id: id }).populate('cars');
            if (user) {
                res.status(200).send(user.cars); // Send the populated cars array
            } else {
                res.status(404).send('User not found');
            };
        } catch (error) {
            console.log('error in read car controller',error.message);
            res.status(500).send('internal server error');
        }
    } else {
        res.status(400).send('No token found');
    }
}
export const view = async(req,res)=>{
    const { id } = req.params; // Get the car ID from the URL
    try {
        const car = await carModel.findById(id);
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).send('Car not found');
        }
    } catch (error) {
        console.log('Error in view car controller:', error.message);
        res.status(500).send('Internal server error');
    }
}
export const create = async(req,res)=>{
    let token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET); 
            let { id } = decoded; 
            console.log('User ID:', id);
            let {tittle,desc,images}=req.body
            let newCar =await carModel.create({
                tittle,
                desc,
                owner:id,
                images
            })
            let user =await UserModel.findOne({_id:id});
            user.cars.push(newCar);
            await user.save();
            res.status(200).send(newCar);
        } catch (error) {
            console.log('error in create car controller',error.message);
            res.status(500).send('internal server error');
        }
    } else {
        res.status(400).send('No token found');
    }
    
}
export const update = async (req, res) => {
    const { tittle, desc, image } = req.body; // Destructure fields from request body
    const { id } = req.params; // Get the car ID from the URL
    try {
        const updatedCar = await carModel.findOneAndUpdate(
            { _id: id },
            { tittle, desc, image },
            { new: true } 
        );
        if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(updatedCar);
    } catch (error) {
        console.error('Error in update car controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const delet = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await carModel.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        const ownerId = car.owner; 
        await carModel.findByIdAndDelete(id);
        await UserModel.findByIdAndUpdate(ownerId, {
            $pull: { cars: id }
        });
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error in delete car controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};