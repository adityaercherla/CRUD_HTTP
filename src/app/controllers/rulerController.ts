import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, RequiredParams, ConvertToLowercase } from "../helpers/decorators";
import { RulerModel } from "../models/rulerModel";
@Controller("/ruler")


export class RulerController{
    
    @Get()
    private _testCall(req: Request, resp: Response, next: NextFunction){
        RulerModel.find((err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Get("/week/:id")
    private _singleCall(req: Request, resp: Response, next: NextFunction){
        RulerModel.find({"createdAt":{ $gte : "2020-04-23 00:00:00",$lt : "2020-04-30 00:00:00"}},(err: any, res: any[]) => {
            if(!err){
                resp.json(res);
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    // let { name, price,brand} = req.body;
    //     let newItem = new ItemModel({name, price,brand});

    @Post("/addruler")
    @RequiredParams(["name", "location","country","age"])
    @ConvertToLowercase(["country","location"])
    private _postCall(req: any, resp: Response, next: NextFunction){
        let { name, location,country,age} = req.body;
        let newRuler = new RulerModel({ name, location,country,age});
        newRuler.save((err: any, ruler: any) => {
            if(!err){
                resp.json({status: true})
            }else{
                resp.json({ status: false, message: err.message});
            }
        })
    }
    @Post("/newleader")
    @RequiredParams(["name", "location","country","age"])
    @ConvertToLowercase(["country","location"])
    private _PostCall(req: any, resp: Response, next: NextFunction){
        let { name, location,country,age,qualification,timestamp} = req.body;
        let newRuler = new RulerModel({ name, location,country,age,qualification,timestamp});
        newRuler.save((err: any, ruler: any) => {
            if(!err){ 
                resp.json({status: true})
                console.log(ruler.name+" is added to database")
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
