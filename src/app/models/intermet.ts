import { Schema, Model, model } from "mongoose";

const itSchema = new Schema({
    
        index: Number,
        name: String,
        isActive: Boolean,
        age: Number,
        gender: String,
        eyeColor: String,
        favoriteFruit: String,
        company: {
          title: String,
          email: String,
          phoneNo: Number,
          location: {
            country: String,
            address:String,
          }
        },
        tags: [
          String
        ]
    }
     ,{timestamps: true});

export const itModel: Model<any> = model("internet", itSchema);