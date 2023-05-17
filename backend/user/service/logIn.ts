import { TUser } from "../domain/types"
import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()
export const logIn = async (user: TUser) => {
    // jsonwebtoken ATENCION        
    const isSigned = await mongoHandler.findUser(user)
    return isSigned
}