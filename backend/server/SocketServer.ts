import { Server } from "socket.io"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { UserSocket } from "../user/domain/UserSocket"
import { RoomSocket } from "../room/domain/RoomSocket"
import { TUser } from "../user/domain/types"
import { TMessage, TRoom } from "../room/domain/types"
dotenv.config()
const secretKey: string = process.env.JWT_KEY!

export class SocketServer {
    //private readonly httpServer: any   ///   <----- any
    private readonly io
    constructor(httpServer: any) {  ///   <----- any
        //this.httpServer = httpServer
        this.io = new Server(httpServer, {
            cors: {
                origin: '*'
            }
        })
    }

    async connect(): Promise<void> {
        this.io.on('connection', async (socket) => {
            const socketId = socket.id
            const userSocket: UserSocket = new UserSocket(socket)
            const roomSocket: RoomSocket = new RoomSocket(socket)
            // const data = await updateNewUser()
            // socket.emit('update-new-user', data)


            socket.on('signin', async (newUser: TUser) => {
                await userSocket.signIn(newUser)
            })

            socket.on('login', async (user: TUser, socketId: string) => {
                const isSigned: Object | null = await userSocket.logIn(user, socketId)
                if (isSigned) {
                    const roomToJoin = await roomSocket.getRoom('/')
                    roomSocket.joinRoom(roomToJoin, user.name)
                }
                roomSocket.loginAtempt(isSigned)
            })

            socket.on('user-joined-room-message', (location, name) => {
                const message = `${name} has joined the room`
                socket.broadcast.emit('user-joined-room-message', location, message)
            })


            socket.on('send-msg', async (msg: TMessage) => {
                roomSocket.updateMessages(msg)
            })

            socket.on('create-room', async (newRoom: TRoom) => {
                roomSocket.createRoom(newRoom)
            })

            socket.on('delete-room', async (room: TRoom) => {
                await roomSocket.deleteRoom(room)
            })

            socket.on('join-room', async (roomToJoin: TRoom, roomToLeave: string | null, user: string) => {
                if (roomToLeave) await roomSocket.leaveRoom(roomToLeave, user)
                await roomSocket.joinRoom(roomToJoin, user)
            })

            socket.on('disconnect', async () => {
                const userName = await userSocket.getUser(socketId)
                if (userName) await roomSocket.deleteRoomsOnDisconnect(userName)
            })
        })
    }
}