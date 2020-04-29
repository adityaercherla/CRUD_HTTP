import express, { Application } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import { Server, createServer } from "http";
import { connect, connection } from "mongoose";
import { attachRoutes } from './helpers/decorators';

class App {
	public app: Application;
	public server: Server;
	public port: number;
	public socketIo : any;

	constructor(controllers: any[], port: number) {
		this.app = express();
		this.server = createServer(this.app);
		this.port = port;
		this._initializeMiddlewares();
		this._connectToDatabase();
		this._initializeControllers(controllers);
	}

	private _initializeMiddlewares() {
		this.app.use(cors());
		this.app.use(bodyparser.json());
	}

	
	private _initializeControllers(controllers: any[]) {
		attachRoutes(this.app, controllers);
		// controllers.forEach((controller: any) => {
		// 	console.log("nnnn", controller['_path']);
		// 	this.app.use(controller._path, controller['router']());
		// });
	}

	private _connectToDatabase() {
		const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } = process.env;
		const mongoDBUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DB}`;

		connect(mongoDBUrl, { useNewUrlParser: true, useFindAndModify: false });

		connection.once("open", () => {
			console.info("Connected to mongo");
		});

		connection.on('error', (err) => {
			console.error('Unable to connect to Mongo via Mongoose', err);
		});
	}

	public listen() {
		this.server.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}
}

export default App;
