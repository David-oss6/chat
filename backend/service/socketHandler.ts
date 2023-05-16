import { TMessage, TRoom, TUser } from '../domain/types'
import { Socket } from 'socket.io'
import { MongoDbHandler } from '../repositories/MongoDbHandler'

const mongoHandler = new MongoDbHandler()

export const updateNewUser = async () => {
    const rooms = await mongoHandler.getRooms()
    const messages = await mongoHandler.getMessages()
    return { rooms, messages }
}

export const login = async (user: TUser) => {
    // jsonwebtoken ATENCION        
    const isSigned = await mongoHandler.findUser(user)
    return isSigned
}

export const signIn = async (newUser: TUser) => {
    const nameExists = await mongoHandler.findUser(newUser)
    if (!nameExists) await mongoHandler.createUser(newUser)
    return nameExists
}

export const updateMessages = async (msg: TMessage) => {
    const messages = await mongoHandler.updateMessages(msg)
    return messages
}

export const createRoom = async (newRoom: TRoom) => {
    const room = await mongoHandler.findRoom(newRoom)
    if (!room) {
        await mongoHandler.createRoom(newRoom)
        const rooms = await mongoHandler.getRooms()
        return rooms
    } else {
        return false
    }
}

export const getRoom = async (salaPrincipal: string): Promise<TRoom> => {
    const mainRoom = await mongoHandler.getRoom(salaPrincipal)
    return mainRoom
}
export const deleteRoom = async (room: TRoom) => {
    await mongoHandler.deleteRoom(room)
    const rooms = await mongoHandler.getRooms()
    return rooms
}

export const joinRoom = async (roomToJoin: TRoom, user: string) => {
    await mongoHandler.joinRoom(roomToJoin, user)
    const rooms = await mongoHandler.getRooms()
    return rooms
}

export const leaveRoom = async (roomToLeave: string, user: string) => {
    await mongoHandler.leaveRoom(roomToLeave, user)
}

export const deleteRoomsOnDisconnect = async (socket: Socket) => {
    await mongoHandler.deleteRoomsOnDisconnect(socket.id)
    const rooms = await mongoHandler.getRooms()
    return rooms
}

