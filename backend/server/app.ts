import { AppServer } from "./AppServer";
import http from 'http'
import express from 'express'
import { SocketServer } from "./SocketServer";

export class App {
    server?: AppServer;
    io?: SocketServer;

    async start(): Promise<void> {
        const port = process.env.PORT ?? "4000";
        const app = express()
        const httpServer = http.createServer(app)
        this.server = new AppServer(port, httpServer);// creacion servidor express (app.ts). Enviamos httpServer para que funcione socket.io
        this.io = new SocketServer(httpServer) //creacion del servidor de socket)

        await this.io.connect()
        await this.server.listen();
    }
}