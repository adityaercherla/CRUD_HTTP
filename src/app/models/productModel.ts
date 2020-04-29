import { Schema, Model, model } from "mongoose";

const ItemSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String},
    price: { type: Number, required: true },
    description: { type: String },
    active: { type: Boolean, default: true }
}, {timestamps: true});

export const ItemModel: Model<any> = model("Item", ItemSchema);//  import { Schema, Model, model } from "mongoose";


//  export const ProductSchema:Model<any> = new Schema({
//     Name: {
//         type: String,
//         required: 'Enter a first name'
//     },
//     model: {
//         type: String            
//     },
//     brand: {
//         type: String            
//     },
//     price: {
//         type: Number            
//     }
// });
// //export const ProductSchema:Model<any> = model("Products",ProductSchema)
// // import { Schema, Model, model } from "mongoose";

// // const userSchema = new Schema({
// //     name: { type: String, required: true },
// //     email: { type: String, required: true },
// //     active: { type: Boolean, default: true }
// // }, {timestamps: true});

// // export const UserModel: Model<any> = model("User", userSchema);