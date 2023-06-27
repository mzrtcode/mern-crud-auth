import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost/merndb');
        console.log(':: CONECTADO A LA DB ::')
    }catch(error){
        console.log(error);
    }
};