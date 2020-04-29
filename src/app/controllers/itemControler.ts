import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, RequiredParams, Delete } from "../helpers/decorators";
import { ItemModel } from "../models/productModel";
// import { Types } from "mongoose"


@Controller("/items")


export class ItemsController{
    
    @Get()
    private _testCall(req: Request, resp: Response, next: NextFunction){
        ItemModel.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);
                

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/list")
    private _bustCall(req: Request, resp: Response, next: NextFunction){
        ItemModel.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);
                

            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/list/:id")
    private _singleCall(req: Request, resp: Response, next: NextFunction){
        ItemModel.findOne({_id:req.params.id},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }

    @Post("/additem")
    @RequiredParams(["name", "price"])
    private _postCall(req: any, resp: Response, next: NextFunction){
        let { name, price,brand} = req.body;
        let newItem = new ItemModel({name, price,brand});
        if(newItem.name == req.body.name)
        newItem.save((err: any, res: any) => {
            if(!err){
                resp.json(res);
                console.log(res.name+" got added succesfully")
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Post("/addproduct")
    @RequiredParams(["name", "price"])
    private _PostCall(req: any, resp: Response, next: NextFunction){
        let { name, price,brand} = req.body;
        let newItem = new ItemModel({name, price,brand});
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
        ItemModel.findByIdAndRemove({_id:req.params.id},(err: any, res: any) => {
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
        ItemModel.findOneAndDelete({_id:req.params.id,name:req.params.name},(err: any, res: any) => {
            if(!err){
                resp.json(res);
                console.log(res.name+" got deleted ")
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
}
