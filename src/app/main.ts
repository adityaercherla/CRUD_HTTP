import App from './app';
import { UsersController} from "./controllers";
import { RulerController} from "./controllers/rulerController";
import {ItemsController } from "./controllers/itemControler"
import { config } from "dotenv";

//For dotenv.
config();

const app = new App(
    //controllers of array
    [
        new UsersController(),
        new ItemsController(),
        new RulerController()
    ],
    Number(process.env.SERVERPORT || 9000)
).listen();