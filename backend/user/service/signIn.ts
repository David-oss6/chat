import { TUser } from "../domain/types"
import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()

export const signIn = async (newUser: TUser) => {
    const nameExists = await mongoHandler.findUser(newUser)
    if (!nameExists) await mongoHandler.createUser(newUser)
    return nameExists
}