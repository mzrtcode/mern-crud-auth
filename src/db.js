import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://adminpro:ice6EFjjTJRBFaXX@cluster0.nqrxxvo.mongodb.net/?retryWrites=true&w=majority');
        console.log(':: CONECTADO A LA DB ::')
    }catch(error){
        console.log(error);
    }
};

