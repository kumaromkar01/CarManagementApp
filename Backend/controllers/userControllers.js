import UserModel from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
export const signup = async(req,res)=>{
    let {fullname, username, password} = req.body;
    try {
        const check = await UserModel.findOne({username})
        if(check) return res.status(400).send('username already exists try another one');
        const hashedPassword = await bcrypt.hash(password, 10);
        let createdUser = await UserModel.create({
            fullname,
            username,
            password : hashedPassword,
        })
        const token = jwt.sign({id:createdUser._id,username}, process.env.SECRET, { expiresIn: '1d' });
        res.cookie('token', token,{
            expires: new Date(Date.now() + 86400000),
        });
        res.status(200).send({createdUser});
        // res.redirect('/car/list')
    } catch (error) {
        res.status(500).send("internal server error");
        console.log('error in signup controller',error.message);
    }
}
export const login = async(req,res)=>{
    let {username,password} = req.body;
    try {
        const user = await UserModel.findOne({username});
        if(user==null) res.status(400).send('invalid username');
        const match = await bcrypt.compare(password, user.password);
        if(match){
            const token = jwt.sign({id:user._id,username}, process.env.SECRET, { expiresIn: '1d' });
            res.cookie('token', token,{
                expires: new Date(Date.now() + 86400000),
            });
            res.status(200).json({ message: 'Logged in successfully' });
            // res.redirect('/car/list');
        }else{
            res.status(400).send('incorrect password');
        }
    } catch (error) {
        res.status(500).send('Internal server error');
        console.log('error in login controller');
    }
}
export const logout = (req, res) => {
    res.clearCookie('token'); 
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
};