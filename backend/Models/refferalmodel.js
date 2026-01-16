import mongoose from "mongoose";

const refferalSchema = new mongoose.Schema({
    customerId:{
        type: String,
    },
    name: {
        type: String,
    
    },
    phonenumber: {
        type: String,
    
    },
    refferalCode:{
        type: String,

        unique: true,
    },
}, { timestamps: true });

export const Refferral = mongoose.model("Refferral", refferalSchema);