import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, RequiredParams, ConvertToLowercase, Delete } from "../helpers/decorators";
import { tvModel as television, tvModel } from "../models/tvModel";

@Controller("/tv")


export class TvController {
    
    @Get()
    private _testCall(req: Request, resp: Response, next: NextFunction){
        television.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/get")
    private _lookCall(req: Request, resp: Response, next: NextFunction){
        tvModel.aggregate([
                {
            $lookup:
              {
                from: "User",
                localField: "description",
                foreignField: "name",
                as: "name_docs" 
              }
         },            {$group:{_id:{brand:"$age",features:"$features",price:"$price",name:"$name"}}}

        ],(err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/all")
    private _completeListCall(req: Request, resp: Response, next: NextFunction){
        television.find((err: any, res: any[]) => {
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
        television.find({"createdAt":{ $gte : "2020-03-23 00:00:00",$lt : "2020-05-30 00:00:00"}},(err: any, res: any[]) => {
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
        television.find({"createdAt":{ $gte : "2020-03-23 00:00:00",$lt : "2020-05-30 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/month/:id")
    private _monthlyCall(req: Request, resp: Response, next: NextFunction){
        television.find({"createdAt":{ $gte : "2020-03-00 00:00:00",$lt : "2020-05-01 00:00:00"}},(err: any, res: any[]) => {
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
        let newTv = new tvModel(obj);
        newTv.save((err: any, user: any) => {
            if(!err){
                resp.json({status: true})
            }else{

                resp.json({ status: false, message: err.message});
            }
        })
    }
    //Deleting an element with specific ID
    @Delete("/remove/:id")
    private _delCall(req: any, resp: Response, next: NextFunction){
        television.findByIdAndRemove({_id:req.params.id},(err: any, res: any) => {
            if(!err){
                resp.json(res);
                console.log(res.name+" got deleted ")
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
   
}