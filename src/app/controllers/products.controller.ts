import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, RequiredParams, ConvertToLowercase } from "../helpers/decorators";
import { UserModel } from "../models/user";

@Controller("/users")


export class UsersController{
    
    @Get()
    private _testCall(req: Request, resp: Response, next: NextFunction){
        UserModel.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }

    @Post()
    @RequiredParams(["name", "email"])
    @ConvertToLowercase(["email"])
    private _postCall(req: any, resp: Response, next: NextFunction){
        let { name, email} = req.body;
        let newUser = new UserModel({name, email});
        newUser.save((err: any, user: any) => {
            if(!err){
                resp.json({status: true})
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
}

// @Controller("/products")

// export class itemController{
    
//     @Get()
//     private _testCall(req: Request, resp: Response, next: NextFunction){
//         ItemModel.find((err: any, res: any[]) => {
//             if(!err){
//                 resp.json(res);

//             }else{
//                 resp.json({ status: false, message: err.message});
//             }
//         })
//     }
//     @Post()
//     @RequiredParams(["name", "price"])
//     private _postCall(req: any, resp: Response, next: NextFunction){
//         let { name, brand,price} = req.body;
//         let newItem = new ItemModel({name, brand,price});
//         ItemModel.save((err: any, user: any) => {
//             if(!err){
//                 resp.json({status: true})
//             }else{
//                 resp.json({ status: false, message: err.message});
//             }
//         })
//     }
// }
