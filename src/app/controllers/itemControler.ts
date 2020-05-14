import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, RequiredParams, Delete } from "../helpers/decorators";
import { ItemModel as prod } from "../models/productModel";
// import { Types } from "mongoose"


@Controller("/items")


export class ItemsController{
    
    @Get()
    public _getestCall(req: Request, resp: Response, next: NextFunction){
        prod.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);
                

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/am")
    private _countCall(req: Request, resp: Response, next: NextFunction){
        prod.aggregate([{$group:{_id:"$_id",total:{$sum:"$price"}}},{$sort:{total:-1}}],(err: any, res: any[]) => {
            if(!err){
                resp.json(res);

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/list")
    private _bustCall(req: Request, resp: Response, next: NextFunction){
        prod.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/week/:id")
    private _singleCall(req: Request, resp: Response, next: NextFunction){
        prod.find({"createdAt":{ $gte : "2020-04-23 00:00:00",$lt : "2020-04-30 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }

    @Post("/additem")
    @RequiredParams(["name", "price"])
    private _pstCall(req: any, resp: Response, next: NextFunction){
        let { name, price,brand} = req.body;
        let newItem = new prod({name, price,brand});
        if(newItem.name == req.body.name)
        newItem.save((err: any, res: any) => {
            if(!err){
                let abcd=resp.json(res);
                console.log(abcd)
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Post("/addproduct")
    @RequiredParams(["name", "price"])
    private _PostCall(req: any, resp: Response, next: NextFunction){
        let { name, price,brand} = req.body;
        let newItem = new prod({name, price,brand});
        newItem.save((err: any, res: any) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    // @Put("/list/:id")
    // @RequiredParams(["name", "price"])
    // private _putCall(req: any, resp: Response, next: NextFunction){
    //     ItemModel.findByIdAndUpdate({_id:req.params.id},(err: any, res: any) => {
    //         if(!err){
    //             resp.json(res);
    //             console.log(name+" Got Updated as : "+resp.json(res))
    //         }else{
    //             resp.json({ status: false, message: err.message});
    //         }
    //     })
    // }

    @Delete("/:id")
    private _delCall(req: any, resp: Response, next: NextFunction){
        prod.findByIdAndRemove({_id:req.params.id},(err: any, res: any) => {
            if(!err){
                resp.json(res);
                console.log(res.name+" got deleted ")
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    
    @Delete("/list/:id")
    private _delall(req: any, resp: Response, next: NextFunction){
        prod.findOneAndDelete({_id:req.params.id,name:req.params.name},(err: any, res: any) => {
            if(!err){
                resp.json(res);
                console.log(res.name+" got deleted ")
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
}
