import { TUser } from "../domain/types"
import { MongoDbHandler } from "../repository/MongoDbHandler"
const mongoHandler = new MongoDbHandler()

export const updateUser = async (user: TUser, socketId: string) => {
    await mongoHandler.updateUser(user, socketId)
}