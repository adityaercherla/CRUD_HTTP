import { Schema, Model, model } from "mongoose";

const tvSchema = new Schema({
    features: { 
        description:{
        length:{type:Number},
        breadth:{type:Number}
    } },
    brand: { type: String,required:true},
    price: { type: Number, required: true },
}, {timestamps: true});

export const tvModel: Model<any> = model("TeleVision", tvSchema);