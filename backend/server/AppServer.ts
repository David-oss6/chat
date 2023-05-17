import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { Server } from 'http'
import { connectToDb } from "../database/mongoConnection";
import router from "../router/verificationRouter";


export class AppServer {
	private readonly express: express.Express;
	private readonly port: string;
	private readonly server;

	constructor(port: string, httpServer: Server) {
		this.port = port;
		this.express = express();
		this.express.use(helmet());
		this.express.use(cors());
		this.express.use(json());
		this.express.use(urlencoded({ extended: false }));
		this.server = httpServer
		this.express.use(router)
	}

	async listen(): Promise<void> {
		await new Promise<void>((resolve) => {
			connectToDb((error: Error) => {
				!error && this.server.listen(this.port, () => {
					// eslint-disable-next-line no-console
					console.log(
						`✅ Backend App is running at http://localhost:${this.port} in ${this.express.get(
							"env"
						)} mode`
					);
					// eslint-disable-next-line no-console
					console.log("✋ Press CTRL-C to stop\n");

					resolve();
				});
			})

		});
	}
}
