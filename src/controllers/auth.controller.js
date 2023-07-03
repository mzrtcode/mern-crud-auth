import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
     const {email, password, username} = req.body;
    try {
        const paswordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            username,
            password: paswordHash})
        const savedUser = await newUser.save();
        const token = await createAccessToken({id: savedUser._id});
        res.cookie('token', token);
        
        res.send({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        })

    } catch (error) {
        res.status(500).json({message: error.message});
    }


     
   
}

export const login = (req, res) => {
    console.log(req.body)
    res.send('Login...')
}