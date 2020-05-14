import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, RequiredParams, ConvertToLowercase, Delete } from "../helpers/decorators";
import { UserModel } from "../models/user";

@Controller("/users")


export class UsersController {
    
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
    @Get("/all")
    private _completeListCall(req: Request, resp: Response, next: NextFunction){
        UserModel.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/am")
    private _countCall(req: Request, resp: Response, next: NextFunction){
        UserModel.aggregate([{ $match:{$and:[{ office: "Telebu" },{age:{$gte:20,$lt:30}}]  }},
        {$group:{_id:"$email",total:{$sum:1}}
        }],(err: any, res: any[]) => {
            if(!err){
                resp.json(res);


            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/pm")
    private _workCall(req: Request, resp: Response, next: NextFunction){
        UserModel.aggregate([{ $match:{ gender: "Male"}},
        {$group:{_id:{email:"$email",name:"$name",age:"$age"},total:{$sum:1}}
        }],(err: any, res: any[]) => {
           // [ { $match: { status: "A" } }, { $group: { _id: "$category", count: { $sum: 1 } } } ],

            //[ { $sort: { qty: 1 }}, { $match: { category: "cake", qty: 10  } }, { $sort: { type: -1 } } ],
            // [ { $match: { status: "A" } }, { $group: { _id: "$category", count: { $sum: 1 } } } ],
            // { collation: { locale: "fr", strength: 1 } }
         
            if(!err){
                resp.json(res);


            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    //daily retrieval
    @Get("/day/:id")
    private _dailyCall(req: Request, resp: Response, next: NextFunction){
        UserModel.find({"createdAt":{ $gte : "2020-03-23 00:00:00",$lt : "2020-05-30 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    //Weekly Data retrieval
    @Get("/week/:id")
    private _weeklyCall(req: Request, resp: Response, next: NextFunction){
        UserModel.find({"createdAt":{ $gte : "2020-03-23 00:00:00",$lt : "2020-05-30 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/month/:id")
    private _monthlyCall(req: Request, resp: Response, next: NextFunction){
        UserModel.find({"createdAt":{ $gte : "2020-03-00 00:00:00",$lt : "2020-05-01 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Post("/adduser")
    @RequiredParams(["name", "email","gender"])
    @ConvertToLowercase(["email","address","gender"])
    private _postCall(req: any, resp: Response, next: NextFunction){
        let obj= req.body;
        console.log(obj)
        let newUser = new UserModel( obj);
        newUser.save((err: any, user: any) => {
            if(!err){
               console.log(resp)
               // resp.json({status: true})
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    //Deleting an element with specific ID
    @Delete("/remove/:id")
    private _delCall(req: any, resp: Response, next: NextFunction){
        UserModel.findByIdAndRemove({_id:req.params.id},(err: any, res: any) => {
            if(!err){
                resp.json(res);
                console.log(res.name+" got deleted ")
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
