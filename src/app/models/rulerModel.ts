import { Schema, Model, model } from "mongoose";

const RulerSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String,required:true},
    country: { type: String, required: true },
    age: { type: Number,required:true },
    qualification: { type: String },
    //time : { type: Number, default: (new Date()).getTime() } 

});

export const RulerModel: Model<any> = model("Ruler", RulerSchema);
