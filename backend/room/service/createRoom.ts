import { TRoom } from "../domain/types"
import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()

export const createRoom = async (newRoom: TRoom) => {
    const room = await mongoHandler.findRoom(newRoom)
    if (!room) {
        await mongoHandler.createRoom(newRoom)
        const rooms = await mongoHandler.getRooms(null)
        return rooms
    } else {
        return false
    }
}