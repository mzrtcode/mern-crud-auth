import User from '../models/user.model.js';

export const register = async (req, res) => {
     const {email, password, username} = req.body;
    try {
        const newUser = new User({email, password, username})
        const savedUser = await newUser.save();
        res.send(savedUser)
    } catch (error) {
        console.log(error)
    }


     
   
}

export const login = (req, res) => {
    console.log(req.body)
    res.send('Login...')
}