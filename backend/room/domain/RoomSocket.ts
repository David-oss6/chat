import { Socket } from 'socket.io'
import { getRoom } from '../service/getRoom'
import { TMessage, TRoom } from './types'
import { updateMessages } from '../service/updateMessages'
import { createRoom } from '../service/createRoom'
import { deleteRoom } from '../service/deleteRoom'
import { joinRoom } from '../service/joinRoom'
import { leaveRoom } from '../service/leaveRoom'
import { deleteRoomsOnDisconnect } from '../service/deleteRoomsOnDisconnect'


export class RoomSocket {
    socket: Socket
    constructor(socket: Socket) {
        this.socket = socket
    }

    async getRoom(room: string) {
        const roomToJoin = await getRoom(room)
        return roomToJoin
    }

    async getRooms(userName: string) {
        const rooms = await this.getRooms(userName)
    }

    async joinRoom(room: TRoom, user: string) {
        if (room.name === 'sala principal') {
            room = await getRoom('/')
        }
        const rooms = await joinRoom(room, user)
        this.socket.broadcast.emit('update-rooms', rooms)
        this.socket.emit('update-rooms', rooms)
    }

    async loginAtempt(isSigned: Object | null) {
        this.socket.emit('login-atempt', isSigned)
        this.socket.broadcast.emit('login-atempt', isSigned)
    }

    async leaveRoom(roomToLeave: string, user: string) {
        await leaveRoom(roomToLeave, user)
    }

    async updateMessages(msg: TMessage) {
        const rooms = await updateMessages(msg)
        this.socket.broadcast.emit('update-rooms', rooms)
        this.socket.emit('update-rooms', rooms)
    }

    async createRoom(newRoom: TRoom) {
        const rooms = await createRoom(newRoom)
        if (rooms) {
            this.socket.broadcast.emit('update-rooms', rooms)
            this.socket.emit('update-rooms', rooms)
        } else {
            this.socket.emit(`${newRoom.name}-exists`, true)
        }
    }
    async deleteRoom(room: TRoom) {
        const rooms = await deleteRoom(room)
        this.socket.broadcast.emit('update-rooms', rooms)
        this.socket.emit('update-rooms', rooms)
    }

    async deleteRoomsOnDisconnect(userName: any) {
        const roomsAfterDelete = await deleteRoomsOnDisconnect(userName)
        this.socket.emit('update-rooms', roomsAfterDelete)
        this.socket.broadcast.emit('update-rooms', roomsAfterDelete)

    }
}