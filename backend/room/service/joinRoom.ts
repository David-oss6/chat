import { TRoom } from "../domain/types"
import { MongoDbHandler } from "../repository/MongoDbHandler"
const mongoHandler = new MongoDbHandler()

export const joinRoom = async (roomToJoin: TRoom, user: string) => {
    await mongoHandler.joinRoom(roomToJoin, user)
    const rooms = await mongoHandler.getRooms(null)
    return rooms
}