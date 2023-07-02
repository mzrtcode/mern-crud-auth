import mongoose from "mongoose";

// Esto es lo que se va a guardar en la base de datos
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
},{
    timestamps: true,
});

// Esto es para interactuar con la base de datos con los metodos .add() find() etc
export default mongoose.model('User', userSchema); //User sera el nombre de la collecion que volvera plural users