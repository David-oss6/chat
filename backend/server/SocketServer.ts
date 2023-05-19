import { Server } from "socket.io"
import { UserSocket } from "../user/domain/UserSocket"
import { RoomSocket } from "../room/domain/RoomSocket"

export class SocketServer {
    private readonly io
    constructor(httpServer: any) {
        this.io = new Server(httpServer, {
            cors: {
                origin: '*'
            }
        })
    }

    async connect(): Promise<void> {
        this.io.on('connection', async (socket) => {
            const userSocket: UserSocket = new UserSocket(socket)
            const roomSocket: RoomSocket = new RoomSocket(socket)

            await userSocket.connect(roomSocket)
            await roomSocket.connect()

        })
    }
}