import { Schema, Model, model } from "mongoose";
 const UserSchema = new Schema({
    name: { 
        first:{type:String,required:true},
        last: {type:String},
     },
    gender: { type: String, required: true },
    address:{
        home:{type:String,required:true},
        work:{type:String}
    },
    phoneNumber:{
        personal:{type:Number,required:true},
        office:{type:Number}
    },
    office:{
        name:{type:String,required:true},
        country:{type:String,required:true},
        state:{type:String},
        address:{type:String}
    },
    age:{type:Number,required:true},
    email: { 
        officeMail:{type:String,required:true},
        personalMail:{type:String,required:true},
    },
    active: { type: Boolean, default: true },
    fav: { 
        food:{type:String},
        color:{type:String},
        music:{type:String},
     },
     hobby:{type:String,required:true}

}, {timestamps: true});
export const UserModel: Model<any> = model("User", UserSchema);


// const UserSchema = new Schema({
//     name: { type: String },
// 	profilePic: { type: String },
// 	roomId : {type: String , required: true ,unique:true},
// 	bRoomId : {type : String , required: true, unique: true},
// 	email: {type: String ,required: true},
// 	superAdmin: {type : Boolean , default: false},
//     active: { type: Boolean, default: true },
// }, {timestamps: true});


// const userSchema = new Schema({
//     FirstName: { type: String, required: true},
//     LastName: { type: String, required: true },
//     office:{type:String,required:true},
//     age:{type:Number,required:true},
//     email: { type: String, required: true },
//     active: { type: Boolean, default: true }
// }, {timestamps: true});

