import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, RequiredParams, ConvertToLowercase, Delete } from "../helpers/decorators";
import { itModel as internet, itModel } from "../models/intermet";

@Controller("/it")


export class ITController {
    
    @Get()
    private _testCall(req: Request, resp: Response, next: NextFunction){
        internet.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/get")
    private _lookCall(req: Request, resp: Response, next: NextFunction){
        internet.aggregate([
            
                //{$group:{_id:"$eyeColor"}},
                //{$unwind:"$hobby"},
               {$count:"name"},
                        
            // {$group:{_id:{age:"$age",name:"$name"}}},    
        ],(err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
      
        })
    }
    // @Get("/get")
    // private _lookCall(req: Request, resp: Response, next: NextFunction){
    //     internet.aggregate([
    //         {
    //             $facet: {
    //               "categorizedByTags": [
    //                 { $unwind: "$tags" },
    //                 { $sortByCount: "$tags" }
    //               ],
    //               "categorizedBynames": [
    //                 //  { $match:{age:{$gte:20}}  },
    //                  {$group:{_id:"$gender",total:{$max:"$age"}}}

                    
    //               ],
    //             }
    //         }            
    //         // {$group:{_id:{age:"$age",name:"$name"}}},    
    //     ],(err: any, res: any[]) => {
    //         if(!err){
    //             resp.json(res);

    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
      
    //     })
    // }
    //Project with group
    // @Get("/get")
    // private _lookCall(req: Request, resp: Response, next: NextFunction){
    //     internet.aggregate([
    //         {
    //             $facet: {
    //               "categorizedByTags": [
    //                 { $unwind: "$tags" },
    //                 { $sortByCount: "$tags" }
    //               ],
    //               "categorizedBynames": [
    //                 // { $match:{age:{$gte:20}}  },
    //                  {$group:{_id:{age:"$age",name:"$name"}}},
    //                  {$project:{name:1,tags:1,gender:1}},


                    
    //               ],
    //             }
    //         }            
    //         // {$group:{_id:{age:"$age",name:"$name"}}},    
    //     ],(err: any, res: any[]) => {
    //         if(!err){
    //             resp.json(res);

    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
      
    //     })
    // }
    //Project with unwind example
    // @Get("/get")
    // private _lookCall(req: Request, resp: Response, next: NextFunction){
    //     internet.aggregate([
        //           {$match:{gender:"female"}},
    //             {$project:{name:1,age:1,tags:1,gender:1}},
    //             {$unwind:"$tags"}
    //         // {$group:{_id:{age:"$age",name:"$name"}}},
            
    
            
    //     ],(err: any, res: any[]) => {
    //         if(!err){
    //             resp.json(res);

    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
      
    //     })
    // }
    //Project example
    // @Get("/get")
    // private _lookCall(req: Request, resp: Response, next: NextFunction){
    //     internet.aggregate([
    //           {$match:{gender:"male"}},
    //             {$project:{name:1,age:1,}}
    //         // {$group:{_id:{age:"$age",name:"$name"}}},
            
    
            
    //     ],(err: any, res: any[]) => {
    //         if(!err){
    //             resp.json(res);

    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
      
    //     })
    // }
    //lookup example
    // @Get("/get")
    // private _lookCall(req: Request, resp: Response, next: NextFunction){
    //     internet.aggregate([
    //           {$match:{gender:"male"}},

    //         // {$group:{_id:{age:"$age",name:"$name"}}},
    //           {
                    
    //         $lookup:
    //           {
    //             from: "person",
    //             localField: "name",
    //             foreignField: "name   ",
    //             as: "name_docs" 
    //           }
    //         }   ,
    //         {$group:{_id:{age:"$age",name:"$name",work:"$company.location.country"}}}         
            
    //     ],(err: any, res: any[]) => {
    //         if(!err){
    //             resp.json(res);

    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
      
    //     })
    // }
    //Unwind Example
    // private _lookCall(req: Request, resp: Response, next: NextFunction){
    //     internet.aggregate([
    //           {$match:{gender:"male"}},
    //           { $unwind : "$tags" },

    //         // {$group:{_id:{age:"$age",name:"$name"}}},
    //           {
                    
    //         $lookup:
    //           {
    //             from: "person",
    //             localField: "name",
    //             foreignField: "name   ",
    //             as: "name_docs" 
    //           }
    //         }   ,
    //         {$group:{_id:{age:"$age",name:"$name",work:"$company.location.country"}}}         
            
    //     ],(err: any, res: any[]) => {
    //         if(!err){
    //             resp.json(res);

    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
      
    //     })
    // }
    @Get("/all")
    private _completeListCall(req: Request, resp: Response, next: NextFunction){
        internet.find((err: any, res: any[]) => {
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
        internet.find({"createdAt":{ $gte : "2020-03-23 00:00:00",$lt : "2020-05-30 00:00:00"}},(err: any, res: any[]) => {
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
        internet.find({"createdAt":{ $gte : "2020-03-23 00:00:00",$lt : "2020-05-30 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/month/:id")
    private _monthlyCall(req: Request, resp: Response, next: NextFunction){
        internet.find({"createdAt":{ $gte : "2020-03-00 00:00:00",$lt : "2020-05-01 00:00:00"}},(err: any, res: any[]) => {
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
        for(let i=0;i<=obj.length;i++)
        {
             let newTv = new itModel(obj[i]);
            newTv.save((err: any, user: any) => {
                if(!err){
                    resp.json({status: true})
                }else{
    
                    resp.json({ status: false, message: err.message});
                }
            })
        }
        
    }
    //Deleting an element with specific ID
    @Delete("/remove/:id")
    private _delCall(req: any, resp: Response, next: NextFunction){
        internet.findByIdAndRemove({_id:req.params.id},(err: any, res: any) => {
            if(!err){
                resp.json(res);
                console.log(res.name+" got deleted ")
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
   
}