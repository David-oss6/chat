import { MongoDbHandler } from "../repository/MongoDbHandler"
const mongoHandler = new MongoDbHandler()

export const getUser = async (socketId: string) => {
    const userName = await mongoHandler.getUser(socketId)
    return userName
}