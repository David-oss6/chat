import { Socket } from 'socket.io'
import { comparePassword, hashPassword } from '../../middlware/bcript'
import { TUser } from './types'
import { signIn } from '../service/signIn'
import { logIn } from '../service/logIn'
import { updateUser } from '../service/updateUser'
import { getUser } from '../service/getUser'
import { RoomSocket } from '../../room/domain/RoomSocket'

export class UserSocket {
    socket: Socket
    constructor(socket: Socket) {
        this.socket = socket
    }
    async connect(roomSocket: RoomSocket) {
        this.socket.on('login', async (user: TUser, socketId: string) => {
            const isSigned: Object | null = await this.logIn(user, socketId)
            if (isSigned) {
                const roomToJoin = await roomSocket.getRoom('/')
                await roomSocket.joinRoom(roomToJoin, user.name)
            }
            roomSocket.loginAtempt(isSigned)
        })

        this.socket.on('user-joined-room-message', (location, name) => {
            const message = `${name} has joined the room`
            this.socket.broadcast.emit('user-joined-room-message', location, message)
        })

        this.socket.on('signin', async (newUser: TUser) => {
            await this.signIn(newUser)
        })

        this.socket.on('disconnect', async () => {
            const userName = await this.getUser(this.socket.id)
            if (userName) await roomSocket.deleteRoomsOnDisconnect(userName)
        })
    }

    async signIn(newUser: TUser): Promise<void> {
        newUser = {
            name: newUser.name,
            pass: await hashPassword(newUser.pass),
            socketId: ""
        }
        const exists: object | null = await signIn(newUser)
        this.socket.emit('sign-atempt', exists)
    }

    async logIn(user: TUser, socketId: string) {
        const isSigned = await logIn(user)
        if (isSigned) {
            const isMatch = await comparePassword(user.pass, isSigned.pass)
            if (isMatch) await updateUser(user, socketId)
            return isMatch
        }
        this.socket.emit('login-atempt', isSigned)
        return isSigned
    }

    async getUser(socketId: string) {
        const userName = await getUser(socketId)
        return userName
    }
}