import { Schema, Model, model } from "mongoose";

const egSchema = new Schema({
    name: { 
        first:{type:String,required:true},
        last:{type:String,required:true}
     },
     education: { 
        school:{type:[String],required:true},
        highSchool:{type:String,required:true},
        university:{
            department:{type:String},
            year:{type:String},
            rollNo:{type:String,unique:true}
        },
    },
    address: { 
        mandal:{type:String,required:true},
        village:{type:String,required:true},
        district:{type:String,required:true}
    },
    office: { 
        country:{type:String},
        state:{type:String},
        name:{type:String}
    },
    contact:{type:[Number],required:true},
    age: { type: Number, required: true },
    fav:{
        food:{type:String},
        place:{type:String},
        color:{tye:String}
    },
    hobby:{type:[String]   }
    
}, {timestamps: true});

export const egModel: Model<any> = model("Example", egSchema);