import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
export const register = async (req, res) => {
     const {email, password, username} = req.body;
    try {

        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json( ['The email is already in use']);

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

export const login = async (req, res) => {
    const {email, password} = req.body;
   try {
    const userFound = await User.findOne({email});
    if(!userFound) return res.status(400).json({message: 'User not found'});

       const isMatch = await bcrypt.compare(password,userFound.password);

       if(!isMatch) return res.status(400).json({message: 'Incorrect password'});
       const token = await createAccessToken({id: userFound._id});
       res.cookie('token', token, {
        SameSite: 'none',
        secure: true,
       });
       
       res.send({
           id: userFound._id,
           username: userFound.username,
           email: userFound.email
       })

   } catch (error) {
       res.status(500).json({message: error.message});
   }   
  
}

export const logout  = async (req, res) => {
    res.cookie('token', '', {expires: new Date(0)});
    res.sendStatus(200);
}

export const profile = async (req, res ) => {
    const {id}  = req.user;
    const userFound = await User.findById(id);

    if(!userFound) return res.status(400).json({message: 'User not found'});
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })

}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: 'No token'});
    jwt.verify(token, TOKEN_SECRET, async(err, decoded) => {
        if(err) return res.status(401).json({message: 'Invalid token'});
        const userFound = await User.findById(decoded.id);
        if(!userFound) return res.status(400).json({message: 'User not found'});
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}