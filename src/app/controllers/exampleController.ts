import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, RequiredParams, ConvertToLowercase, Delete } from "../helpers/decorators";
import { egModel as example, egModel } from "../models/example";

@Controller("/example")


export class egController {
    
    @Get()
    private _testCall(req: Request, resp: Response, next: NextFunction){
        example.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/all")
    private _completeListCall(req: Request, resp: Response, next: NextFunction){
        example.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    //Count specific
    
    @Get("/day/:id")
    private _dailyCall(req: Request, resp: Response, next: NextFunction){
        example.find({"createdAt":{ $gte : "2020-03-23 00:00:00",$lt : "2020-05-30 00:00:00"}},(err: any, res: any[]) => {
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
        example.find({"createdAt":{ $gte : "2020-05-08 00:00:00",$lt : "2020-05-30 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/am")
    private _countCall(req: Request, resp: Response, next: NextFunction){
        example.aggregate([{ $match:{age:{$gte:20,$lt:25}}},
        {$group:{_id:{email:"$email",name:"$name",age:"$age",office:"$office.name"},total:{$sum:1}}
        }],(err: any, res: any[]) => {
            if(!err){
                resp.json(res);


            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/month/:id")
    private _monthlyCall(req: Request, resp: Response, next: NextFunction){
        example.find({"createdAt":{ $gte : "2020-03-00 00:00:00",$lt : "2020-05-01 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Post("/add")
    private _postCall(req: any, resp: Response, next: NextFunction){
        let obj = req.body;
        let newTv = new egModel(obj);
        newTv.save((err: any, user: any) => {
            if(!err){
                resp.json({status: true})
            }else{

                resp.json({ status: false, message: err.message});
            }
        })
    }
    // @Get("/get")
    // private _lookCall(req: Request, resp: Response, next: NextFunction){
    //     example.aggregate([
            
    //         //  {$group:{_id:{age:"$age",name:"$name.first",fav:"$fav.food",office:"$office"}}},
             
    //         {
    //             $lookup:
    //               {
    //                 from: "User",
    //                 localField: "office.first",
    //                 foreignField: "office",
    //                 as: "name_docs"
    //               }
    //          },
    //          {$group:{_id:{name:"$name.first",fav:"$fav.food",office:"$office.name"},total:{$sum:"$age"}}},
    //          {$sort:{total:1}},
    //      {$count:"all"}
     
    //     ],(err: any, res: any[]) => {
    //         if(!err){
    //             resp.json(res);

    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
    //     })
    // }
    // @Get("/get")
    // private _lookCall(req: Request, resp: Response, next: NextFunction){
    //     example.aggregate([
            
    //         //  {$group:{_id:{age:"$age",name:"$name.first",fav:"$fav.food",office:"$office"}}},
             
            
    //          {$group:{_id:{name:"$name.first",fav:"$fav.food",office:"$office.name"},total:{$sum:"$age"}}},
    //          {$match:{age:22}},
    //          {$sort:{total:1}},
    //      {$count:"all"}
     
    //     ],(err: any, res: any[]) => {
    //         if(!err){
    //             resp.json(res);

    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
    //     })
    // }
    @Get("/get")
    private _lookCall(req: Request, resp: Response, next: NextFunction){
        example.aggregate([
            
            //  {$group:{_id:{age:"$age",name:"$name.first",fav:"$fav.food",office:"$office"}}},
             
              //{$match:{address:"$R.C.Puram"}},
            
              {$group:{_id:{name:"$name.first",fav:"$fav",address:"$address.mandal",age:"$age"}}},
              //{$unwind:"$hobby"},
             {$count:"name"},
             
     
        ],(err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    //Deleting an element with specific ID
    @Delete("/remove/:id")
    private _delCall(req: any, resp: Response, next: NextFunction){
        example.findByIdAndRemove({_id:req.params.id},(err: any, res: any) => {
            if(!err){
                resp.json(res);
                console.log(res.name+" got deleted ")
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
   
}