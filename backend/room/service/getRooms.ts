import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()

const getRooms = async (userName: string) => {
    const rooms = await mongoHandler.getRooms(userName)
    return rooms
}