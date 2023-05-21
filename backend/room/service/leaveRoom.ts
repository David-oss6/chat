import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()

export const leaveRoom = async (roomToLeave: string, user: string) => {
    await mongoHandler.leaveRoom(roomToLeave, user)
}