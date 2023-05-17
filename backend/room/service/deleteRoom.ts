import { TRoom } from "../domain/types"
import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()
export const deleteRoom = async (room: TRoom) => {
    await mongoHandler.deleteRoom(room)
    const rooms = await mongoHandler.getRooms(null)
    return rooms
}