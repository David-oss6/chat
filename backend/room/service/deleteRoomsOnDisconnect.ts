
import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()

export const deleteRoomsOnDisconnect = async (userName: any) => {
    const roomsAfterDelete = await mongoHandler.deleteRoomsOnDisconnect(userName)
    return roomsAfterDelete
}