import { Schema, Model, model } from "mongoose";

const RulerSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String,required:true},
    country: { type: String, required: true },
    age: { type: Number,required:true },
    qualification: { type: String }
}, {timestamps: true});

export const RulerModel: Model<any> = model("Ruler", RulerSchema);