import App from './app';
import { UsersController} from "./controllers/userController";
import { RulerController} from "./controllers/rulerController";
import {ItemsController } from "./controllers/itemControler";
import {TvController } from "./controllers/tvController";
import { config } from "dotenv";
import {egController } from "./controllers/exampleController";
import { ITController } from './controllers/internetController';


//For dotenv.
config();

const app = new App(
    //controllers of array
    [
        new UsersController(),
        new ItemsController(),
        new RulerController(),
        new TvController(),
        new egController(),
        new ITController
    ],
    Number(process.env.SERVERPORT || 9000)
).listen();