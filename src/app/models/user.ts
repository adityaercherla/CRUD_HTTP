import { Schema, Model, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    active: { type: Boolean, default: true }
}, {timestamps: true});

export const UserModel: Model<any> = model("User", userSchema);